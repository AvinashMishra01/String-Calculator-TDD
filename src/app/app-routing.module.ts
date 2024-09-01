import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalulatorComponent } from './calulator/calulator.component';


const routes: Routes = [
  {path:'', component:CalulatorComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
