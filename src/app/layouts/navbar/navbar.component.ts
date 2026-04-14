import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Auth, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { CartService } from '../../cart.service';
import { WishlistService } from '../../wishlist.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private auth = inject(Auth);
  private router = inject(Router);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  cartCount$ = this.cartService.cartCount$;

  wishlistCount:number = 0;
  wishlistItems:any[] = [];

  heartAnimate = false;

  navbarType: string = '';
  isLoggedIn: boolean = false;

  private lastScrollTop = 0;

  showCartDropdown = false;
  showWishlistDropdown = false;

  /* search */
  searchText:string = '';
  suggestions:any[] = [];
  showSuggestions = false;

  ngOnInit() {

    this.wishlistService.wishlistCount$.subscribe(count=>{

      if(count > this.wishlistCount){
        this.triggerHeartAnimation();
      }

      this.wishlistCount = count;

    });

    this.wishlistService.wishlistItems$.subscribe(items=>{
      this.wishlistItems = items;
    });

    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
    });

    let route = this.router.routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    this.navbarType = route.snapshot.data['navbar'] || '';

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        let route = this.router.routerState.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        this.navbarType = route.snapshot.data['navbar'] || '';

        setTimeout(() => this.closeNavbar(), 0);
      });
  }

  triggerHeartAnimation(){

    this.heartAnimate = true;

    setTimeout(()=>{
      this.heartAnimate = false;
    },400);

  }

  toggleCart(){
    this.showCartDropdown = !this.showCartDropdown;
    this.showWishlistDropdown = false;
  }

  toggleWishlist(){
    this.showWishlistDropdown = !this.showWishlistDropdown;
    this.showCartDropdown = false;
  }

  removeFromWishlist(product:any){
    this.wishlistService.removeFromWishlist(product);
  }

  /* live search */
  onSearchChange(value:string){

    this.searchText = value;

    if(value.length < 2){
      this.showSuggestions = false;
      return;
    }

    fetch(`https://dummyjson.com/products/search?q=${value}`)
    .then(res=>res.json())
    .then(data=>{
      this.suggestions = data.products.slice(0,5);
      this.showSuggestions = true;
    });

  }

  /* search action */
  search(query:string){

    if(!query.trim()) return;

    this.showSuggestions = false;

    this.router.navigate(['/shop'],{
      queryParams:{ q: query }
    });

  }

  @HostListener('document:click',['$event'])
  closeDropdown(event:any){

    const cart = document.querySelector('.cart-box');
    const wish = document.querySelector('.wish-box');

    if(!cart?.contains(event.target)){
      this.showCartDropdown = false;
    }

    if(!wish?.contains(event.target)){
      this.showWishlistDropdown = false;
    }

  }

  @HostListener('window:scroll', [])
  onScroll() {

    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    const navbar = document.querySelector('nav');
    if (!navbar) return;

    if (currentScroll > this.lastScrollTop && currentScroll > 80) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarContent');
    if (navbarCollapse?.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  }

  get showProtectedNavbar() {
    return this.navbarType === 'protected' && this.isLoggedIn;
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

}
