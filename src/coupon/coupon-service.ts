import CouponModal from "./coupon-modal";
import { CouponType, Filters, Pagination } from "./coupon-type";

export class CouponService {
    async createCoupon(coupon: CouponType) {
        // First Create a document in the CouponModal collection
        return await CouponModal.create(coupon);
    }

    async getCoupons(filters: Filters, pagination: Pagination) {
        const skip = (pagination.page - 1) * pagination.limit;
        const currentDate = new Date();

        const pipeline = [
            {
                $match: filters,
            },
            {
                $addFields: {
                    status: {
                        $cond: {
                            if: { $and: [{ $gte: ["$validFrom", currentDate] }, { $lte: ["$validTill", currentDate] }] },
                            then: "active",
                            else: "inactive",
                        },
                    },
                }
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: pagination.limit }],
                    total: [{ $count: "total" }],
                },

            },
            {
                $project: {
                    data: 1,
                    total: { $arrayElemAt: ["$total.total", 0] },
                },
            },
        ];

        const result = await CouponModal.aggregate(pipeline);

        return result[0];
    }

    async updateCoupon(id: string, coupon: CouponType) {
        return await CouponModal.findByIdAndUpdate(id, coupon, { new: true });
    }

    async deleteCoupon(id: string) {
        return await CouponModal.findByIdAndDelete(id);
    }

    async applyCoupon(couponCode: string, orderAmount: number) {
        const coupon = await CouponModal.findOne({ couponCode, isActive: true });
        if (!coupon) {
            return { error: "Invalid Coupon Code" };
        }
        if (orderAmount < coupon.minOrderAmount) {
            return { error: "Minimum order amount not met" };
        }
        if (coupon.validFrom > new Date() || coupon.validTill < new Date()) {
            return { error: "Coupon code not valid" };
        }
        return { discount: coupon.discount };
    }

}