"use client";

import React, { useState } from "react";
import axios from "axios";
import jsQR from "jsqr";

interface ScanIconProps {
  className?: string;
}

const ScanIcon: React.FC<ScanIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
    <path d="M21 21v.01" />
    <path d="M16 21v.01" />
    <path d="M21 16v.01" />
    <path d="M12 7v3a2 2 0 0 1-2 2H7" />
    <path d="M12 7v3a2 2 0 0 0 2 2h3" />
    <path d="M12 7v.01" />
    <path d="M12 17v.01" />
    <path d="M12 12v.01" />
  </svg>
);

interface CropData {
  [key: string]: unknown;
}

const getCropDataColumns = (data: CropData[]): string[] => {
  if (!data || data.length === 0) return [];
  const sample = data[0];
  const allKeys = new Set<string>();
  Object.keys(sample).forEach((key) => allKeys.add(key));
  return Array.from(allKeys);
};

export default function AllDataPage() {
  const [cropId, setCropId] = useState<string>("");
  const [data, setData] = useState<CropData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [scanMessage, setScanMessage] = useState<string>(
    "Upload or drag a QR code image"
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setScanMessage("Scanning...");

      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const image = new Image();
        if (e.target && typeof e.target.result === "string") {
          image.src = e.target.result;
        } else {
          setError("Failed to read file.");
          setScanMessage("Operation failed.");
          return;
        }

        image.onload = () => {
          try {
            scanImage(image);
          } catch {
            setScanMessage("Error processing image.");
            setError("Failed to process image. Please try again.");
          }
        };
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const scanImage = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      setError("Failed to get 2D canvas context.");
      setScanMessage("Operation failed.");
      return;
    }
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);

    const imageData = context.getImageData(0, 0, image.width, image.height);
    let code = null;
    try {
      code = jsQR(imageData.data, imageData.width, imageData.height);
    } catch (e) {
      setError(
        "QR code decoding failed. Please ensure the image is a clear QR code and try again."
      );
      setScanMessage(
        "Error decoding QR code. It may be too blurry or not a valid QR code."
      );
      return;
    }

    if (code) {
      setCropId(code.data);
      setScanMessage(`Found Crop ID: ${code.data}. Fetching data...`);
      handleFetch(code.data);
    } else {
      setScanMessage("No QR code found in the image.");
      setError("Could not detect a QR code. Please try another image.");
    }
  };

  const handleFetch = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const getResponse = await axios.get(`/api/crops/data/get?cropId=${id}`);
      if (getResponse.status === 200) {
        setData(getResponse.data.crops || []);
        setScanMessage("Data fetched successfully!");
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error: unknown) {
      console.error("API Error:", error);
      setError(`An error occurred: ${(error as Error).message || "Unknown error"}`);
      setScanMessage("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const headers =
    data.length > 0
      ? getCropDataColumns(data)
      : [
          "cropId",
          "cropName",
          "farmerNumber",
          "farmerUsername",
          "quantity",
          "price",
          "location",
          "harvestDate",
          "expiryDate",
          "createdAt",
          "distributorUsername",
          "distributorPrice",
          "distributorDate",
          "distributorLocation",
          "distributorDeliveryName",
          "distributorPhone",
          "distributorDeliveryNumber",
          "retailerUsername",
          "retailerPrice",
          "retailerDate",
          "retailerLocation",
        ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-6">
      <div className="w-full max-w-5xl rounded-3xl bg-white p-10 shadow-2xl flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <ScanIcon className="h-16 w-16 text-green-700" />
          <h1 className="text-4xl font-bold text-green-800">
            Crop Data Dashboard
          </h1>
          <p className="text-center text-green-600">{scanMessage}</p>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-green-400 p-8 text-center bg-green-50">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer rounded-lg bg-green-600 px-8 py-4 font-semibold text-white text-lg transition-colors hover:bg-green-700"
          >
            Upload QR Code Image
          </label>
        </div>

        {cropId && (
          <div className="text-center text-xl font-medium text-green-700">
            Detected Crop ID:{" "}
            <span className="text-green-800 font-bold">{cropId}</span>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
            <span className="ml-4 text-green-600 text-lg">Loading data...</span>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500 bg-red-50 p-6 text-center text-red-700 text-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {data.length > 0 && (
          <div className="flex flex-col gap-8">
            {data.map((item, index) => (
              <div
                key={(item.cropId as string) || index}
                className="rounded-2xl border border-green-300 bg-green-50 p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-bold text-green-800 mb-6">
                  Crop Details
                </h2>
                {headers.map((header, colIndex) => (
                  <div key={colIndex} className="mb-6">
                    <h3 className="text-green-700 font-semibold text-lg">
                      {header}
                    </h3>
                    <p className="text-green-900 text-xl mt-2">
                      {item[header] !== undefined
                        ? JSON.stringify(item[header], null, 2)
                        : "—"}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
