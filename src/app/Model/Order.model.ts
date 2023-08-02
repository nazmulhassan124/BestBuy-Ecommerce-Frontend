import { OrderDetails } from "./OrderDetails.model";

export class Order{
    orderId!: number;
    name!: string;
    email!: string;
    contact!: string;
    address!: string;
    nitPrice!:number;
    totalPrice!: number;
    userId!: number;
    status!:string
    orderDetails!:OrderDetails[];
}