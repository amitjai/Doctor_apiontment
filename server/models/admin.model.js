import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

    userId: {
        type: Object
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    phone: {
        type: String,
        required: [true, 'mobile number is required']
    },
    email: {
        type: String,
        required: [true, 'email is required.']
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    specialization: {
        type: String,
        required: [true, 'specialization is required']
    },
    experiences: {
        type: String,
        required: [true, 'experience is required']
    },
    qualification: {
        type: Array,
        default: []
    },
    feesForCunsaltation: {
        type: Number,
        required: [true, 'doctor fees is required']
    },
    status: {
        type: String,
        default: 'pending'
    },
    time: {
        type: String,
        required: [true, 'work time is required']
    }

}, {timestamps: true});


export const Admin = mongoose.model("Admin", adminSchema);

