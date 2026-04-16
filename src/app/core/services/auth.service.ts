import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  currentUser: User | null = null;
  isAuthReady = false;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      this.isAuthReady = true;
    });
  }

  // ================= REGISTER =================
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // ================= LOGIN =================
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // ================= GOOGLE LOGIN =================
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    // الأفضل على GitHub Pages بدل redirect
    return signInWithPopup(this.auth, provider);
  }

  // ================= FACEBOOK LOGIN =================
  loginWithFacebook() {
    const provider = new FacebookAuthProvider();

    // الأفضل على GitHub Pages بدل redirect
    return signInWithPopup(this.auth, provider);
  }

  // ================= HANDLE REDIRECT (اختياري) =================
  handleRedirectResult() {
    return getRedirectResult(this.auth);
  }

  // ================= LOGOUT =================
  logout() {
    return signOut(this.auth);
  }

  // ================= CHECK LOGIN =================
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // ================= GET USER =================
  getUser(): User | null {
    return this.currentUser;
  }
}
