import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login : boolean = true;
  constructor (private authService: AuthService, private router: Router) {

  }
  onSubmit(myForm : any): void {
    console.log(myForm);
    
    if(!this.login) {
      this.authService.signUp(myForm.form.value).subscribe(response => {
        console.log(response);
      })
    } else {
      this.authService.login(myForm.form.value).subscribe((response : any) => {
        console.log(response);
        if(response) {
          localStorage.setItem('token', response.token);
          this.login = false;
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }
}
