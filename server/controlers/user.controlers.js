import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from "../models/admin.model.js";
import {Apointments} from "../models/apointment.model.js";

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const isMatch = await User.findOne({email: email});
        if(isMatch) {
            return res.status(401).json({message: "User already exists.", success: false});
        };
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password:hashPassword});
        await newUser.save();
        res.status(200).json({message: "User successfully signup", success: true, newUser});

    } catch(error) {
        res.status(500).json({message: "Server Error", success: false, error});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const isMatch = await User.findOne({email: email});

        if(!isMatch) {
            return res.status(401).json({message: "User not exists.", success: false}); 
        } 
        const verifyPassword = await bcrypt.compare(password, isMatch.password);
        if(!verifyPassword) {
            return res.status(401).json({message: "password not match.", success: false});
        }
        const token = jwt.sign({id: isMatch._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        const { ...rest} = isMatch._doc;
        res.status(200).json({message: "successfully Sign in..", success: true, rest, token});

    } catch(error) {
        res.status(500).json({message: "Server Error", success: false, error});
    }
};

export const authData = async (req, res) => {
    try {
        const user = await User.findById({_id: req.body.userId});
        if(!user) {
            return res.status(201).json({message: "User not found", success: false});
        }
        res.status(200).json({
            success: true, 
            data: user
        });
    } catch(error) {
        res.status(201).json({message: "Auth failed", success: false, error});
    }
};

export const applyDoctor = async (req, res) => {
     try {
        const newDoctor = await Admin({...req.body, status: 'pending'});
        await newDoctor.save();
        const adminUser = await User.findOne({isAdmin:true});
        const notification = adminUser.notification;
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has apply for account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        });
        await User.findByIdAndUpdate(adminUser._id, {notification});
        res.status(200).json({message: "successfully account created", success: true});

     } catch(error) {
        res.status(500).json({message: "Server Error", success: false, error});
     }
};

export const getAllNotification = async (req, res) => {
    
    try {
        const user = await User.findOne({_id: req.body.userId});
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification = [];
        user.seenNotification = notification;
        const updateUser = await User.save();
        res.status(200).json({message: "all notification marked as read", success: true, data: updateUser});

    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server error", success: false, error});
    }
};

export const getAllDoctorsList = async (req, res) => {

    try {
        const response = await Admin.find({status: "approved"});
        res.status(200).json({message: "doctor list fetch", success: true, data:response});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: false, error});
    }
};

export const bookApointment = async (req, res) => {

    try {
        req.body.status = "pending";
        const apoint = new Apointments(req.body);
        await apoint.save();
        const user = await User.findOne({_id: req.body.userId});
        user.notification.push({
            type: 'New-apointment-request',
            message: `A new apointment request from ${req.body.userInfo.username}`,
            clickPath: '/user/apointment'
        });
        await user.save();
        res.status(200).json({message: "apointment book successfully", success: true, data: user});

    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: false, error});
    }
}
