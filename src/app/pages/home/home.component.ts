import { Component, OnInit, ElementRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CategoryService, Category } from '../../data.service';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];
  reviews: any[] = [];
  isLoading = true;

  constructor(
    private categoryService: CategoryService,
    private ReviewsService: ReviewsService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // تحميل الكاتيجوريز
    this.categoryService
      .getCategories()
      .pipe(
        retry({ count: 3, delay: 3000 }),
        catchError((err) => {
          console.error('Error loading categories:', err);
          return of([]);
        })
      )
      .subscribe((cats: Category[]) => {
        if (cats.length) {
          const customOrder = [
            'smartphones',
            'laptops',
            'vehicle',
            'motorcycle',
          ];

          const sortedCats: Category[] = [
            ...(customOrder
              .map((slug) => cats.find((c) => c.slug === slug))
              .filter(Boolean) as Category[]),
            ...cats.filter((c) => !customOrder.includes(c.slug)),
          ];

          this.loadCategoryImages(sortedCats);
        } else {
          this.finishLoading();
        }
      });

    // تحميل الريفيوز
    this.ReviewsService.getReviews().subscribe({
      next: (res: any) => {
        this.reviews =
          res.products
            ?.flatMap((p: any) => p.reviews)
            ?.sort((a: any, b: any) => b.rating - a.rating)
            ?.slice(0, 6) || [];

        this.finishLoading();
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.finishLoading();
      }
    });
  }

  // 🔥 مهم: نتأكد إن التحميل خلص بالكامل
  private finishLoading() {
    this.isLoading = false;

    setTimeout(() => {
      this.initScrollAnimation();
    }, 100);
  }

  private initScrollAnimation() {
    const elements = this.el.nativeElement.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
  threshold: 0.08,
  rootMargin: "0px 0px -60px 0px"
    });

    elements.forEach((el: Element) => {
      observer.observe(el);
    });
  }

  loadCategoryImages(cats: Category[]) {

    const requests = cats.map((cat) =>
      this.categoryService.getProductsByCategory(cat.slug).pipe(
        retry({ count: 3, delay: 3000 }),
        catchError((err) => {
          console.error(`Error loading products for ${cat.slug}:`, err);
          return of({ products: [] });
        })
      )
    );

    forkJoin(requests).subscribe({
      next: (responses: any[]) => {

        this.categories = cats.map((cat, index) => {

          if (cat.slug === 'smartphones') {
            return { ...cat, image: 'assets/images/iphone.png' };
          }

          if (cat.slug === 'vehicle') {
            return { ...cat, image: '/assets/images/ferari.png' };
          }

          if (cat.slug === 'laptops') {
            return { ...cat, image: '/assets/images/labtob.png' };
          }

          if (cat.slug === 'motorcycle') {
            return { ...cat, image: '/assets/images/generated.png' };
          }

          if (cat.slug === 'beauty') {
            return { ...cat, image: '/assets/images/beauty.png' };
          }

          if (cat.slug === 'fragrances') {
            return { ...cat, image: '/assets/images/perfum.jpeg' };
          }

          if (cat.slug === 'furniture') {
            return { ...cat, image: '/assets/images/furniture.png' };
          }

          if (cat.slug === 'groceries') {
            return { ...cat, image: '/assets/images/organicfood.png' };
          }

          if (cat.slug === 'home-decoration') {
            return { ...cat, image: '/assets/images/dicore.png' };
          }

          if (cat.slug === 'kitchen-accessories') {
            return { ...cat, image: '/assets/images/kitchen-accessories.png' };
          }

          if (cat.slug === 'mens-shirts') {
            return { ...cat, image: '/assets/images/manshirt.png' };
          }

          if (cat.slug === 'mens-shoes') {
            return { ...cat, image: '/assets/images/shoesman.png' };
          }

          if (cat.slug === 'mens-watches') {
            return { ...cat, image: '/assets/images/mens-watches.png' };
          }

          if (cat.slug === 'mobile-accessories') {
            return { ...cat, image: '/assets/images/mobile-accessories.png' };
          }

          if (cat.slug === 'skin-care') {
            return { ...cat, image: '/assets/images/skincare.png' };
          }

          if (cat.slug === 'sports-accessories') {
            return { ...cat, image: '/assets/images/sports.png' };
          }

          if (cat.slug === 'sunglasses') {
            return { ...cat, image: '/assets/images/sunglasses.png' };
          }

          if (cat.slug === 'tablets') {
            return { ...cat, image: '/assets/images/tablets.png' };
          }

          if (cat.slug === 'tops') {
            return { ...cat, image: '/assets/images/tops.jpeg' };
          }

          if (cat.slug === 'womens-bags') {
            return { ...cat, image: '/assets/images/bagswomen.png' };
          }

          if (cat.slug === 'womens-dresses') {
            return { ...cat, image: '/assets/images/womens-dresses.png' };
          }

          if (cat.slug === 'womens-jewellery') {
            return { ...cat, image: '/assets/images/womens-jewellery.png' };
          }

          if (cat.slug === 'womens-shoes') {
            return { ...cat, image: '/assets/images/shoseWomen.png' };
          }

          if (cat.slug === 'womens-watches') {
            return { ...cat, image: '/assets/images/women-waches.jpeg' };
          }

          return {
            ...cat,
            image: responses[index].products[0]?.thumbnail || '',
          };
        });

        this.finishLoading();
      },
      error: (err) => {
        console.error('Unexpected error:', err);
        this.finishLoading();
      }
    });
  }
}
