import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';
import { MbscModule } from '@mobiscroll/angular-lite';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MbscModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
