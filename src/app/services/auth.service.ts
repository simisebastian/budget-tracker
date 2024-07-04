import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signUp(user : any) {
    return this.http.post('http://localhost:3000/api/register', user);
  }

  login(user:any) {
    return this.http.post('http://localhost:3000/api/login', user);
  }
}
