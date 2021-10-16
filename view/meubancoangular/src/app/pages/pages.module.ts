import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClientesComponent } from './clientes/listagem-clientes/listagem-clientes.component';
import { CadastroEdicaoClientesComponent } from './clientes/cadastro-edicao-clientes/cadastro-edicao-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListagemContasComponent } from './contas/listagem-contas/listagem-contas.component';
import { CaixaEletronicoComponent } from './caixa/caixa-eletronico/caixa-eletronico.component';
import { ExtratoBancarioComponent } from './caixa/extrato-bancario/extrato-bancario.component';
import { CadastroEdicaoContasComponent } from './contas/cadastro-edicao-contas/cadastro-edicao-contas.component';



@NgModule({
  declarations: [
    ListagemClientesComponent,
    CadastroEdicaoClientesComponent,
    ListagemContasComponent,
    CaixaEletronicoComponent,
    ExtratoBancarioComponent,
    CadastroEdicaoContasComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
