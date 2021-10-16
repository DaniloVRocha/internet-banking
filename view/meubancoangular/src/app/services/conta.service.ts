import { ITransferencia } from './../interfaces/transferencia';
import { ISaqueDeposito } from './../interfaces/saque-deposito';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { IExtrato } from '../interfaces/extrato';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  endpoint = "contas/"
  api = environment.api;


  constructor(private http: HttpClient) { }
  listarTodasContas(): Observable<IConta[]> {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}`)
  }

  efetuarDeposito(deposito: ISaqueDeposito) {
    return this.http.post<ISaqueDeposito>(`${this.api}/${this.endpoint}deposito`, deposito);
  }

  efetuarSaque(saque: ISaqueDeposito) {
    return this.http.post<ISaqueDeposito>(`${this.api}/${this.endpoint}saque`, saque);
  }

  efetuarTransferencia(transferencia: ITransferencia) {
    return this.http.post<ISaqueDeposito>(`${this.api}/${this.endpoint}transferencia`, transferencia);
  }

  consultarExtrato(agencia: string, conta: string) {
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}consultar-extrato/${agencia}/${conta}`)
  }

  consultarSaldo(agencia: string, conta: string) {
    return this.http.get<IExtrato>(`${this.api}/${this.endpoint}consultar-saldo/${agencia}/${conta}`)
  }

  criarConta(conta: IConta) {
    return this.http.post<IConta>(`${this.api}/${this.endpoint}`, conta);
  }

  excluirConta(id: number) {
    return this.http.delete(`${this.api}/${this.endpoint}${id}`);
  }
}
