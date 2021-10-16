import { ITransferencia } from './../../../interfaces/transferencia';
import { ISaqueDeposito } from './../../../interfaces/saque-deposito';
import { ContaService } from './../../../services/conta.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caixa-eletronico',
  templateUrl: './caixa-eletronico.component.html',
  styleUrls: ['./caixa-eletronico.component.css']
})
export class CaixaEletronicoComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  });

  formValueTransferencia: FormGroup = new FormGroup({
    agenciaDestino: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    numeroContaDestino: new FormControl('', Validators.required),
    agenciaOrigem: new FormControl('', Validators.required),
    numeroContaOrigem: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),

  });


  operacao: number = 0
  escolha: any = "Selecione a Operação";

  constructor(private contaService: ContaService,
    private router: Router) { }

  ngOnInit(): void {
    this.onChangeOperacao();
  }

  depositar() {
    const deposito: ISaqueDeposito = this.formValue.value;
    this.contaService.efetuarDeposito(deposito).subscribe(res => {
      Swal.fire({
        title: 'Depósito no valor de ' + deposito.valor + ' Reais efetuado com sucesso! Deseja Visualizar Extrato e Saldo?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#157347',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Não, voltar para contas'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/extrato", deposito.agencia, deposito.numeroConta])
        }
        if(result.isDismissed){
          this.router.navigate(["/contas"])
        }
      })
    })
  }

  sacar() {
    const saque: ISaqueDeposito = this.formValue.value;
    this.contaService.efetuarSaque(saque).subscribe(res => {
      Swal.fire({
        title: 'Saque no valor de ' + saque.valor + ' Reais efetuado com sucesso! Deseja Visualizar Extrato e Saldo?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#157347',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Não, voltar para contas'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/extrato", saque.agencia, saque.numeroConta])
        }
        if(result.isDismissed){
          this.router.navigate(["/contas"])
        }
      })
    })
  }

  transferencia() {
    const transferencia: ITransferencia = this.formValueTransferencia.value;
    this.contaService.efetuarTransferencia(transferencia).subscribe(res => {
      Swal.fire({
        title: 'Transferencia no valor de ' + transferencia.valor + ' Reais efetuada com sucesso! Deseja Visualizar Extrato e saldo?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#157347',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Não, voltar para contas'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/extrato", transferencia.agenciaOrigem, transferencia.numeroContaOrigem])
        }
        if(result.isDismissed){
          this.router.navigate(["/contas"])
        }
      })
    })
  }

  onChangeOperacao() {
    if (this.escolha == "Selecione a Operação") {
      this.operacao = 0;
    }
    if (this.escolha == "Saque") {
      this.operacao = 1;
    }
    if (this.escolha == "Depósito") {
      this.operacao = 2;
    }
    if (this.escolha == "Transferencia") {
      this.operacao = 3;
    }
  }

  limparCamposSaqueDeposito() {
    this.formValue = new FormGroup({
      agencia: new FormControl(''),
      numeroConta: new FormControl(''),
      valor: new FormControl(''),
    });
  }
  limparCamposTransferencia() {
    this.formValueTransferencia = new FormGroup({
      agenciaDestino: new FormControl(''),
      numeroContaDestino: new FormControl(''),
      agenciaOrigem: new FormControl(''),
      numeroContaOrigem: new FormControl(''),
      valor: new FormControl(''),

    });
  }
}
