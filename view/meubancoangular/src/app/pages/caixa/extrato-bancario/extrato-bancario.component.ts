import { ContaService } from './../../../services/conta.service';
import { Component, OnInit } from '@angular/core';
import { IExtrato } from 'src/app/interfaces/extrato';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extrato-bancario',
  templateUrl: './extrato-bancario.component.html',
  styleUrls: ['./extrato-bancario.component.css']
})
export class ExtratoBancarioComponent implements OnInit {

  agencia: any = "";
  conta: any = "";
  saldo: any = 0;
  extratos: IExtrato[] = [];
  ativo: boolean = false;
  constructor(private contaService: ContaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buscarAposOperacao();
  }

  buscarTodosExtratos() {
    this.contaService.consultarExtrato(this.agencia, this.conta).subscribe(res => {
      this.extratos = res;
      this.ativo = true;
      this.extratos.reverse()
      this.buscarSaldo();
    })
  }

  buscarSaldo() {
    this.contaService.consultarSaldo(this.agencia, this.conta).subscribe(res => {
      this.saldo = res;
    })
  }

  buscarAposOperacao() {
    const agencia = this.route.snapshot.paramMap.get('agencia');
    const conta = this.route.snapshot.paramMap.get('conta');
    if (Number(conta) && Number(agencia)) {
      this.conta = conta;
      this.agencia = agencia;
    }
    if (Number(this.conta) != null && Number(this.agencia) != null) {
      this.contaService.consultarExtrato(String(this.agencia), String(this.conta)).subscribe(res => {
        this.extratos = res;
        this.ativo = true;
        this.extratos.reverse()
      })
      this.contaService.consultarSaldo(String(this.agencia), String(this.conta)).subscribe(res => {
        this.saldo = res;
      })
    }
  }
}
