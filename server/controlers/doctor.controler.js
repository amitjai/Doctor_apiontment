import { Admin } from "../models/admin.model.js";


export const getDoctorInfo = async (req, res) => {

    try {
        const doctor = await Admin.findOne({userId: req.body.userId});
        res.status(200).json({success: true, data: doctor});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: false, error});
    }
};

export const updateDoctorInfo = async (req, res) => {

    try {
        const doctor = await Admin.findByIdAndUpdate({userId: req.body.userId});
        res.status(200).json({message: "Doctor profile updated", success: true, data: doctor});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: true, error});
    }
};

export const getDoctorById = async (req, res) => {

    try {
        const doctor = await Admin.findById({_id: req.body.doctorId});
        res.status(200).json({message: "Doctor info fetch", success: true, data: doctor});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error", success: true, error});
    }
};