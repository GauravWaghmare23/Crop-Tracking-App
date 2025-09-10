"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";
import QRCode from "react-qr-code";
import { generateDownloadableQrCode } from "@/helpers/generateQR"; // ✅ Your existing helper function

interface Crop {
  _id: { $oid: string };
  cropId: string;
  cropName: string;
  quantity: number;
  farmerNumber: { $oid: string };
  farmerUsername: { $oid: string };
  price: number;
  location: string;
  harvestDate: { $date: string };
  expiryDate: { $date: string };
  createdAt: { $date: string };
  distributorDate: { $date: string };
  distributorDeliveryName: string;
  distributorDeliveryNumber: number;
  distributorLocation: string;
  distributorPhone: string;
  distributorPrice: number;
  distributorUsername: { $oid: string };
  __v: number;
}

const DistributorDashboard = () => {
  const [scannedResult, setScannedResult] = useState("");
  const [distributorCrops, setDistributorCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    cropId: "",
    distributorPrice: "",
    distributorDate: "",
    distributorLocation: "",
    distributorDeliveryName: "",
    distributorPhone: "",
    distributorDeliveryNumber: "",
  });
  const qrRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();

  useEffect(() => {
    if (scannedResult) {
      setFormData((prev) => ({ ...prev, cropId: scannedResult }));
    }
  }, [scannedResult]);

  const fetchDistributorCrops = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/crops/distributor/fetch");
      console.log("API response:", response.data);
      const crops = response.data.crops || response.data;
      setDistributorCrops(Array.isArray(crops) ? crops : [crops]);
    } catch (error: any) {
      console.error("Failed to fetch distributor crops:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributorCrops();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (code) {
              setScannedResult(code.data);
            } else {
              setScannedResult("No QR code found in image.");
            }
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "", type: "" });
    try {
      const response = await axios.put("/api/crops/distributor/add", formData);
      setFormStatus({ message: response.data.message, type: "success" });
      setFormData({
        cropId: "",
        distributorPrice: "",
        distributorDate: "",
        distributorLocation: "",
        distributorDeliveryName: "",
        distributorPhone: "",
        distributorDeliveryNumber: "",
      });
      fetchDistributorCrops();
    } catch (error: any) {
      console.error("Failed to update crop:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update crop.";
      setFormStatus({ message: errorMessage, type: "error" });
    }
  };

  const tableHeaderClass =
    "px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider";
  const tableDataClass = "px-6 py-4 whitespace-nowrap text-sm text-stone-200";

  return (
    <div className="bg-stone-900 min-h-screen p-8 font-sans text-purple-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-300 drop-shadow-lg">
          Distributor Dashboard
        </h1>

        {/* QR Code Scanner Section */}
        <div className="bg-stone-800 rounded-lg shadow-xl p-6 mb-12 border border-purple-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-200">
            Scan Crop QR Code
          </h2>
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-stone-400">
              Upload a QR code image to get the Crop ID.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-white bg-stone-700 rounded-md p-2"
            />
            {scannedResult && (
              <div className="mt-4 p-4 bg-stone-700 rounded-md shadow-inner text-center">
                <p className="font-bold text-purple-300">Scanned Crop ID:</p>
                <p className="break-all">{scannedResult}</p>
              </div>
            )}
          </div>
        </div>

        {/* Update Crop Section */}
        <div className="bg-stone-800 rounded-lg shadow-xl p-6 mb-12 border border-purple-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-200">
            Update Crop Details
          </h2>
          <form
            onSubmit={handleUpdateCrop}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Crop ID
                </label>
                <input
                  type="text"
                  name="cropId"
                  value={formData.cropId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Distributor Price
                </label>
                <input
                  type="number"
                  name="distributorPrice"
                  value={formData.distributorPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Distributor Date
                </label>
                <input
                  type="date"
                  name="distributorDate"
                  value={formData.distributorDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Distributor Location
                </label>
                <input
                  type="text"
                  name="distributorLocation"
                  value={formData.distributorLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Delivery Name
                </label>
                <input
                  type="text"
                  name="distributorDeliveryName"
                  value={formData.distributorDeliveryName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Distributor Phone
                </label>
                <input
                  type="text"
                  name="distributorPhone"
                  value={formData.distributorPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Delivery Number
                </label>
                <input
                  type="text"
                  name="distributorDeliveryNumber"
                  value={formData.distributorDeliveryNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 font-bold text-lg rounded-full bg-purple-700 hover:bg-purple-600 transition-colors duration-200 border-2 border-purple-900 shadow-md hover:shadow-lg"
                >
                  Update Crop
                </button>
              </div>
              {formStatus.message && (
                <p
                  className={`mt-4 text-center ${
                    formStatus.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formStatus.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Distributor Crop Ledger Section */}
        <div className="bg-stone-800 rounded-lg shadow-xl p-6 border border-purple-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-200">
            My Handled Crops
          </h2>
          {loading ? (
            <p className="text-center text-stone-400">Loading crops...</p>
          ) : distributorCrops.length === 0 ? (
            <p className="text-center text-stone-400">
              No crops recorded by this distributor yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-stone-700">
                <thead className="bg-stone-700">
                  <tr>
                    <th scope="col" className={tableHeaderClass}>
                      Crop ID
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Crop Name
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Quantity
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Farmer #
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Farmer Username
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Price
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Distributor Price
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Distributor Date
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Delivery Name
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Delivery Number
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      QR Code
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-stone-800 divide-y divide-stone-700">
                  {distributorCrops.map((crops) => (
                    <tr
                      key={crops._id.$oid || crops.cropId}
                      className="hover:bg-stone-700 transition-colors duration-150"
                    >
                      <td className={tableDataClass}>{crops.cropId}</td>
                      <td className={tableDataClass}>{crops.cropName}</td>
                      <td className={tableDataClass}>{crops.quantity} kg</td>
                      <td className={tableDataClass}>
                        {crops.farmerNumber.$oid}
                      </td>
                      <td className={tableDataClass}>
                        {crops.farmerUsername.$oid}
                      </td>
                      <td className={tableDataClass}>${crops.price}</td>
                      <td className={tableDataClass}>
                        ${crops.distributorPrice}
                      </td>
                      <td className={tableDataClass}>
                        {new Date(
                          crops.distributorDate.$date
                        ).toLocaleDateString()}
                      </td>
                      <td className={tableDataClass}>
                        {crops.distributorDeliveryName}
                      </td>
                      <td className={tableDataClass}>
                        {crops.distributorDeliveryNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div
                          id={`qrcode-${crops.cropId}`}
                          ref={(el) => {
                            qrRefs.current[crops.cropId] = el;
                          }}
                          className="inline-block p-2 bg-stone-900 rounded-md"
                        >
                          <QRCode value={crops.cropId} size={64} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <button
                          onClick={() =>
                            generateDownloadableQrCode(crops.cropId)
                          }
                          className="px-4 py-2 font-bold text-sm text-white bg-amber-700 rounded-full hover:bg-amber-600 transition-colors duration-200"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Canvas for QR Download */}
      <canvas id="qr-canvas" className="hidden"></canvas>
    </div>
  );
};

export default DistributorDashboard;
