import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule,  CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted: boolean = false;
  login : boolean = true;
  errorMessage: any;
  constructor (private authService: AuthService, private router: Router,private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: [
          '',
          [
            Validators.required
          ]
        ]
      },
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      this.authService.login(this.loginForm.value).subscribe((response : any) => {
        console.log(response);
        if(response) {
          this.authService.setToken(response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.login = false;
          this.router.navigate(['/dashboard']);
        }
      },
    (error) => {
      console.log(error.error.error);
      this.errorMessage = error.error.error;
    })
  }


  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
