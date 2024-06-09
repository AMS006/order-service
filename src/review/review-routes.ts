import express from 'express';

import { ReviewController } from './review-controller';
import { ReviewService } from './review-service';
import authenticate from '../common/middleware/authenticate';

const reviewService = new ReviewService();
const reviewController = new ReviewController(reviewService);

const router = express.Router();

router.post(
    '/',
    authenticate,
    reviewController.createReview
);

router.get(
    '/top',
    reviewController.getTopReviews
);

router.get(
    '/product/:productId',
    reviewController.getReviewsByProductId
);

router.get(
    '/restaurant/:restaurantId',
    reviewController.getReviewsByRestaurantId
);

router.delete(
    '/:reviewId',
    authenticate,
    reviewController.deleteReview
);

export default router;