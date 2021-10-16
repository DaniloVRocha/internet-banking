package com.indracompany.treinamento.model.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ClienteDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;
import com.indracompany.treinamento.model.repository.OperacaoContaRepository;

@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository>{

	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private ContaBancariaRepository contaBancariaRepository;

	@Autowired
	private OperacaoContaRepository operacaoContaRepository;
	
	
	public double consultarSaldo(String agencia, String numeroConta) {
		ContaBancaria c = this.consultarConta(agencia, numeroConta);
		return c.getSaldo();
	}
	
	public ContaBancaria consultarConta(String agencia, String numeroConta) {
		ContaBancaria c = contaBancariaRepository.findByAgenciaAndNumero(agencia, numeroConta);
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		return c;
	}

	public List<ContaBancaria> obterContas(String cpf) {
		ClienteDTO dto = clienteService.buscarClientePorCpf(cpf);
		Cliente cliente = clienteService.buscar(dto.getId());
		List<ContaBancaria> contasDoCliente = contaBancariaRepository.findByCliente(cliente);
		return contasDoCliente;
	}
	public void incluirExtrato(String agencia, String numeroConta, double valor, char tpOperacao) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		OperacaoConta op = new OperacaoConta();
		LocalDateTime d = LocalDateTime.now();
			if (conta != null) {
				op.setConta(conta);
				op.setDataHora(d);
				op.setTpOperacao(tpOperacao);
				op.setValor(valor);
				String observacaoDeb = "Foi debitado " + op.getValor() + " Reais";
				String observacaoCre = "Credito de " + op.getValor() + " Reais";
				if (tpOperacao == 'C') {
					op.setObservacao(observacaoCre);
				} else if (tpOperacao == 'D') {
					op.setObservacao(observacaoDeb);
				}
			List<OperacaoConta> extrato = new ArrayList<>(); 
			extrato.add(op);
			conta.setExtrato(extrato);
			super.salvar(conta);
			}
	}

	public List<OperacaoConta> consultarExtratoPorData(String agencia, String conta, String dataInicio, String dataFinal) {
		ContaBancaria c = consultarConta(agencia, conta);
		List<OperacaoConta> extrato = operacaoContaRepository.findByConta(c);
		List<OperacaoConta> aux = new ArrayList<>();
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime dataInicioBusca = LocalDateTime.parse(dataInicio, format);
		LocalDateTime dataFimBusca = LocalDateTime.parse(dataFinal, format);
		
		for (OperacaoConta operacao: extrato) {
			if(operacao.getDataHora().isAfter(dataInicioBusca) && operacao.getDataHora().isBefore(dataFimBusca)) {
				aux.add(operacao);
			}
		}
		return aux;
	}
	
	public List<OperacaoConta> consultarExtrato(String agencia, String conta) {
		ContaBancaria c = consultarConta(agencia, conta);
		List<OperacaoConta> extrato = operacaoContaRepository.findByConta(c);
		return extrato;
	}

	
	public void depositar(String agencia, String numeroConta, double valor) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		this.incluirExtrato(agencia,numeroConta, valor,'C');
		super.salvar(conta);
	}
	
	public void sacar(String agencia, String numeroConta, double valor) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
		this.incluirExtrato(agencia,numeroConta, valor,'D');
		super.salvar(conta);
	}

	@Transactional(rollbackOn = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		if (dto.getAgenciaOrigem().equals(dto.getAgenciaDestino()) 
				&& dto.getNumeroContaOrigem().equals(dto.getNumeroContaDestino())) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		this.depositar(dto.getAgenciaDestino(),dto.getNumeroContaDestino(), dto.getValor());
	}
	
	
}
