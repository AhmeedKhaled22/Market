import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';

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
export class AppComponent {

  hideFooter = false;
  showScroll = false; // 👈 زرار السهم

  constructor(private router: Router) {
    this.updateFooterVisibility(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateFooterVisibility(event.urlAfterRedirects);
      });
  }

  private updateFooterVisibility(url: string): void {
    this.hideFooter =
      url.startsWith('/login') ||
      url.startsWith('/register') ||
      url.startsWith('/forget-password');
  }

  // 👇 يظهر زرار السهم لما تنزل
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScroll = window.scrollY > 300;
  }

  // 👇 يرجعك لأول الصفحة
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
