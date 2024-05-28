export interface CouponType {
    code: string;
    discount: number;
    discountType: string;
    minOrderAmount: number;
    maxDiscount: number;
    validFrom: Date;
    validTill: Date;
    isActive: boolean;
}