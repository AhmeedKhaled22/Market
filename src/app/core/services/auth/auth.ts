import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  sendRegisterData(data: any): Observable<any> {
    return this.httpClient.post(
      'https://note-sigma-black.vercel.app/api/v1/users/signUp',
      data
    );
  }
    sendLoginData(data: any): Observable<any> {
    return this.httpClient.post(
      'https://note-sigma-black.vercel.app/api/v1/users/signIn',
      data
    );
  }
}
