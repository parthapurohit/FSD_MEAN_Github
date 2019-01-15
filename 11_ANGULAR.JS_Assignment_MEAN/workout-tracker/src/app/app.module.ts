import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeService } from './services/employee.service';

const routes: Routes = [
  { path: 'employees/new', component: AddEmployeeComponent, pathMatch: 'full' },
  { path: 'employees/:id', component: UpdateEmployeeComponent },
  { path: 'employees', component: ListEmployeeComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    NavbarComponent,
    ListEmployeeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    EmployeeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
