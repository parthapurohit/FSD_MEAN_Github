import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

/*
  Using Local Storage to store emploee details
*/
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees = [];

  constructor() {
    this.employees = this.getEmployeesFromLS() || [];
  }

  addEmployee(employee: Employee) {
    // add new employee
    this.employees.push(employee);
    this.setEmployeesToLS();
  }

  updateEmployee(id: number, employee: Employee) {
    // update existing employee
    this.employees[id] = employee;
    this.setEmployeesToLS();
  }

  setEmployeesToLS() {
    localStorage.setItem('Employees', JSON.stringify(this.employees));
  }

  getEmployeesFromLS(): Employee[] {
    return JSON.parse(localStorage.getItem('Employees'));
  }
}
