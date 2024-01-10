import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganigramaComponent } from './organigrama/organigrama.component';
import { AdminPaymentsComponent } from './payments/payments.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
            path: '',
            redirectTo: 'main',
            pathMatch: 'full'
        },
        {
          path: 'payments',
          component: AdminPaymentsComponent,
          data: {
            title: 'Pagos'
          }
        },
        {
          path: 'organigrama',  
          component: OrganigramaComponent,
          data: {
            title: 'Organigrama de Rutas'
          }
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class AdminRoutingModule { }
  