import { Observable } from 'rxjs';
import { ContaService } from './../../../services/conta.service';
import { Component, OnInit } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-contas',
  templateUrl: './listagem-contas.component.html',
  styleUrls: ['./listagem-contas.component.css']
})
export class ListagemContasComponent implements OnInit {

  contas: IConta[] = [];

  constructor(private contaService: ContaService) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  listarTodos() {
    this.contaService.listarTodasContas().subscribe(res => {
      this.contas = res;
    })
  }

  excluirConta(id:number){
    this.contaService.excluirConta(id).subscribe(res => {
      this.listarTodos();
    })
  }

  confirmarExclusao(id:number){
    console.log(id);
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
        this.excluirConta(id);
        Swal.fire(
          'Deletado!',
          'A Conta foi deletada com sucesso',
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

