import { Request } from "express";

export type AuthCookie = {
  accessToken: string;
};
export interface Tenant {
  id: string;
  name: string;
  address: string;
}
export interface AuthRequest extends Request {
  auth: {
    sub: string;
    role: string;
    id?: string;
    tenant: Tenant;
  };
}

export interface AddressType {
  name: string;
  mobile: string;
  house: string;
  area: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
  userId: string;
}
