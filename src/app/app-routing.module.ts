import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './userPanel/components/user-home/user-home.component';

const routes: Routes = [
{path:'' ,pathMatch:'full', redirectTo:'/userHome' },
{path:'userHome', component: UserHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
