import express from 'express';
import { AddressController } from './address-controller';
import AddressService from './address-service';
import { asyncWrapper } from '../utils';
import authenticate from '../common/middleware/authenticate';

const router = express.Router();

const addressController = new AddressController(new AddressService());

router.post(
    '/',
    authenticate,
    asyncWrapper(addressController.createAddress)
);

router.get(
    '/',
    authenticate,
    asyncWrapper(addressController.getAddress)
);

router.put(
    '/:id',
    authenticate,
    asyncWrapper(addressController.updateAddress)
);

router.delete(
    '/:id',
    authenticate,
    asyncWrapper(addressController.deleteAddress)
);

export default router;