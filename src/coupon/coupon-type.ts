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

export interface Filters {
    couponCode?: { $regex: string; $options: string };

}

export interface Pagination {
    page: number;
    limit: number;
}