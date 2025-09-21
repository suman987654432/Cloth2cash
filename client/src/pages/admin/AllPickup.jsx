import React, { useEffect, useState } from 'react';

const AllPickup = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    fullName: '',
    phone: '',
    city: '',
    date: ''
  });

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await fetch('https://cloth2cash.onrender.com/api/schedule');
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

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredPickups = pickups.filter(pickup =>
    (pickup.fullName || '').toLowerCase().includes(filter.fullName.toLowerCase()) &&
    (pickup.phone || '').toLowerCase().includes(filter.phone.toLowerCase()) &&
    (pickup.city || '').toLowerCase().includes(filter.city.toLowerCase()) &&
    (pickup.date || '').toLowerCase().includes(filter.date.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">All Pickup Orders</h2>
      <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          name="fullName"
          placeholder="Filter by Name"
          value={filter.fullName}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[150px] bg-gray-50"
        />
        <input
          type="text"
          name="phone"
          placeholder="Filter by Phone"
          value={filter.phone}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[150px] bg-gray-50"
        />
        <input
          type="text"
          name="city"
          placeholder="Filter by City"
          value={filter.city}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[150px] bg-gray-50"
        />
        <input
          type="text"
          name="date"
          placeholder="Filter by Date"
          value={filter.date}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[150px] bg-gray-50"
        />
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : filteredPickups.length === 0 ? (
        <div className="text-center text-gray-500">No pickup orders found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-600 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Full Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Address</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Pincode</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Time Slot</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Cloth Types</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Estimated Qty</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Special Instructions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPickups.map((pickup, idx) => (
                <tr
                  key={pickup._id}
                  className={`transition-colors duration-150 ${
                    idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-green-50`}
                >
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.fullName}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.phone}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.address}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.city}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.pincode}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.timeSlot}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {Array.isArray(pickup.clothTypes) ? pickup.clothTypes.join(', ') : ''}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.estimatedQuantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{pickup.specialInstructions}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
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