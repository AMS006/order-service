import OrderModal from "../order/order-modal";
import ReviewModal from "./review-modal";
import { ReviewType } from "./review-type";

export class ReviewService {
    async createReview(review: ReviewType) {
        const createdReview = await ReviewModal.create(review);
        // Update isReviewAdded in order collection
        await OrderModal.findByIdAndUpdate(review.orderId, { isReviewAdded: true });

        return createdReview;
    }

    async getTopReviews() {
        return ReviewModal.find().sort({ rating: -1 }).limit(5);
    }

    async getReviewsByProductId(productId: string) {
        return ReviewModal.find({ productId });
    }

    async getReviewsByRestaurantId(restaurantId: string) {
        return ReviewModal.find({ restaurantId });
    }

    async deleteReview(reviewId: string) {
        return ReviewModal.findByIdAndDelete(reviewId);
    }
}