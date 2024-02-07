import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";


export const getAllDoctors = async (req, res) => {

    try {
        const response = await Admin.find({});
        res.status(200).json({message: "Doctors data", success: true, data: response});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: false, error});
    }
};

export const getAllUsers = async (req, res) => {
    
    try {
        const response = await User.find({});
        res.status(200).json({message: "Users data", success: true, data: response});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: false, error});
    }
};

export const changeAccountStatus = async (req, res) => {
    
    try {
        const {doctorId, status} = req.body;
        const doctor = await Admin.findByIdAndUpdate(doctorId, {status});
        const user = await User.findOne({_id: doctor.userId});
        const notification = user.notification;
        notification.push({
            type: 'Doctor_account_update_request',
            message: 'your doctor account request has been approved',
            onClickPath: '/notification'
        });

        user.isDoctor = status === 'approved' ? true : false;
        await user.save();
        res.status(200).json({message: "account status updated", success: false, data: doctor});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: false, error});
    }
};