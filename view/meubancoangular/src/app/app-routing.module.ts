import { ContaService } from './services/conta.service';
import { CadastroEdicaoClientesComponent } from './pages/clientes/cadastro-edicao-clientes/cadastro-edicao-clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemClientesComponent } from './pages/clientes/listagem-clientes/listagem-clientes.component';
import { ListagemContasComponent } from './pages/contas/listagem-contas/listagem-contas.component';
import { CaixaEletronicoComponent } from './pages/caixa/caixa-eletronico/caixa-eletronico.component';
import { ExtratoBancarioComponent } from './pages/caixa/extrato-bancario/extrato-bancario.component';
import { CadastroEdicaoContasComponent } from './pages/contas/cadastro-edicao-contas/cadastro-edicao-contas.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ListagemClientesComponent },
  { path: 'clientes/cadastrar', component: CadastroEdicaoClientesComponent },
  { path: 'clientes/editar/:id', component: CadastroEdicaoClientesComponent },
  { path: 'caixa', component: CaixaEletronicoComponent },
  { path: 'contas', component: ListagemContasComponent },
  { path: 'contas/cadastrar', component: CadastroEdicaoContasComponent },
  { path: 'contas/editar/:id', component: CadastroEdicaoContasComponent },
  { path: 'extrato', component: ExtratoBancarioComponent },
  { path: 'extrato/:agencia/:conta', component: ExtratoBancarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
