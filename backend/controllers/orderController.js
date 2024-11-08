import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK);
//create order for frontend
export const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100 *0.73,
                },
                quantity:item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "gbp",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2*100*0.73,
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.status(201).json({session_url: session.url});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.status(200).json({message: "Payment Successful"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.status(400).json({message: "Payment Failed"});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//create order for backend
export const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.status(200).json({ orders });
    } catch (error) {
        res.staus(404).json({ message: error.message });
    }
}

export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ orders });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.status(200).json({ message: "Status Updated" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}