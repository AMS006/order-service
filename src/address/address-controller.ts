import { Response } from "express";
import { AuthRequest } from "../common/types";
import AddressService from "./address-service";

export class AddressController {
    constructor(private addressService: AddressService) { }

    createAddress = async (req: AuthRequest, res: Response) => {
        console.log(req.body, "Request body")
        const userId = req.auth.sub;
        if (!userId) return res.status(400).json({ message: "User not found" });
        const address = await this.addressService.createAddress({ ...req.body, userId });
        res.json(address);
    }

    getAddress = async (req: AuthRequest, res: Response) => {
        const userId = req.auth.sub;
        if (!userId) return res.status(400).json({ message: "User not found" });
        const address = await this.addressService.getAddress(userId);
        res.json(address);
    }

    updateAddress = async (req: AuthRequest, res: Response) => {
        const userId = req.auth.sub;
        if (!userId) return res.status(400).json({ message: "User not found" });
        const address = await this.addressService.updateAddress(req.params.id, req.body);
        res.json(address);
    }

    deleteAddress = async (req: AuthRequest, res: Response) => {
        const userId = req.auth.sub;
        if (!userId) return res.status(400).json({ message: "User not found" });
        await this.addressService.deleteAddress(req.params.id);
        res.json({ message: "Address deleted successfully" });
    }
}