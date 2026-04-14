import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: any[] = [];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewsService.getReviews().subscribe((res: any) => {

      const product = res.products.find((p: any) => p.reviews?.length);

      this.reviews = product?.reviews?.slice(0, 3) || [];

      console.log(this.reviews);
    });
  }
}
