import mongoose from "mongoose";

// Utility function to generate a unique crop ID (example)


const cropSchema = new mongoose.Schema({
    cropId: { type: String, required: true, unique: true },
    cropName: { type: String, required: true },
    farmerNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    farmerUsername: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    harvestDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },

    // Distributor details – optional until assigned
    distributorUsername: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    distributorPrice: { type: Number },
    distributorDate: { type: Date },
    distributorLocation: { type: String },
    distributorDeliveryName: { type: String },
    distributorPhone: { type: String },
    distributorDeliveryNumber: { type: Number, unique: true, sparse: true },

    // Retailer details – optional until assigned
    retailerUsername: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    retailerPrice: { type: Number },
    retailerDate: { type: Date },
    retailerLocation: { type: String }
});

// Export the Crop model
const Crop = mongoose.models.Crop || mongoose.model('Crop', cropSchema);
export default Crop;
