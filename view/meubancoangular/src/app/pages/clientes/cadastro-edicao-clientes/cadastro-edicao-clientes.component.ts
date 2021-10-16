import { ICliente } from './../../../interfaces/cliente';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cadastro-edicao-clientes',
  templateUrl: './cadastro-edicao-clientes.component.html',
  styleUrls: ['./cadastro-edicao-clientes.component.css']
})
export class CadastroEdicaoClientesComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    observacoes: new FormControl('', Validators.required),
    ativo: new FormControl(true),
  });
  constructor(private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id)) {
      this.clienteService.buscarPorId(Number(id)).subscribe(res => {
        this.preencheFormValue(res);
      })

    }
  }

  preencheFormValue(cliente: ICliente) {
    this.formValue = new FormGroup({
      id: new FormControl(cliente.id),
      nome: new FormControl(cliente.nome),
      cpf: new FormControl(cliente.cpf),
      email: new FormControl(cliente.email),
      observacoes: new FormControl(cliente.observacoes),
      ativo: new FormControl(cliente.ativo),
    })
  }

  enviar() {
    const cliente: ICliente = this.formValue.value;
    this.clienteService.cadastrarNovoCliente(cliente).subscribe(result => {
      Swal.fire('Sucesso!', 'Cliente ' + cliente.nome + ' Cadastrado com Sucesso', 'success')
      this.router.navigate(["/clientes"])
    }, error => {
      console.error(error)
    })
  }

}
