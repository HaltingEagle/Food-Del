import userModel from "../models/userModel.js";

//add to cart
export const addToCart = async (req, res) => {
    try {
        console.log(req.body.userId)
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });
        res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message + " Something went wrong" });
    }
}

//remove from cart
export const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId );
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 1){
            cartData[req.body.itemId] -= 1;
        }
        else{
            delete cartData[req.body.itemId];
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ message: "Item removed from cart" });

    } catch (error) {
        res.status(404).json({ message: error.message + " Something went wrong" });
    }
}

//get cart
export const getCartItems = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.status(200).json({ cartData });
    } catch (error) {
        res.status(404).json({ message: error.message + " Something went wrong" });
    }
}