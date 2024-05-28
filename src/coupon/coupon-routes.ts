import express from 'express';
import { CouponService } from './coupon-service';
import authenticate from '../common/middleware/authenticate';
import { asyncWrapper } from '../utils';
import canAccess from '../common/middleware/canAccess';
import { CouponController } from './coupon-controller';

const router = express.Router();

const couponService = new CouponService();
const couponController = new CouponController(couponService);

router.post(
    '/',
    authenticate,
    canAccess(['admin']),
    asyncWrapper(couponController.createCoupon)
);

router.get(
    '/',
    authenticate,
    canAccess(['admin']),
    asyncWrapper(couponController.getCoupons)
);

router.put(
    '/:id',
    authenticate,
    canAccess(['admin']),
    asyncWrapper(couponController.updateCoupon)
);

router.delete(
    '/:id',
    authenticate,
    canAccess(['admin']),
    asyncWrapper(couponController.deleteCoupon)
);

router.post(
    '/apply',
    authenticate,
    asyncWrapper(couponController.applyCoupon)
);

export default router;