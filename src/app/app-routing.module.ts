import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolObjectsComponent } from './school-objects/school-objects.component';
import { SchoolObjectsDetailComponent } from './school-objects-detail/school-objects-detail.component';
import { StudentsComponent } from './students/students.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: SchoolObjectsComponent},
  {path: 'school-subjects/:name', component: SchoolObjectsDetailComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



