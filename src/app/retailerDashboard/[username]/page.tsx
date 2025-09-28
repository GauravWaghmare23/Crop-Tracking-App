"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";
import QRCode from "react-qr-code";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-50">
      <div className="px-6 pt-8 pb-2">
        <h1 className="text-5xl font-extrabold text-emerald-900 leading-none" style={{letterSpacing: "-1px"}}>
          Retailer's Ledger
        </h1>
        <p className="text-emerald-900/80 text-lg mt-2 mb-4">
          Update crop sale records, scan QR tags, and export your handled entries.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Left side - QR & Update Form */}
        <div>
          {/* QR Scanner Card */}
          <div className="bg-white/95 border border-emerald-200 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-emerald-900">Scan Crop QR</h2>
            <p className="mb-4 text-emerald-800/80">Upload a QR image to get Crop ID below.</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block mb-4 px-3 py-2 rounded-lg border border-emerald-200 bg-slate-100 focus:border-emerald-400 focus:outline-none"
            />
            {scannedResult && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-900 break-all mb-4 text-center">
                <span className="font-bold">Scanned Crop ID:</span>
                <div className="text-xs mt-1">{scannedResult}</div>
              </div>
            )}
          </div>
          {/* Update Crop Details */}
          <div className="bg-white/95 border border-emerald-200 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-emerald-900">Update Crop Sale</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-emerald-800 block mb-1">Crop ID</label>
                <input
                  type="text"
                  name="cropId"
                  value={formData.cropId}
                  onChange={handleChange}
                  readOnly
                  required
                  className="w-full rounded-md border border-emerald-200 px-3 py-2 bg-slate-100 text-brown-700"
                  style={{ color: "#884800" }}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-emerald-800 block mb-1">Retailer Price</label>
                <input
                  type="number"
                  name="retailerPrice"
                  value={formData.retailerPrice}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full rounded-md border border-emerald-200 px-3 py-2 bg-slate-100"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-emerald-800 block mb-1">Retailer Date</label>
                <input
                  type="date"
                  name="retailerDate"
                  value={formData.retailerDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-emerald-200 px-3 py-2 bg-slate-100"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-emerald-800 block mb-1">Retailer Location</label>
                <input
                  type="text"
                  name="retailerLocation"
                  value={formData.retailerLocation}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-emerald-200 px-3 py-2 bg-slate-100"
                />
              </div>
              <button
                type="submit"
                className="mt-4 py-2 px-4 text-lg font-semibold rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
              >
                Update Ledger
              </button>
              {formStatus.message && (
                <div className={`mt-2 text-center font-semibold ${formStatus.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
        {/* Right side - Crops Cards Grid */}
        <div className="bg-white/95 border border-emerald-200 rounded-2xl shadow-lg p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-900">Your Sales</h2>
            <button
              onClick={fetchRetailerCrops}
              className="px-4 py-1 text-md font-bold bg-emerald-600 text-white rounded hover:bg-emerald-700"
              type="button"
            >
              Refresh
            </button>
          </div>
          {loading ? (
            <p className="text-center text-emerald-800/70">Loading crops...</p>
          ) : retailerCrops.length === 0 ? (
            <p className="text-center text-emerald-800/70">No sales found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5 overflow-y-auto max-h-[60vh] pr-2">
              {retailerCrops.map((Crops) => (
                <div
                  key={Crops._id.$oid}
                  className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow space-y-2 flex flex-col mb-2"
                >
                  <div className="flex items-start justify-between">
                    <span>
                      <span className="font-bold text-emerald-800 text-xl">{Crops.cropName}</span>
                      <span className="block text-brown-700 text-xs font-mono mt-1" style={{ color: "#884800" }}>
                        ID: {Crops.cropId}
                      </span>
                    </span>
                    <div className="text-right">
                      <span className="block text-base font-semibold text-emerald-700">
                        Qty: <span className="font-bold">{Crops.quantity}</span> <span className="text-xs">kg</span>
                      </span>
                      <span className="block text-base font-semibold text-emerald-700">
                        Price: <span className="font-bold">{Crops.price}</span>
                      </span>
                      <span className="block text-base font-semibold text-teal-800">
                        R.Price: <span className="font-bold">{Crops.retailerPrice}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-700 mb-2 text-sm">
                    <span className="block">Location: {Crops.retailerLocation}</span>
                    <span>
                      Harvest: {new Date(Crops.harvestDate.$date).toLocaleDateString()}
                      <br />
                      Expiry: {new Date(Crops.expiryDate.$date).toLocaleDateString()}
                      <br />
                      Sale: {new Date(Crops.retailerDate.$date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div
                      id={`qrcode-${Crops.cropId}`}
                      ref={(el) => {
                        qrRefs.current[Crops.cropId] = el;
                      }}
                      className="bg-white p-2 rounded shadow"
                    >
                      <QRCode value={Crops.cropId} size={64} />
                    </div>
                    <button
                      type="button"
                      onClick={() => generateDownloadableQrCode(Crops.cropId)}
                      className="px-3 py-1 bg-emerald-700 text-white text-sm rounded hover:bg-emerald-800"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Hidden Canvas for QR Download */}
      <canvas id="qr-canvas" className="hidden"></canvas>
    </div>
  );
}
