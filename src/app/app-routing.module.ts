import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'receptionist-cabinet',
  },
  {
    path: 'receptionist-cabinet',
    loadChildren: () =>
      import('./features/receptionist-cabinet/receptionist-cabinet.module').then((mod) => mod.default),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
