import { Response } from "express";
import { AuthRequest } from "../common/types";
import { CouponService } from "./coupon-service";

export class CouponController {
    constructor(private couponService: CouponService) { }

    createCoupon = async (req: AuthRequest, res: Response) => {
        const coupon = req.body;
        const response = await this.couponService.createCoupon(coupon);
        res.status(200).json(response);
    }

    getCoupons = async (req: AuthRequest, res: Response) => {
        const response = await this.couponService.getCoupons();
        res.status(200).json(response);
    }

    updateCoupon = async (req: AuthRequest, res: Response) => {
        const id = req.params.id;
        const coupon = req.body;
        const response = await this.couponService.updateCoupon(id, coupon);
        res.status(200).json(response);
    }

    deleteCoupon = async (req: AuthRequest, res: Response) => {
        const id = req.params.id;
        const response = await this.couponService.deleteCoupon(id);
        res.status(200).json(response);
    }

    applyCoupon = async (req: AuthRequest, res: Response) => {
        const couponCode = req.body.couponCode;
        const orderAmount = req.body.orderAmount;
        const response = await this.couponService.applyCoupon(couponCode, orderAmount);
        res.status(200).json(response);
    }
}