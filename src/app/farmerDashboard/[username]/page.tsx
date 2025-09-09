"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { generateDownloadableQrCode } from '@/helpers/generateQR';
import { v4 as uuidv4 } from 'uuid';

// Define the shape of the crop data
interface Crop {
    _id: string;
    cropId: string;
    cropName: string;
    quantity: number;
    price: number;
    location: string;
    harvestDate: string;
    expiryDate: string;
}

const FarmerDashboard = () => {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [formData, setFormData] = useState({
        cropId: uuidv4(),
        cropName: '',
        quantity: '',
        price: '',
        location: '',
        harvestDate: '',
        expiryDate: '',
    });
    const [loading, setLoading] = useState(true);
    const [formStatus, setFormStatus] = useState({ message: '', type: '' });
    const router = useRouter();

    // Fetch crops from the API
    const fetchCrops = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/crops/farmer/fetch');
            setCrops(response.data.crops);
        } catch (error: any) {
            console.error('Failed to fetch crops:', error);
            if (error.response?.status === 401) {
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCrops();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Add a new crop via API call
    const handleAddCrop = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus({ message: '', type: '' });
        try {
            const response = await axios.post('/api/crops/farmer/add', formData);
            setFormStatus({ message: response.data.message, type: 'success' });
            // Reset form and generate a new UUID for the next entry
            setFormData({
                cropId: uuidv4(),
                cropName: '',
                quantity: '',
                price: '',
                location: '',
                harvestDate: '',
                expiryDate: '',
            });
            fetchCrops(); // Refresh the crop list
        } catch (error: any) {
            console.error('Failed to add crop:', error);
            const errorMessage = error.response?.data?.message || 'Failed to add crop.';
            setFormStatus({ message: errorMessage, type: 'error' });
        }
    };

    const tableHeaderClass = "px-6 py-3 text-left text-xs font-medium text-amber-100 uppercase tracking-wider";
    const tableDataClass = "px-6 py-4 whitespace-nowrap text-sm text-stone-200";

    return (
        <div className="bg-stone-800 min-h-screen p-8 font-serif text-amber-100">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-amber-300 drop-shadow-lg">
                    Farmer's Ledger
                </h1>

                {/* Add Crop Section */}
                <div className="bg-stone-900 rounded-lg shadow-xl p-6 mb-12 border border-amber-700">
                    <h2 className="text-2xl font-bold mb-6 text-amber-200">Record New Harvest</h2>
                    <form onSubmit={handleAddCrop} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Crop ID</label>
                                <input
                                    type="text"
                                    name="cropId"
                                    value={formData.cropId}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                    required
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Crop Name</label>
                                <input
                                    type="text"
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Quantity (kg)</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price per kg</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Harvest Date</label>
                                <input
                                    type="date"
                                    name="harvestDate"
                                    value={formData.harvestDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                                    required
                                />
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-6 py-3 font-bold text-lg rounded-full bg-amber-700 hover:bg-amber-600 transition-colors duration-200 border-2 border-amber-900 shadow-md hover:shadow-lg"
                                >
                                    Add Crop to Ledger
                                </button>
                            </div>
                            {formStatus.message && (
                                <p className={`mt-4 text-center ${formStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                    {formStatus.message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Crop Ledger Section */}
                <div className="bg-stone-900 rounded-lg shadow-xl p-6 border border-amber-700">
                    <h2 className="text-2xl font-bold mb-6 text-amber-200">Current Harvests</h2>
                    {loading ? (
                        <p className="text-center text-stone-400">Loading crops...</p>
                    ) : crops.length === 0 ? (
                        <p className="text-center text-stone-400">No crops recorded yet.</p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full divide-y divide-stone-700">
                                <thead className="bg-stone-800">
                                    <tr>
                                        <th scope="col" className={tableHeaderClass}>Crop ID</th>
                                        <th scope="col" className={tableHeaderClass}>Crop Name</th>
                                        <th scope="col" className={tableHeaderClass}>Quantity</th>
                                        <th scope="col" className={tableHeaderClass}>Price</th>
                                        <th scope="col" className={tableHeaderClass}>Location</th>
                                        <th scope="col" className={tableHeaderClass}>Harvest Date</th>
                                        <th scope="col" className={tableHeaderClass}>Expiry Date</th>
                                        <th scope="col" className={`${tableHeaderClass} text-center`}>QR Code</th>
                                        <th scope="col" className={`${tableHeaderClass} text-center`}>Download</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-stone-900 divide-y divide-stone-700">
                                    {crops.map((crop) => (
                                        <tr key={crop._id} className="hover:bg-stone-800 transition-colors duration-150">
                                            <td className={tableDataClass}>{crop.cropId}</td>
                                            <td className={tableDataClass}>{crop.cropName}</td>
                                            <td className={tableDataClass}>{crop.quantity} kg</td>
                                            <td className={tableDataClass}>${crop.price}</td>
                                            <td className={tableDataClass}>{crop.location}</td>
                                            <td className={tableDataClass}>{new Date(crop.harvestDate).toLocaleDateString()}</td>
                                            <td className={tableDataClass}>{new Date(crop.expiryDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                <div id={`qrcode-container-${crop.cropId}`} className="inline-block rounded-lg shadow-md p-2 bg-stone-100">
                                                    <QRCode 
                                                        value={crop.cropId} 
                                                        size={64} 
                                                        id={`qrcode-${crop.cropId}`}
                                                        viewBox={`0 0 64 64`}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                <button
                                                    onClick={() => generateDownloadableQrCode(crop.cropId)}
                                                    className="px-4 py-2 font-bold text-sm text-white bg-amber-700 rounded-full hover:bg-amber-600 transition-colors duration-200"
                                                >
                                                    Download
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Hidden canvas for QR code generation (needed for SVG to PNG conversion) */}
                            <canvas id="qr-canvas" className="hidden"></canvas>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;
