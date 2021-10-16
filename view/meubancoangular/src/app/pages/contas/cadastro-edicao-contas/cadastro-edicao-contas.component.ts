import { ClienteService } from './../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from './../../../interfaces/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { IConta } from 'src/app/interfaces/conta';
import { ContaService } from 'src/app/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-edicao-contas',
  templateUrl: './cadastro-edicao-contas.component.html',
  styleUrls: ['./cadastro-edicao-contas.component.css']
})
export class CadastroEdicaoContasComponent implements OnInit {


  formValue: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    saldo: new FormControl('')
  });

  formValueCliente: FormGroup = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl(''),
    ativo: new FormControl(''),
    observacoes: new FormControl('')
  });

  idCliente: string = '';
  nome: string = '';
  cpf: string = '';
  email: string = '';
  mostrarDados: boolean = false;
  mostrarDadosDeposito: boolean = false;
  ativo: any = '';
  observacoes: string = ''

  constructor(private clienteService: ClienteService,
    private contaService: ContaService, private router:Router) {
  }

  ngOnInit(): void {

  }

  preencherDadosCliente() {
    var cliente: ICliente = this.formValueCliente.value;
    this.clienteService.buscarPorId(Number(this.idCliente)).subscribe(res => {
      cliente = res;
      this.nome = cliente.nome;
      this.email = cliente.email;
      this.cpf = cliente.cpf;
      this.ativo = cliente.ativo;
      this.observacoes = cliente.observacoes;
      this.mostrarDados = true;
    })
    return cliente
  }

  preencherForm() {
    var conta: IConta = this.formValue.value;
    this.clienteService.buscarPorId(Number(this.idCliente)).subscribe(res => {
      conta.cliente = res;
      this.criarConta(conta);
    })
  }

  criarConta(conta: IConta) {
    this.contaService.criarConta(conta).subscribe(res => {
      Swal.fire(
        'Criado',
        'A conta foi criada com sucesso',
        'success'
      )
      this.router.navigate(["/contas"])
    })
  }
}
