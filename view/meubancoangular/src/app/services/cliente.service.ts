import { ICliente } from './../interfaces/cliente';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  endpoint = 'clientes/';
  api = environment.api;

  constructor(private http: HttpClient) { }

  listarTodosOsClientes(): Observable<ICliente[]>{
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`)
  }

  cadastrarNovoCliente(cliente:ICliente){
    return this.http.post<ICliente>(`${this.api}/${this.endpoint}`, cliente)
  }

  excluirCliente(id:number){
    return this.http.delete(`${this.api}/${this.endpoint}${id}`);
  }

  buscarPorId(id:number){
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}${id}`)
  }

}
