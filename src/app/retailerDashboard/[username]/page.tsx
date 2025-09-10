"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";
import QRCode from "react-qr-code";

// ✅ Helper function to download QR code as PNG
import { generateDownloadableQrCode } from "@/helpers/generateQR";

interface Crop {
  _id: { $oid: string };
  cropId: string;
  cropName: string;
  quantity: number;
  price: number;
  location: string;
  harvestDate: { $date: string };
  expiryDate: { $date: string };
  retailerPrice: number;
  retailerDate: { $date: string };
  retailerLocation: string;
}

export default function Page({ params }: { params: { username: string } }) {
  const { username } = params;
  const [scannedResult, setScannedResult] = useState("");
  const [formData, setFormData] = useState({
    cropId: "",
    retailerPrice: "",
    retailerDate: "",
    retailerLocation: "",
  });
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [retailerCrops, setRetailerCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const qrRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();

  useEffect(() => {
    if (scannedResult) {
      setFormData((prev) => ({ ...prev, cropId: scannedResult }));
    }
  }, [scannedResult]);

  const fetchRetailerCrops = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/crops/retailer/fetch");
      const crops = response.data.crops || [];
      setRetailerCrops(Array.isArray(crops) ? crops : [crops]);
    } catch (error: any) {
      console.error("Error fetching crops:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetailerCrops();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);
        if (code) {
          setScannedResult(code.data);
          setFormData((prev) => ({ ...prev, cropId: code.data }));
        } else {
          setScannedResult("No QR code found.");
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "", type: "" });
    try {
      const response = await axios.put("/api/crops/retailer/add", formData);
      setFormStatus({ message: response.data.message, type: "success" });
      setFormData({
        cropId: "",
        retailerPrice: "",
        retailerDate: "",
        retailerLocation: "",
      });
      fetchRetailerCrops();
    } catch (error: any) {
      console.error("Error submitting crop:", error);
      const message =
        error.response?.data?.message || "Failed to submit crop.";
      setFormStatus({ message, type: "error" });
    }
  };

  const tableHeaderClass =
    "px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider";
  const tableDataClass = "px-6 py-4 whitespace-nowrap text-sm text-stone-200";

  return (
    <div className="bg-stone-900 min-h-screen p-8 font-sans text-purple-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-300 drop-shadow-lg">
          Retailer Dashboard
        </h1>

        {/* QR Code Scanner Section */}
        <div className="bg-stone-800 rounded-lg shadow-xl p-6 mb-12 border border-purple-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-200">Scan Crop QR Code</h2>
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
          <h2 className="text-2xl font-bold mb-6 text-purple-200">Update Crop Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Crop ID</label>
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
                <label className="block text-sm font-medium mb-1">Retailer Price</label>
                <input
                  type="number"
                  name="retailerPrice"
                  value={formData.retailerPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Retailer Date</label>
                <input
                  type="date"
                  name="retailerDate"
                  value={formData.retailerDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Retailer Location</label>
                <input
                  type="text"
                  name="retailerLocation"
                  value={formData.retailerLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  required
                />
              </div>
            </div>
            <div className="flex items-end justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 font-bold text-lg rounded-full bg-purple-700 hover:bg-purple-600 transition-colors duration-200 border-2 border-purple-900 shadow-md hover:shadow-lg"
              >
                Submit
              </button>
            </div>
            {formStatus.message && (
              <p
                className={`mt-4 col-span-full text-center ${
                  formStatus.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {formStatus.message}
              </p>
            )}
          </form>
        </div>

        {/* Retailer Crop Ledger Section */}
        <div className="bg-stone-800 rounded-lg shadow-xl p-6 border border-purple-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-200">Handled Crops</h2>
          {loading ? (
            <p className="text-center text-stone-400">Loading crops...</p>
          ) : retailerCrops.length === 0 ? (
            <p className="text-center text-stone-400">No crops found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-stone-700">
                <thead className="bg-stone-700">
                  <tr>
                    <th className={tableHeaderClass}>Crop ID</th>
                    <th className={tableHeaderClass}>Crop Name</th>
                    <th className={tableHeaderClass}>Quantity</th>
                    <th className={tableHeaderClass}>Price</th>
                    <th className={tableHeaderClass}>Retailer Price</th>
                    <th className={tableHeaderClass}>Retailer Date</th>
                    <th className={tableHeaderClass}>Retailer Location</th>
                    <th className={tableHeaderClass}>QR Code</th>
                    <th className={tableHeaderClass}>Action</th>
                  </tr>
                </thead>
                <tbody className="bg-stone-800 divide-y divide-stone-700">
                  {retailerCrops.map((Crops) => (
                    <tr key={Crops._id.$oid} className="hover:bg-stone-700 transition-colors duration-150">
                      <td className={tableDataClass}>{Crops.cropId}</td>
                      <td className={tableDataClass}>{Crops.cropName}</td>
                      <td className={tableDataClass}>{Crops.quantity} kg</td>
                      <td className={tableDataClass}>${Crops.price}</td>
                      <td className={tableDataClass}>${Crops.retailerPrice}</td>
                      <td className={tableDataClass}>
                        {new Date(Crops.retailerDate.$date).toLocaleDateString()}
                      </td>
                      <td className={tableDataClass}>{Crops.retailerLocation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div
                          id={`qrcode-${Crops.cropId}`}
                          ref={(el) => {
                            // Corrected code: no return value from the ref callback
                            qrRefs.current[Crops.cropId] = el;
                          }}
                          className="inline-block p-2 bg-stone-900 rounded-md"
                        >
                          <QRCode value={Crops.cropId} size={64} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => generateDownloadableQrCode(Crops.cropId)}
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
}