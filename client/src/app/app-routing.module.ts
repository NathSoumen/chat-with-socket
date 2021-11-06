import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketChartComponent } from './chart/socket-chart/socket-chart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chart',
    pathMatch: 'full',
  },
 
  { path: 'chart', component: SocketChartComponent },
  {path:"**",component:SocketChartComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
