import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './basic/counter/counter.component';
import { CharizardComponent } from './basic/charizard/charizard.component';
import { FatherComponent } from './basic/father/father.component';

const routes: Routes = [
  {
    path: 'basic/counter',
    component: CounterComponent
  },
  {
    path: 'basic/charizard',
    component: CharizardComponent
  },
  {
    path: 'basic/father',
    component: FatherComponent
  },
  {
    path: '**',
    redirectTo: 'basic/counter'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
