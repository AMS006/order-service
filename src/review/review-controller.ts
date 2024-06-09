import { AuthRequest } from "../common/types";
import { ReviewService } from "./review-service";

export class ReviewController {
    constructor(private reviewService: ReviewService) { }

    createReview = async (req: AuthRequest, res: any) => {
        try {
            const review = req.body;
            review.userId = String(req.auth.sub);
            const createdReview = await this.reviewService.createReview(review);
            res.status(201).send(createdReview);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    getTopReviews = async (req: any, res: any) => {
        try {
            console.log("getTopReviews");
            const topReviews = await this.reviewService.getTopReviews();
            res.status(200).send(topReviews);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    getReviewsByProductId = async (req: any, res: any) => {
        try {
            const productId = req.params.productId;
            const reviews = await this.reviewService.getReviewsByProductId(productId);
            res.status(200).send(reviews);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    getReviewsByRestaurantId = async (req: any, res: any) => {
        try {
            const restaurantId = req.params.restaurantId;
            const reviews = await this.reviewService.getReviewsByRestaurantId(restaurantId);
            res.status(200).send(reviews);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    deleteReview = async (req: any, res: any) => {
        try {
            const reviewId = req.params.reviewId;
            const deletedReview = await this.reviewService.deleteReview(reviewId);
            res.status(200).send(deletedReview);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}