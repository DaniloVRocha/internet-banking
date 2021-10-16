import { ICliente } from './cliente';
import { IExtrato } from './extrato';

export interface IConta {
  id:number;
  agencia:string;
  numero:string;
  saldo:number;
  cliente:ICliente;
  extrato:IExtrato[];

}
