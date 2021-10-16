import { ICliente } from './../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.css']
})
export class ListagemClientesComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  clientes: ICliente[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.clienteService.listarTodosOsClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    })
  }

  excluir(id:number){
    return this.clienteService.excluirCliente(id).subscribe(res=>{
      this.listarTodos();
    })
  }

  confirmarExclusao(id:number){
    Swal.fire({
      title: 'Deseja Realmente deletar ?',
      text: "Você não pode reverter essa ação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Deletar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.excluir(id);
        Swal.fire(
          'Deletado!',
          'O cliente foi deletado com sucesso',
          'success'
        )
      }

    }, error =>{
      Swal.fire(
        'Erro',
        'Um Erro Inesperado aconteceu' + error,
        'error'
      )
    })
  }
}
