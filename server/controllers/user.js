import User from "../routes/user.js";
import { createError } from "../error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const SignUp = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return next(createError(409, "Email is already in use"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        const createdUser = await user.save();

        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
            expiresIn: "30d",
        });

        return res.status(201).json({ token, user });
    } catch (error) {
        next(error);
    }
};

export const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return next(createError(404, "User not found"));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(403, "Incorrect password"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "30d",
        });

        return res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
};
