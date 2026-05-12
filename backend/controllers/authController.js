import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
    );
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existed = await User.findOne({ email });

        if (existed) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashed = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role
        });

        res.status(201).json({
            message: "User registered",
            status: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user._id, user.role)
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            status: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user._id, user.role)
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProfile = (req, res) => {
    const user = req.user;
    res.status(200).json(
        {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    )
}


export { registerUser, loginUser, getProfile };