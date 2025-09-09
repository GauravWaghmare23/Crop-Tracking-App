import React from 'react';

export default function Page({ params }: { params: { username: string } }) {
  const { username } = params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-yellow-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">Welcome, {username}!</h1>
        <p className="text-xl text-gray-600">This is your Retailer Dashboard.</p>
        <div className="mt-8 text-left">
          <p className="font-semibold text-lg text-amber-700">Dashboard functionality will go here:</p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Manage store inventory</li>
            <li>Place orders from distributors</li>
            <li>Analyze sales data</li>
            <li>Customer relationship management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
