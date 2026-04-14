import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  slug: string;
  name: string;
  url: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      'https://dummyjson.com/products/categories'
    );
  }

  getCategoryPreview(slug: string) {
    return this.http.get<any>(
      `https://dummyjson.com/products/category/${slug}`
    );
  }

  getProductsByCategory(slug: string) {
    return this.http.get<any>(
      `https://dummyjson.com/products/category/${slug}?limit=30`
    );
  }

  // ⭐ دي المهمة
  getAllProducts() {
    return this.http.get<any>(
      'https://dummyjson.com/products?limit=100'
    );
  }
searchProducts(query:string){
  return this.http.get(`https://dummyjson.com/products/search?q=${query}`);
}
}
