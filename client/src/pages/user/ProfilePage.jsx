import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Calendar, Truck, Package, Award, Coins, Clock, CheckCircle, AlertCircle, Edit, LogOut, RefreshCw } from 'lucide-react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('pickups');
    const [userData, setUserData] = useState(null);
    const [pickupOrders, setPickupOrders] = useState([]);
    const [loadingPickups, setLoadingPickups] = useState(false);
    const [pickupError, setPickupError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
            navigate('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(user);
            setUserData({
                id: parsedUser.id || parsedUser._id || 'UC001',
                name: parsedUser.name || parsedUser.fullName || 'User',
                email: parsedUser.email || 'user@example.com',
                phone: parsedUser.phone || parsedUser.phoneNumber || '+91 00000 00000',
                address: parsedUser.address || 'Address not provided',
                profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
                joinDate: parsedUser.createdAt || parsedUser.joinDate || '2024-01-15',
                totalEarnings: parsedUser.totalEarnings || 0,
                totalOrders: parsedUser.totalOrders || 0,
                rewardPoints: parsedUser.rewardPoints || 0,
                membershipLevel: parsedUser.membershipLevel || 'Silver'
            });

            // Fetch all pickup orders for the logged-in user
            fetchPickupOrders(parsedUser.email, parsedUser.phone || parsedUser.phoneNumber);
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/login');
        }
    }, [navigate]);

    const fetchPickupOrders = async (email, phone) => {
        try {
            setLoadingPickups(true);
            setPickupError(null);
            
            const res = await fetch('https://cloth2cash.onrender.com/api/schedule');
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log('Fetched pickup data:', data); // Debug log
            
            // Handle different API response structures
            let allPickups = [];
            if (Array.isArray(data)) {
                allPickups = data;
            } else if (data.pickups && Array.isArray(data.pickups)) {
                allPickups = data.pickups;
            } else if (data.data && Array.isArray(data.data)) {
                allPickups = data.data;
            } else if (data.schedules && Array.isArray(data.schedules)) {
                allPickups = data.schedules;
            }
            
            console.log('Processed pickups:', allPickups); // Debug log
            
            // Normalize user data for comparison
            const userEmail = (email || '').trim().toLowerCase();
            const userPhone = (phone || '').trim().replace(/\s+/g, '');
            
            console.log('User email:', userEmail, 'User phone:', userPhone); // Debug log
            
            // Filter pickups for this user
            const userPickups = allPickups.filter(pickup => {
                if (!pickup) return false;
                
                const pickupEmail = (pickup.email || '').trim().toLowerCase();
                const pickupPhone = (pickup.phone || pickup.phoneNumber || '').trim().replace(/\s+/g, '');
                
                console.log('Comparing:', { pickupEmail, pickupPhone }, 'with', { userEmail, userPhone }); // Debug log
                
                return pickupEmail === userEmail || pickupPhone === userPhone;
            });
            
            console.log('Filtered user pickups:', userPickups); // Debug log
            setPickupOrders(userPickups);
            
        } catch (err) {
            console.error('Error fetching pickup orders:', err);
            setPickupError(err.message || 'Failed to fetch pickup orders');
            setPickupOrders([]);
        } finally {
            setLoadingPickups(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    // Dummy earnings data
    const earningsData = [
        { month: 'March 2024', amount: 1245, orders: 3 },
        { month: 'February 2024', amount: 2340, orders: 5 },
        { month: 'January 2024', amount: 1890, orders: 4 }
    ];

    // Dummy rewards data
    const rewardsData = [
        { id: 1, title: 'Early Bird', description: 'Complete 5 orders', points: 100, achieved: true },
        { id: 2, title: 'Eco Warrior', description: 'Recycle 10kg+ clothes', points: 200, achieved: true },
        { id: 3, title: 'Gold Member', description: 'Earn ₹10,000+', points: 500, achieved: true },
        { id: 4, title: 'Super Seller', description: 'Complete 25 orders', points: 150, achieved: false }
    ];

    // Helper for status display - Updated with new statuses
    const getPickupStatusText = (pickup) => {
        if (pickup.status) {
            switch (pickup.status.toLowerCase()) {
                case 'completed': return 'Completed';
                case 'pending': return 'Pending';
                case 'scheduled': return 'Scheduled';
                case 'in-progress': return 'In Progress';
                case 'cancelled': return 'Cancelled';
                default: return 'Pending';
            }
        }
        
        // Fallback to date logic if no status
        if (pickup.date) {
            const pickupDate = new Date(pickup.date);
            const today = new Date();
            const diffTime = pickupDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) return 'Completed';
            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Tomorrow';
            return 'Scheduled';
        }
        
        return 'Pending';
    };

    const getPickupStatusColor = (pickup) => {
        if (pickup.status) {
            switch (pickup.status.toLowerCase()) {
                case 'completed': return 'bg-green-100 text-green-800';
                case 'pending': return 'bg-gray-100 text-gray-800';
                case 'scheduled': return 'bg-blue-100 text-blue-800';
                case 'in-progress': return 'bg-yellow-100 text-yellow-800';
                case 'cancelled': return 'bg-red-100 text-red-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        }
        
        // Fallback to date logic if no status
        if (pickup.date) {
            const pickupDate = new Date(pickup.date);
            const today = new Date();
            const diffTime = pickupDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) return 'bg-green-100 text-green-800';
            if (diffDays === 0) return 'bg-red-100 text-red-800';
            if (diffDays === 1) return 'bg-yellow-100 text-yellow-800';
            return 'bg-blue-100 text-blue-800';
        }
        
        return 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (pickup) => {
        if (pickup.status) {
            switch (pickup.status) {
                case 'completed': return <CheckCircle className="w-4 h-4" />;
                case 'pending': return <Clock className="w-4 h-4" />;
                case 'scheduled': return <Calendar className="w-4 h-4" />;
                case 'in-progress': return <Truck className="w-4 h-4" />;
                case 'cancelled': return <AlertCircle className="w-4 h-4" />;
                default: return <Clock className="w-4 h-4" />;
            }
        }
        return <Calendar className="w-4 h-4" />;
    };

    // Add a refresh handler
    const handleRefreshPickups = () => {
        if (userData) {
            fetchPickupOrders(userData.email, userData.phone);
        }
    };

    if (!userData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-4 sm:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-green-200 overflow-hidden mb-4 sm:mb-6 lg:mb-8">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-white">
                        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                            <div className="relative">
                                <img
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-2 sm:border-4 border-white shadow-lg"
                                />
                                <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 bg-green-400 rounded-full p-1.5 sm:p-2 cursor-pointer hover:bg-yellow-300 transition-colors duration-200">
                                    <Edit className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-800" />
                                </div>
                            </div>
                            <div className="text-center lg:text-left flex-1">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{userData.name}</h1>
                                <p className="text-green-100 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">{userData.membershipLevel} Member</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-green-100 text-xs sm:text-sm lg:text-base">
                                    <div className="flex items-center justify-center lg:justify-start gap-2">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="break-all">{userData.email}</span>
                                    </div>
                                    <div className="flex items-center justify-center lg:justify-start gap-2">
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>{userData.phone}</span>
                                    </div>
                                    <div className="flex items-center justify-center lg:justify-start gap-2 md:col-span-2">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                        <span className="text-center lg:text-left">{userData.address}</span>
                                    </div>
                                </div>
                                {/* Logout Button */}
                                <div className="mt-4 flex justify-center lg:justify-start">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base font-medium"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 p-4 sm:p-6 lg:p-8 bg-gray-50">
                        <div className="text-center p-2 sm:p-3">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">₹{userData.totalEarnings.toLocaleString()}</div>
                            <div className="text-gray-600 text-xs sm:text-sm">Total Earnings</div>
                        </div>
                        <div className="text-center p-2 sm:p-3">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{pickupOrders.length}</div>
                            <div className="text-gray-600 text-xs sm:text-sm">Total Orders</div>
                        </div>
                        <div className="text-center p-2 sm:p-3">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">{userData.rewardPoints}</div>
                            <div className="text-gray-600 text-xs sm:text-sm">Reward Points</div>
                        </div>
                        <div className="text-center p-2 sm:p-3">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">
                                {new Date(userData.joinDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm">Member Since</div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-green-200 mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex flex-wrap border-b border-gray-200">
                        {[
                            {
                                id: 'pickups',
                                label: 'Pickup Orders',
                                icon: Truck
                            },
                            {
                                id: 'earnings',
                                label: 'Earnings',
                                icon: Coins
                            },
                            {
                                id: 'rewards',
                                label: 'Rewards',
                                icon: Award
                            }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-3 sm:py-4 font-medium transition-all duration-200 text-xs sm:text-sm lg:text-base flex-1 min-w-0 ${
                                    activeTab === tab.id
                                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                }`}
                            >
                                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="hidden sm:inline truncate">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-3 sm:p-4 lg:p-6">
                        {/* Pickup Orders Tab */}
                        {activeTab === 'pickups' && (
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-between items-center mb-4 sm:mb-6">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Your Pickup Orders</h3>
                                    <button
                                        onClick={handleRefreshPickups}
                                        className="flex items-center gap-1 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-xs sm:text-sm font-medium transition"
                                        title="Refresh"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Refresh
                                    </button>
                                </div>
                                
                                {pickupError && (
                                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                                        <p className="font-medium">Error loading pickup orders:</p>
                                        <p className="text-sm">{pickupError}</p>
                                    </div>
                                )}
                                
                                {loadingPickups ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                                        <p className="text-gray-600">Loading pickup orders...</p>
                                    </div>
                                ) : pickupOrders.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>No pickup orders found.</p>
                                        <p className="text-sm mt-2">Orders will appear here once you schedule a pickup.</p>
                                    </div>
                                ) : (
                                    pickupOrders.map((pickup, index) => (
                                        <div key={pickup._id || pickup.id || index} className="bg-gradient-to-r from-white to-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-all duration-200">
                                            <div className="flex flex-col gap-3 sm:gap-4">
                                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                            <span className="text-base sm:text-lg font-bold text-gray-800">
                                                                Pickup #{pickup.pickupId || pickup._id?.slice(-6) || (index + 1)}
                                                            </span>
                                                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 w-fit ${getPickupStatusColor(pickup)}`}>
                                                                {getStatusIcon(pickup)}
                                                                <span>{getPickupStatusText(pickup)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                                            <div>
                                                                <strong>Date:</strong> {pickup.date ? new Date(pickup.date).toLocaleDateString('en-IN') : 'N/A'}
                                                            </div>
                                                            <div>
                                                                <strong>Time:</strong> {pickup.timeSlot || pickup.time || 'N/A'}
                                                            </div>
                                                            <div>
                                                                <strong>Quantity:</strong> {pickup.estimatedQuantity || pickup.quantity || 'N/A'}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                                            <div>
                                                                <strong>City:</strong> {pickup.city || 'N/A'}
                                                            </div>
                                                            <div>
                                                                <strong>Pincode:</strong> {pickup.pincode || pickup.zipCode || 'N/A'}
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <strong className="text-xs sm:text-sm text-gray-600">Cloth Types:</strong>
                                                            <span className="text-xs sm:text-sm text-gray-800 ml-2 break-words">
                                                                {Array.isArray(pickup.clothTypes) 
                                                                    ? pickup.clothTypes.join(', ') 
                                                                    : pickup.clothTypes || 'N/A'}
                                                            </span>
                                                        </div>
                                                        <div className="mt-2">
                                                            <strong className="text-xs sm:text-sm text-gray-600">Address:</strong>
                                                            <span className="text-xs sm:text-sm text-gray-800 ml-2 break-words">
                                                                {pickup.address || pickup.fullAddress || 'N/A'}
                                                            </span>
                                                        </div>
                                                        {pickup.specialInstructions && (
                                                            <div className="mt-2">
                                                                <strong className="text-xs sm:text-sm text-gray-600">Special Instructions:</strong>
                                                                <span className="text-xs sm:text-sm text-gray-800 ml-2 break-words">{pickup.specialInstructions}</span>
                                                            </div>
                                                        )}
                                                        {pickup.updatedAt && pickup.updatedAt !== pickup.createdAt && (
                                                            <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                                                                <div className="text-xs text-yellow-800">
                                                                    <strong>Last Updated:</strong> {new Date(pickup.updatedAt).toLocaleString('en-IN')}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-t sm:border-t-0 sm:border-l border-gray-200 sm:min-w-[180px]">
                                                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Contact Info</div>
                                                        <div className="font-medium text-gray-800 text-sm sm:text-base mb-1">
                                                            {pickup.fullName || pickup.name || 'N/A'}
                                                        </div>
                                                        <a href={`tel:${pickup.phone || pickup.phoneNumber}`} className="text-green-600 hover:text-green-700 text-xs sm:text-sm block mb-1">
                                                            {pickup.phone || pickup.phoneNumber || 'N/A'}
                                                        </a>
                                                        <a href={`mailto:${pickup.email}`} className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm block truncate">
                                                            {pickup.email || 'N/A'}
                                                        </a>
                                                        {pickup.createdAt && (
                                                            <div className="text-xs text-gray-500 mt-2">
                                                                <strong>Scheduled:</strong><br />
                                                                {new Date(pickup.createdAt).toLocaleDateString('en-IN')}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Earnings Tab */}
                        {activeTab === 'earnings' && (
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Earnings History</h3>
                                <div className="grid gap-3 sm:gap-4">
                                    {earningsData.map((earning, index) => (
                                        <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                                                <div>
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-800">{earning.month}</h4>
                                                    <p className="text-gray-600 text-sm sm:text-base">{earning.orders} orders completed</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl sm:text-2xl font-bold text-green-600">₹{earning.amount}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rewards Tab */}
                        {activeTab === 'rewards' && (
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Rewards & Achievements</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {rewardsData.map(reward => (
                                        <div key={reward.id} className={`border rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-200 ${
                                            reward.achieved 
                                                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-md' 
                                                : 'bg-gray-50 border-gray-200'
                                        }`}>
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                    reward.achieved ? 'bg-yellow-400' : 'bg-gray-300'
                                                }`}>
                                                    <Award className={`w-5 h-5 sm:w-6 sm:h-6 ${reward.achieved ? 'text-yellow-800' : 'text-gray-600'}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{reward.title}</h4>
                                                    <p className="text-gray-600 text-xs sm:text-sm mb-2">{reward.description}</p>
                                                    <div className="flex items-center gap-2">
                                                        <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 flex-shrink-0" />
                                                        <span className="text-xs sm:text-sm font-medium text-yellow-600">{reward.points} points</span>
                                                    </div>
                                                </div>
                                                {reward.achieved && (
                                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;