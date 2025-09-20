import React, { useEffect, useState } from 'react';

const AllPickup = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/schedule');
        const data = await res.json();
        setPickups(Array.isArray(data) ? data : []);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setPickups([]);
      }
      setLoading(false);
    };
    fetchPickups();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-green-700">All Pickup Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : pickups.length === 0 ? (
        <div>No pickup orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="px-3 py-2 border">Full Name</th>
                <th className="px-3 py-2 border">Phone</th>
                <th className="px-3 py-2 border">Email</th>
                <th className="px-3 py-2 border">Address</th>
                <th className="px-3 py-2 border">City</th>
                <th className="px-3 py-2 border">Pincode</th>
                <th className="px-3 py-2 border">Date</th>
                <th className="px-3 py-2 border">Time Slot</th>
                <th className="px-3 py-2 border">Cloth Types</th>
                <th className="px-3 py-2 border">Estimated Qty</th>
                <th className="px-3 py-2 border">Special Instructions</th>
                <th className="px-3 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup) => (
                <tr key={pickup._id} className="hover:bg-green-50">
                  <td className="px-3 py-2 border">{pickup.fullName}</td>
                  <td className="px-3 py-2 border">{pickup.phone}</td>
                  <td className="px-3 py-2 border">{pickup.email}</td>
                  <td className="px-3 py-2 border">{pickup.address}</td>
                  <td className="px-3 py-2 border">{pickup.city}</td>
                  <td className="px-3 py-2 border">{pickup.pincode}</td>
                  <td className="px-3 py-2 border">{pickup.date}</td>
                  <td className="px-3 py-2 border">{pickup.timeSlot}</td>
                  <td className="px-3 py-2 border">
                    {Array.isArray(pickup.clothTypes) ? pickup.clothTypes.join(', ') : ''}
                  </td>
                  <td className="px-3 py-2 border">{pickup.estimatedQuantity}</td>
                  <td className="px-3 py-2 border">{pickup.specialInstructions}</td>
                  <td className="px-3 py-2 border">
                    {pickup.createdAt ? new Date(pickup.createdAt).toLocaleString() : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPickup;