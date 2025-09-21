import React from "react"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard, Users, Package, BarChart3, LogOut, Menu } from "lucide-react"
import UserPage from "./UserPage"
import AllPickup from "./AllPickup"

const sidebarOptions = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "Users", key: "users", icon: Users },
  { label: "All Pickup Orders", key: "orders", icon: Package },
  { label: "Overall Data", key: "data", icon: BarChart3 },
  { label: "Logout", key: "logout", icon: LogOut },
]

const Dashboard = () => {
  const navigate = useNavigate()
  const [active, setActive] = React.useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [userCount, setUserCount] = React.useState(null)
  const [pickupCount, setPickupCount] = React.useState(null) // add this line

  React.useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('https://cloth2cash.onrender.com/api/users')
        const data = await response.json()
        const users = Array.isArray(data) ? data : data.users || []
        setUserCount(users.length)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUserCount(null)
      }
    }
    fetchUserCount()
  }, [])

  React.useEffect(() => {
    const fetchPickupCount = async () => {
      try {
        const response = await fetch('https://cloth2cash.onrender.com/api/schedule')
        const data = await response.json()
        setPickupCount(Array.isArray(data) ? data.length : 0)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setPickupCount(null)
      }
    }
    fetchPickupCount()
  }, [])

  const handleSidebarClick = (key) => {
    if (key === "logout") {
      localStorage.removeItem("isAdmin")
      navigate("/admin-login")
    } else {
      setActive(key)
      setSidebarOpen(false) // close sidebar on mobile after click
    }
  }

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div>
            <h2 className="mb-2 text-gray-800 font-bold text-2xl">
              Welcome to Cloth2Cash Admin Dashboard
            </h2>
            <p className="text-gray-500 mb-8">
              Manage users, pickup orders, and view overall data insights for your platform.
            </p>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow p-6 text-center border border-green-200">
                <div className="text-3xl font-bold text-green-700">
                  {userCount !== null ? userCount : "--"}
                </div>
                <div className="text-gray-600 mt-2">Total Users</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow p-6 text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-700">
                  {pickupCount !== null ? pickupCount : "--"}
                </div>
                <div className="text-gray-600 mt-2">Pickup Orders</div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl shadow p-6 text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-700">--</div>
                <div className="text-gray-600 mt-2">Overall Data</div>
              </div>
            </div>
          </div>
        )
      case "users":
        return <UserPage />
      case "orders":
        return <AllPickup />
      case "data":
        return <h2 className="text-purple-700 font-bold text-2xl">Overall Data (Coming Soon)</h2>
      default:
        return null
    }
  }

  return (
    <div className="flex bg-gray-100 h-screen min-h-screen max-h-screen overflow-hidden">
      {/* Sidebar for desktop, overlay for mobile */}
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity md:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
        `}
        style={{ minHeight: "100vh", height: "100vh", maxHeight: "100vh" }}
      >
        <div className="font-bold text-xl py-6 text-center text-green-700">
          Cloth2Cash
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleSidebarClick(opt.key)}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === opt.key
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <opt.icon className="w-5 h-5" />
              {opt.label}
              {/* Show user count badge for Users option */}
              {opt.key === "users" && userCount !== null && (
                <span
                  style={{
                    background: "#22c55e",
                    color: "#fff",
                    borderRadius: "999px",
                    fontSize: "12px",
                    minWidth: "22px",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                    fontWeight: 600,
                    padding: "0 7px"
                  }}
                >
                  {userCount}
                </span>
              )}
              {/* Show pickup count badge for All Pickup Orders option */}
              {opt.key === "orders" && pickupCount !== null && (
                <span
                  style={{
                    background: "#22c55e",
                    color: "#fff",
                    borderRadius: "999px",
                    fontSize: "12px",
                    minWidth: "22px",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                    fontWeight: 600,
                    padding: "0 7px"
                  }}
                >
                  {pickupCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="text-center text-gray-400 text-xs py-4 border-t border-gray-200">
          © {new Date().getFullYear()} Cloth2Cash
        </div>
        {/* Bottom border aligned with topbar */}
        <div className="absolute left-0 right-0 bottom-[calc(100%-4rem)] h-px bg-gray-200 md:block hidden" style={{zIndex: 10}} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen max-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 justify-between relative z-10 flex-shrink-0">
          {/* Sidebar toggle button for mobile */}
          <button
            className="md:hidden mr-2 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6 text-green-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 truncate">
            {sidebarOptions.find((opt) => opt.key === active)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto">
          <div className="p-4 md:p-8 overflow-x-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
