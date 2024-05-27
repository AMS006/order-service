import { AddressType } from '../common/types';
import AddressModal from './address-modal';

export default class AddressService {
    async createAddress(address: AddressType) {
        return AddressModal.create(address);
    }

    async getAddress(userId: string) {
        return AddressModal.find({ userId });
    }

    async updateAddress(id: string, address: AddressType) {
        return AddressModal.findByIdAndUpdate(id, address, { new: true });
    }

    async deleteAddress(id: string) {
        return AddressModal.findByIdAndDelete(id);
    }
}