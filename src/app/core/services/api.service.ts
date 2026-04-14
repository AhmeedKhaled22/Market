import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, retry } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private LOGIN_URL = 'https://note-sigma-black.vercel.app/api/v1/users/signIn'

  isLogined = new BehaviorSubject<boolean>(this.hasToken())

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!(
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')
    )
  }

  login(data: { email: string; password: string }) {
    return this.http.post(this.LOGIN_URL, data)
  }

  logout() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    this.isLogined.next(false)
  }
  getAllProduct():Observable<any>{
     return this.http.get ('https://api.escuelajs.co/api/v1/categorie')
  }
}
