import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/users')
        setUsers(response.data.users || response.data || [])
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const filteredUsers = users.filter(user =>
    (user.name || '').toLowerCase().includes(filter.name.toLowerCase()) &&
    (user.email || '').toLowerCase().includes(filter.email.toLowerCase()) &&
    (user.phone || '').toLowerCase().includes(filter.phone.toLowerCase()) &&
    (user.address || '').toLowerCase().includes(filter.address.toLowerCase())
  )

  if (loading) return <div className="text-center py-8 text-gray-500">Loading users...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <>
      <div className="flex flex-wrap md:flex-row gap-3 mb-6 bg-white p-4 rounded-lg shadow userpage-filterbox">
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filter.name}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[180px] bg-gray-50"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filter.email}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[180px] bg-gray-50"
        />
        <input
          type="text"
          name="phone"
          placeholder="Filter by Phone"
          value={filter.phone}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[180px] bg-gray-50"
        />
        <input
          type="text"
          name="address"
          placeholder="Filter by Address"
          value={filter.address}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none min-w-[180px] bg-gray-50"
        />
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden userpage-table-container p-0 md:p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full userpage-table">
            <thead>
              <tr>
                <th className="bg-gray-100 text-gray-900 font-semibold px-3 py-3 border-b-2 border-gray-200 text-left">Name</th>
                <th className="bg-gray-100 text-gray-900 font-semibold px-3 py-3 border-b-2 border-gray-200 text-left">Email</th>
                <th className="bg-gray-100 text-gray-900 font-semibold px-3 py-3 border-b-2 border-gray-200 text-left">Phone</th>
                <th className="bg-gray-100 text-gray-900 font-semibold px-3 py-3 border-b-2 border-gray-200 text-left">Address</th>
                <th className="bg-gray-100 text-gray-900 font-semibold px-3 py-3 border-b-2 border-gray-200 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">No users found</td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user._id || user.id || index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-3 py-3 border-b text-gray-800">{user.name || 'N/A'}</td>
                    <td className="px-3 py-3 border-b text-gray-800">{user.email || 'N/A'}</td>
                    <td className="px-3 py-3 border-b text-gray-800">{user.phone || 'N/A'}</td>
                    <td className="px-3 py-3 border-b text-gray-800">{user.address || 'N/A'}</td>
                    <td className="px-3 py-3 border-b text-gray-800">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UserPage