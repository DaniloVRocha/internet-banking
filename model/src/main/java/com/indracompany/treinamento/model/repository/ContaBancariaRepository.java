package com.indracompany.treinamento.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;

public interface ContaBancariaRepository extends GenericCrudRepository<ContaBancaria, Long> {
	
	ContaBancaria findByAgenciaAndNumero(String agencia, String numero);
	
	List<ContaBancaria> findByCliente(Cliente cli);
	
	@Query(value = "select c from ContaBancaria c where c.cliente = :cli")
	List<ContaBancaria> buscarContasDoClienteJpql(@Param("cli") Cliente cli);
	
	@Query(value = "select con.* from contas con, clientes cli where con.fk_cliente_id=cli.id and cli.id = :idCliente", nativeQuery = true)
	List<ContaBancaria> buscarContasDoClienteSql(@Param("idCliente") Long idCLiente);
	
	
}
