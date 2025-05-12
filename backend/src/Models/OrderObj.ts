import { v4 as uuidv4 } from 'uuid';

export interface OrderItem {
    productId: number;
    quantity: number;
}

export class OrderObject {
    orderId: string;
    traceId: string;
    userId: number;
    items: OrderItem[];
    paymentMethod: string;
    shippingAddress: string;
    createdAt: string;

    constructor(
        userId: number,
        items: OrderItem[],
        paymentMethod: string,
        shippingAddress: string
    ) {
        this.orderId = uuidv4();
        this.traceId = uuidv4();
        this.userId = userId;
        this.items = items;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
        this.createdAt = new Date().toISOString();
    }
}
