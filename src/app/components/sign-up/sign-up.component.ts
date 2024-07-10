import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Validation from '../shared/utils/validation';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  registerForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted: boolean = false;
  login: boolean = true;
  errorMessage: any;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.signUp(this.registerForm.value).subscribe((response) => {
      this.router.navigate(['login']);
      console.log(response);
    },
      (error) => {
        console.log(error.error.error);
        this.errorMessage = error.error.error;
      })
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}