import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithRedirect,
  FacebookAuthProvider
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  // ✅ Register
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ Google Login
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // ✅ Facebook Login
  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // ✅ Logout
  logout() {
    return signOut(this.auth);
  }
}
