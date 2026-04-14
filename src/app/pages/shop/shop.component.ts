import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../data.service';
import { CartService } from '../../cart.service';
import { WishlistService } from '../../wishlist.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {

  products:any[] = [];
  slug:string = '';
  searchQuery:string = '';
  isLoading = true;

  constructor(
    private route:ActivatedRoute,
    private categoryService:CategoryService,
    private cartService:CartService,
    private wishlistService:WishlistService
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.slug = params['slug'] || '';

      this.route.queryParams.subscribe(query => {

        this.searchQuery = query['q'] || '';

        this.isLoading = true;

        /* لو فيه بحث */
        if (this.searchQuery) {

          this.categoryService.searchProducts(this.searchQuery)
          .subscribe((res:any)=>{

            this.products = res.products;
            this.isLoading = false;

          });

        }

        /* لو فيه كاتيجوري */
        else if (this.slug) {

          this.categoryService.getProductsByCategory(this.slug)
          .subscribe((res:any)=>{

            this.products = res.products;
            this.isLoading = false;

          });

        }

        /* كل المنتجات */
        else {

          this.categoryService.getAllProducts()
          .subscribe((res:any)=>{

            this.products = res.products;
            this.isLoading = false;

          });

        }

      });

    });

  }

  /* wishlist toggle */
  toggleWishlist(product:any){

    product.liked = !product.liked;

    if(product.liked){
      this.wishlistService.addToWishlist(product);
    }
    else{
      this.wishlistService.removeFromWishlist(product);
    }

  }

  /* add to cart + flying animation */
  addToCart(product:any, img:HTMLImageElement){

    const cartIcon = document.querySelector(".cart-icon");

    if(!cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = img.cloneNode(true) as HTMLElement;

    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.transition = "all .8s cubic-bezier(.2,.8,.2,1)";
    flyingImg.style.zIndex = "9999";
    flyingImg.style.pointerEvents = "none";

    document.body.appendChild(flyingImg);

    setTimeout(()=>{

      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "30px";
      flyingImg.style.opacity = "0";

    });

    setTimeout(()=>{
      flyingImg.remove();
    },800);

    this.cartService.addToCart(product);

    product.added = true;

    setTimeout(()=>{
      product.added = false;
    },2000);

  }

  trackProduct(index:number, product:any){
    return product.id;
  }

}
