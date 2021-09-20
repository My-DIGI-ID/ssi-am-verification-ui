import { Component, Input } from '@angular/core';
import EmployeeCredentialViewModel from '../../models/employee-credential-view.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export default class EmployeeCardComponent {
  @Input() employee: EmployeeCredentialViewModel | undefined;
}
