import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'https://note-sigma-black.vercel.app/api/v1/users/signIn';

  isLogined = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  private hasToken(): boolean {
    return !!(
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')
    );
  }
}
