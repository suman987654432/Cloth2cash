import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Calendar, Truck, Package, Award, Coins, Clock, CheckCircle, AlertCircle, Edit, LogOut } from 'lucide-react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
            navigate('/login');
            return;
        }

        const parsedUser = JSON.parse(user);
        setUserData({
            id: parsedUser.id || 'UC001',
            name: parsedUser.name || 'User',
            email: parsedUser.email || 'user@example.com',
            phone: parsedUser.phone || '+91 00000 00000',
            address: parsedUser.address || 'Address not provided',
            profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
            joinDate: parsedUser.createdAt || '2024-01-15',
            totalEarnings: parsedUser.totalEarnings || 0,
            totalOrders: parsedUser.totalOrders || 0,
            rewardPoints: parsedUser.rewardPoints || 0,
            membershipLevel: parsedUser.membershipLevel || 'Silver'
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    // Dummy orders data
    const ordersData = [
        {
            id: 'ORD001',
            date: '2024-03-15',
            status: 'completed',
            items: ['Cotton Shirts', 'Denim Jeans', 'Winter Jackets'],
            quantity: '5.2 kg',
            amount: 780,
            pickupBoy: 'Amit Sharma',
            pickupBoyPhone: '+91 87654 32109'
        },
        {
            id: 'ORD002',
            date: '2024-03-10',
            status: 'pending',
            items: ['T-shirts', 'Casual Pants'],
            quantity: '3.1 kg',
            amount: 465,
            pickupBoy: 'Suresh Kumar',
            pickupBoyPhone: '+91 76543 21098'
        },
        {
            id: 'ORD003',
            date: '2024-03-05',
            status: 'pickup_scheduled',
            items: ['Formal Shirts', 'Blazers'],
            quantity: '2.8 kg',
            amount: 420,
            pickupBoy: 'Raj Patel',
            pickupBoyPhone: '+91 65432 10987'
        }
    ];

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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'pickup_scheduled':
                return <Truck className="w-5 h-5 text-blue-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'pending':
                return 'Pending';
            case 'pickup_scheduled':
                return 'Pickup Scheduled';
            default:
                return 'Unknown';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'pickup_scheduled':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{userData.totalOrders}</div>
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
                            id: 'orders',
                            label: 'Orders',
                            icon: Package
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
                                className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-medium transition-all duration-200 text-sm sm:text-base flex-1 min-w-0 ${
                                    activeTab === tab.id
                                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                }`}
                            >
                                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-3 sm:p-4 lg:p-6">
                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Your Orders</h3>
                                {ordersData.map(order => (
                                    <div key={order.id} className="bg-gradient-to-r from-white to-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-all duration-200">
                                        <div className="flex flex-col gap-3 sm:gap-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                                                <div className="flex-1">
                                                    <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                        <span className="text-base sm:text-lg font-bold text-gray-800">#{order.id}</span>
                                                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 w-fit ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                                            <span>{getStatusText(order.status)}</span>
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                                        <div>
                                                            <strong>Date:</strong> {new Date(order.date).toLocaleDateString('en-IN')}
                                                        </div>
                                                        <div>
                                                            <strong>Quantity:</strong> {order.quantity}
                                                        </div>
                                                        <div>
                                                            <strong>Amount:</strong> ₹{order.amount}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <strong className="text-xs sm:text-sm text-gray-600">Items:</strong>
                                                        <span className="text-xs sm:text-sm text-gray-800 ml-2 break-words">{order.items.join(', ')}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-t sm:border-t-0 sm:border-l border-gray-200 sm:min-w-[180px]">
                                                    <div className="text-xs sm:text-sm text-gray-600 mb-1">Pickup Boy</div>
                                                    <div className="font-medium text-gray-800 text-sm sm:text-base mb-1">{order.pickupBoy}</div>
                                                    <a href={`tel:${order.pickupBoyPhone}`} className="text-green-600 hover:text-green-700 text-xs sm:text-sm block">
                                                        {order.pickupBoyPhone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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