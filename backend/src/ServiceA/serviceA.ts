import { Request , Response} from "express";
import { OrderObject } from "../Models/OrderObj";
import { ApiResponse } from "../types/common";

export const placeOrderHandler = async (req: Request, res: Response) => {
    // sicne just a test module , we dont have to check for userId and get it in session
    // asume all data passed insid ethe request body
    const { userId, items, paymentMethod, shippingAddress } = req.body;

    // simple validate :
    if (!userId || !items || !paymentMethod || !shippingAddress) {
        const response: ApiResponse<null> = {
            success: false,
            message: "Missing required fields",
        };
        return res.status(400).json(response);
    }
    // Create a new order object
    try {
        const order = new OrderObject(
            userId,
            items,
            paymentMethod,
            shippingAddress
        );

        // Here you would typically save the order to a database
        // For this example, we'll just return the order object

        const response: ApiResponse<OrderObject> = {
            success: true,
            message: "Order placed successfully",
            data: order,
        };
        return res.status(201).json(response); // here we return a object just for test :
        
    }catch(err){
        const response: ApiResponse<null> = {
            success: false,
            message: "Error creating order",
            error: (err as Error).message,
        };
        return res.status(500).json(response);
    }
}