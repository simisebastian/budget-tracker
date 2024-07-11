import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { 
    this.headers = new HttpHeaders();
    // this.headers = this.headers.set("Content-Type", "application/json");
  }

  private setAuthHeaders(headers?: HttpHeaders, apiUrl?: string): HttpHeaders {
    let updatedHeaders:any = headers || this.headers;
    const token = this.authService.getToken() 

    if (!headers || !headers.get("Authorization")) {
      updatedHeaders = updatedHeaders.set(
        "Authorization",
        "Bearer " + token
      );

    }
    
    if (apiUrl?.includes('logout')) {
      const refresh_token = this.authService.getToken() 
      updatedHeaders = updatedHeaders.append('X-RefreshToken', refresh_token);
    }
    return updatedHeaders;
  }

  get(apiUrl: string, headers?: HttpHeaders){
    const updatedHeaders = this.setAuthHeaders(headers,apiUrl);
    return this.http.get('http://localhost:3000/api'+ apiUrl, {
      headers: updatedHeaders,
    })
  }

  post(apiUrl: string, data: any, headers?: HttpHeaders){
    const updatedHeaders = this.setAuthHeaders(headers, apiUrl);
    return this.http.post('http://localhost:3000/api'+ apiUrl, 
      data, { headers: updatedHeaders }
    )
  }

  put(apiUrl: string, data: any, headers?: HttpHeaders){
    const updatedHeaders = this.setAuthHeaders(headers);
    return this.http.put('http://localhost:3000/api' + apiUrl, 
      data, { headers: updatedHeaders }
    )
  }

  patch(apiUrl: string, data: any, headers?: HttpHeaders){
    const updatedHeaders = this.setAuthHeaders(headers);
    return this.http.patch('http://localhost:3000/api'+ apiUrl, 
      data, { headers: updatedHeaders }
    )
  }

  delete(apiUrl: string, headers?: HttpHeaders){
    const updatedHeaders = this.setAuthHeaders(headers,apiUrl);
    return this.http.delete('http://localhost:3000/api' + apiUrl, {
      headers: updatedHeaders,
    })
  }

  upload(apiUrl: string, data: any): Observable<HttpEvent<any>> {
    const updatedHeaders = this.setAuthHeaders();
    const req = new HttpRequest('POST', 'http://localhost:3000/api' + apiUrl, data, {
      reportProgress: true,
      responseType: 'json',
      headers: updatedHeaders
    });
    return this.http.request(req);
  }
}
