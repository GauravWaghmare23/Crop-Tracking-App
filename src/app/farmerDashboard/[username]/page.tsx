"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { generateDownloadableQrCode } from "@/helpers/generateQR";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
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

interface FormState {
  cropId: string;
  cropName: string;
  quantity: string;
  price: string;
  location: string;
  harvestDate: string;
  expiryDate: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function FarmerDashboard() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [formData, setFormData] = useState<FormState>({
    cropId: uuidv4(),
    cropName: "",
    quantity: "",
    price: "",
    location: "",
    harvestDate: "",
    expiryDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [formStatus, setFormStatus] = useState<{ message: string; type: "success" | "error" | "" }>({
    message: "",
    type: "",
  });
  const router = useRouter();
  const qrRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // --- API helpers ---
  const fetchCrops = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/crops/farmer/fetch");
      // Defensive: ensure array
      const fetched: Crop[] = Array.isArray(response.data?.crops) ? response.data.crops : [];
      setCrops(fetched);
    } catch (err: any) {
      console.error("fetchCrops error:", err);
      if (err?.response?.status === 401) router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      cropId: uuidv4(),
      cropName: "",
      quantity: "",
      price: "",
      location: "",
      harvestDate: "",
      expiryDate: "",
    });
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "", type: "" });

    // Basic client-side validation / sanitization
    if (!formData.cropName.trim()) return setFormStatus({ message: "Crop name is required.", type: "error" });
    if (!formData.location.trim()) return setFormStatus({ message: "Location is required.", type: "error" });
    if (!formData.quantity || Number(formData.quantity) <= 0) return setFormStatus({ message: "Quantity must be a positive number.", type: "error" });
    if (!formData.price || Number(formData.price) <= 0) return setFormStatus({ message: "Price must be a positive number.", type: "error" });
    if (!formData.harvestDate) return setFormStatus({ message: "Harvest date is required.", type: "error" });
    if (!formData.expiryDate) return setFormStatus({ message: "Expiry date is required.", type: "error" });

    try {
      const payload = {
        cropId: formData.cropId,
        cropName: formData.cropName.trim(),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        location: formData.location.trim(),
        harvestDate: formData.harvestDate,
        expiryDate: formData.expiryDate,
      };

      const response = await axios.post("/api/crops/farmer/add", payload);
      setFormStatus({ message: response.data?.message || "Crop added successfully.", type: "success" });
      resetForm();
      // Optimistic UI: add to local list (if API returns created item, prefer that)
      if (response.data?.crop) {
        setCrops((prev) => [response.data.crop, ...prev]);
      } else {
        // fallback: refetch
        fetchCrops();
      }
    } catch (err: any) {
      console.error("handleAddCrop error:", err);
      const msg = err?.response?.data?.message || "Failed to add crop. Please try again.";
      setFormStatus({ message: msg, type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4 font-sans text-amber-900">
      <div className="max-w-7xl mx-auto">
        <header className="pt-8 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900">Farmer's Ledger</h1>
            <p className="text-sm text-stone-600">Maintain harvest records, generate QR tags and export entries.</p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form panel */}
          <section className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-stone-200"
            >
              <h2 className="text-xl font-semibold mb-4">Record New Harvest</h2>

              <form onSubmit={handleAddCrop} className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <label className="text-xs font-medium text-stone-600">Crop ID</label>
                  <input readOnly name="cropId" value={formData.cropId} onChange={handleChange} className="w-full rounded-md px-3 py-2 bg-stone-50 border border-stone-200 text-sm" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <label className="text-xs font-medium text-stone-600">Crop Name</label>
                  <input name="cropName" value={formData.cropName} onChange={handleChange} required className="w-full rounded-md px-3 py-2 bg-stone-50 border border-stone-200 text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-600">Quantity (kg)</label>
                    <input name="quantity" type="number" min={0} value={formData.quantity} onChange={handleChange} required className="w-full rounded-md px-3 py-2 bg-stone-50 border border-stone-200 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600">Price / kg</label>
                    <input name="price" type="number" min={0} value={formData.price} onChange={handleChange} required className="w-full rounded-md px-3 py-2 bg-stone-50 border border-stone-200 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} required className="w-full rounded-md px-3 py-2 bg-stone-50 border border-stone-200 text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-600">Harvest Date</label>
                    <input name="harvestDate" type="date" value={formData.harvestDate} onChange={handleChange} required className="w-full rounded-md px-3 py-2 bg-stone-50 border border-stone-200 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600">Expiry Date</label>
                    <input name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} required className="w-full rounded-md px-3 py-2 bg-stone-50 border border-stone-200 text-sm" />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 text-white px-4 py-2 font-semibold shadow hover:scale-[1.01] transition-transform">
                    Add to Ledger
                  </button>
                </div>

                {formStatus.message && (
                  <div className={`text-sm mt-1 ${formStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>{formStatus.message}</div>
                )}
              </form>
            </motion.div>

            {/* Helpful actions */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-xs text-stone-500">
              <p>
                Pro tip: Use the <span className="font-medium">Download</span> button on each card to export a QR PNG for tagging physical crates.
              </p>
            </motion.div>
          </section>

          {/* List panel */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Current Harvests</h2>
              <button onClick={fetchCrops} className="text-sm px-3 py-1 rounded-md border border-stone-200 bg-white shadow-sm">Refresh</button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 border border-stone-200">
              {loading ? (
                <div className="py-12 text-center text-stone-500">Loading crops...</div>
              ) : crops.length === 0 ? (
                <div className="py-12 text-center text-stone-500">No crops recorded yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {crops.map((crop) => (
                      <motion.article
                        key={crop._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{ duration: 0.25 }}
                        className="relative bg-amber-50 rounded-xl p-4 border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-emerald-900">{crop.cropName}</h3>
                            <div className="text-xs text-stone-500 font-mono mt-1">ID: {crop.cropId}</div>
                          </div>
                          <div className="text-right text-xs text-stone-600">
                            <div>Qty: <span className="font-semibold">{crop.quantity} kg</span></div>
                            <div>Price: <span className="font-semibold">{crop.price}</span></div>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-stone-700">
                          <div>Location: {crop.location}</div>
                          <div>Harvest: {new Date(crop.harvestDate).toLocaleDateString()}</div>
                          <div>Expiry: {new Date(crop.expiryDate).toLocaleDateString()}</div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div id={`qrcode-${crop.cropId}`} ref={(el) => { qrRefs.current[crop.cropId] = el; }} className="bg-white p-2 rounded-md inline-block">
                            <QRCode value={crop.cropId} size={88} />
                          </div>

                          <div className="flex gap-2">
                            <button onClick={() => generateDownloadableQrCode(crop.cropId)} className="px-3 py-1 rounded-md bg-emerald-700 text-white text-sm font-medium shadow">Download</button>
                            {/* Future: action menu (edit/delete) */}
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Hidden canvas for possible SVG->PNG conversions by helper */}
              <canvas id="qr-canvas" className="hidden" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
