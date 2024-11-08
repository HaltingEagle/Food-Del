import foodModel from "../models/foodModel.js";
import fs from "fs";

export const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.status(200).json({ food });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getFoodById = async (req, res) => {
    try{
        const food = await foodModel.findById(req.params.id);
        res.status(200).json({ food });
    }catch(error){
        res.status(404).json({ message: error.message });
        console.log(error)
    }
}

//add food
export const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const newFood = new foodModel({
        name: req.body.name,
        image: image_filename,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
    });
    try {
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
};

//delete food
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.params.id);
        fs.unlinkSync(`./uploads/${food.image}`);
        res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
}