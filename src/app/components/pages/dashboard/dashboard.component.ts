import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user : any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}'); // Parse the JSON string to an object
    console.log(this.user.name); 
  }
}
