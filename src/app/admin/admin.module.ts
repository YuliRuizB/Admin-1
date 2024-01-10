import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateModule } from '../shared/template/template.module';
import { AdminPaymentsComponent } from './payments/payments.component';
import { OrganigramaComponent } from './organigrama/organigrama.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AdminRoutingModule,
    TemplateModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminPaymentsComponent,
    OrganigramaComponent
  ]
})

export class AdminModule { }
