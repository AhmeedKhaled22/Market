import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const guestGuard: CanActivateFn = async () => {

  const auth = inject(Auth);
  const router = inject(Router);

  await auth.authStateReady();

  // لو المستخدم مش مسجل دخول
  if (!auth.currentUser) {
    return true;
  }

  // لو مسجل دخول يرجعه home
  return router.createUrlTree(['/home']);
};
