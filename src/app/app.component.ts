import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  hideFooter = false;
  showScroll = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.updateFooterVisibility(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateFooterVisibility(event.urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    // مهم جدًا لــ Google/Facebook redirect
    this.authService.handleRedirectResult()
      .catch(err => console.log('Redirect error:', err));
  }

  private updateFooterVisibility(url: string): void {
    this.hideFooter =
      url.startsWith('/login') ||
      url.startsWith('/register') ||
      url.startsWith('/forget-password');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScroll = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
