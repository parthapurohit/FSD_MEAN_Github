import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location) {
    this.id = +this.route.snapshot.paramMap.get('id');
    const employees = this.employeeService.getEmployeesFromLS();
    this.employee = employees[this.id];
  }

  ngOnInit() {
  }

  onUpdate() {
    this.employeeService.updateEmployee(this.id, this.employee);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  validateForm(): boolean {
    return !(this.employee.name.trim() !== '' && +this.employee.age >= 1 && /^.+@.+\..+$/.test(this.employee.email.trim()));
  }
}
