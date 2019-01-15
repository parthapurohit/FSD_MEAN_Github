import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private location: Location) {
    this.employee = {
      name: '', age: null, email: ''
    };
  }

  ngOnInit() {
  }

  onSave() {
    this.employeeService.addEmployee(this.employee);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  validateForm(): boolean {
    return !(this.employee.name.trim() !== '' && +this.employee.age >= 1 && /^.+@.+\..+$/.test(this.employee.email.trim()));
  }
}

