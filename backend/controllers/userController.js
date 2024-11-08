import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

//register user
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email" });
        }
        if(password.length < 8){
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const newUser = await userModel.create({ name:name, email:email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ user, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
    //6:13:29
}

//login user
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = createToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}

