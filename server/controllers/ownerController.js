import { log } from "console";
import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs'
import Booking from "../models/Booking.js";


export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list cars" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Now you can list cars" })
    }
}


// APi to List Car


export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // Optimization through imageKit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' }, // width resizing
                { quality: 'auto' }, // Auto Compression 
                { format: 'webp' } // conver to modern format
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({ ...car, owner: _id, image });

        res.json({ success: true, message: "Car Added" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}


// API to Lít Owner Cars

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

// API to Toggle Car Availability

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById({ owner: _id })

        // Checking is car belongs to the user 
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        car.isAvaliable = !car.isAvaliable;
        await car.save();

        res.json({ success: true, message: "Avalibility Toggled" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}


// API delete car
export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId)

        //checking car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        car.owner = null;
        car.isAvaliable = false;

        res.json({ success: true, message: "Car Removed" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

// API to get Dashboard Data

export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user;

        if (role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" })
        }
        const cars = await Car.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 })

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" })

        // Caculate monthlyRevenue from bookings where status is confirmed

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.splice(0, 3),
            monthlyRevenue
        }

        res.json({ success: true, dashboardData })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}


// API to update user image
export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })
        // Optimization through imageKit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' }, // width resizing
                { quality: 'auto' }, // Auto Compression 
                { format: 'webp' } // conver to modern format
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, { image });

        res.json({ success: true, message: "Image Updated" })
    } catch (error) {

    }
}