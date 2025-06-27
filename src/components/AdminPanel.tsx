import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

interface AdminLoginProps {
  onLogin: (isAdmin: boolean) => void;
}

function AdminLogin({ onLogin }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.email === "admin@luxurycars.com" && formData.password === "VKLA9SJt@22") {
        toast.success("Login successful!");
        localStorage.setItem("adminAuth", "true");
        onLogin(true);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error: any) {
      toast.error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-300">
              Sign in to access admin features
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

{/*           <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-300 text-center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@luxurycars.com<br />
              Password: admin123
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

interface AdminDashboardProps {
  onLogout: () => void;
}

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Mutations for sample data
  const insertAllData = useMutation(api.cars.insertAllSampleData);
  const insertCars = useMutation(api.cars.insertSampleCars);
  const insertCategories = useMutation(api.categories.insertSampleCategories);
  const insertBrands = useMutation(api.brands.insertSampleBrands);

  // CRUD mutations
  const createCar = useMutation(api.admin.createCar);
  const updateCar = useMutation(api.admin.updateCar);
  const deleteCar = useMutation(api.admin.deleteCar);
  const createCategory = useMutation(api.admin.createCategory);
  const updateCategory = useMutation(api.admin.updateCategory);
  const deleteCategory = useMutation(api.admin.deleteCategory);
  const createBrand = useMutation(api.admin.createBrand);
  const updateBrand = useMutation(api.admin.updateBrand);
  const deleteBrand = useMutation(api.admin.deleteBrand);

  // Data queries
  const cars = useQuery(api.cars.getAllCars);
  const categories = useQuery(api.categories.getAllCategories);
  const brands = useQuery(api.brands.getAllBrands);
  const bookings = useQuery(api.bookings.getAllBookings);
  const inquiries = useQuery(api.inquiries.getAllInquiries);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    onLogout();
    toast.success("Logged out successfully");
  };

  const handleInsertAllData = async () => {
    setIsLoading(true);
    try {
      await insertAllData({});
      toast.success("All sample data inserted successfully!");
    } catch (error) {
      toast.error("Failed to insert sample data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "cars", label: "Cars", icon: "🚗" },
    { id: "categories", label: "Categories", icon: "📂" },
    { id: "brands", label: "Brands", icon: "🏷️" },
    // { id: "bookings", label: "Bookings", icon: "📅" },
    { id: "inquiries", label: "Inquiries", icon: "💬" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 sm:px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <nav className="lg:w-64 bg-gray-800 border-r border-gray-700">
          <div className="p-4">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-2 lg:space-x-0 lg:space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id
                      ? "bg-yellow-400 text-black"
                      : "text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  <span className="text-lg mr-3">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {activeTab === "overview" && <OverviewTab
            cars={cars}
            categories={categories}
            brands={brands}
            bookings={bookings}
            inquiries={inquiries}
            onInsertSampleData={handleInsertAllData}
            isLoading={isLoading}
            onLogout={handleLogout}
          />}
          {activeTab === "cars" && <CarsTab cars={cars} createCar={createCar} updateCar={updateCar} deleteCar={deleteCar} categories={categories} brands={brands} />}
          {activeTab === "categories" && <CategoriesTab categories={categories} createCategory={createCategory} updateCategory={updateCategory} deleteCategory={deleteCategory} />}
          {activeTab === "brands" && <BrandsTab brands={brands} createBrand={createBrand} updateBrand={updateBrand} deleteBrand={deleteBrand} />}
          {activeTab === "bookings" && <BookingsTab bookings={bookings} />}
          {activeTab === "inquiries" && <InquiriesTab inquiries={inquiries} />}
        </main>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ cars, categories, brands, bookings, inquiries, onLogout, isLoading }: any) {
  const stats = [
    { label: "Cars", value: cars?.length || 0, icon: "🚗", color: "yellow" },
    { label: "Categories", value: categories?.length || 0, icon: "📂", color: "green" },
    { label: "Brands", value: brands?.length || 0, icon: "🏷️", color: "red" },
    // { label: "Bookings", value: bookings?.length || 0, icon: "📅", color: "green" },
    { label: "Inquiries", value: inquiries?.length || 0, icon: "💬", color: "orange" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    onLogout();
    toast.success("Logged out successfully");
    window.location.href = "/"; // ✅ Add this line
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Dashboard Overview</h2>
        {/* <button
          onClick={onInsertSampleData}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {isLoading ? "Loading..." : "Insert Sample Data"}
        </button> */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 sm:px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
        >
          <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color}-400 bg-opacity-20`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white">{stat.label}</h3>
                <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="text-green-400 mr-2">📅</span>
            Recent Bookings
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {bookings?.slice(0, 5).map((booking: any) => (
              <div key={booking._id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold">{booking.customerName}</p>
                    <p className="text-gray-400 text-sm">{booking.customerEmail}</p>
                    <p className="text-yellow-400 text-sm">${booking.totalPrice} for {booking.totalDays} days</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${booking.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                      booking.status === 'confirmed' ? 'bg-green-600 text-green-100' :
                        'bg-gray-600 text-gray-100'
                    }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            )) || (
                <div className="text-center py-8">
                  <p className="text-gray-400">No bookings yet</p>
                </div>
              )}
          </div>
        </div> */}

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="text-orange-400 mr-2">💬</span>
            Recent Inquiries
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {inquiries?.slice(0, 5).map((inquiry: any) => (
              <div key={inquiry._id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold">{inquiry.name}</p>
                    <p className="text-gray-400 text-sm">{inquiry.email}</p>
                    <p className="text-gray-300 text-sm line-clamp-2 mt-1">{inquiry.message}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${inquiry.status === 'new' ? 'bg-blue-600 text-blue-100' :
                      inquiry.status === 'responded' ? 'bg-green-600 text-green-100' :
                        'bg-gray-600 text-gray-100'
                    }`}>
                    {inquiry.status}
                  </span>
                </div>
              </div>
            )) || (
                <div className="text-center py-8">
                  <p className="text-gray-400">No inquiries yet</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Cars Tab Component
function CarsTab({ cars, createCar, updateCar, deleteCar, categories, brands }: any) {
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    priceType: "daily",
    category: "",
    description: "",
    features: "",
    engine: "",
    horsepower: "",
    acceleration: "",
    topSpeed: "",
    transmission: "",
    fuelType: "",
    mainImage: "",
    images: "",
    location: "",
    color: "",
    seats: 2,
    doors: 2,
    available: true,
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const carData = {
        name: formData.name,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        priceType: formData.priceType,
        category: formData.category,
        description: formData.description,
        features: formData.features.split(',').map(f => f.trim()),
        images: formData.images.split(',').map(i => i.trim()),
        mainImage: formData.mainImage,
        location: formData.location,
        color: formData.color,
        seats: formData.seats,
        doors: formData.doors,
        available: formData.available,
        featured: formData.featured,
        specifications: {
          engine: formData.engine,
          horsepower: formData.horsepower,
          acceleration: formData.acceleration,
          topSpeed: formData.topSpeed,
          transmission: formData.transmission,
          fuelType: formData.fuelType,
        }
      };

      if (editingCar) {
        await updateCar({ id: editingCar._id, ...carData });
        toast.success("Car updated successfully!");
      } else {
        await createCar(carData);
        toast.success("Car created successfully!");
      }

      setShowForm(false);
      setEditingCar(null);
      resetForm();
    } catch (error) {
      toast.error("Failed to save car");
    }
  };

  const handleEdit = (car: any) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      priceType: car.priceType,
      category: car.category,
      description: car.description,
      features: car.features.join(', '),
      engine: car.specifications.engine,
      horsepower: car.specifications.horsepower,
      acceleration: car.specifications.acceleration,
      topSpeed: car.specifications.topSpeed,
      transmission: car.specifications.transmission,
      fuelType: car.specifications.fuelType,
      mainImage: car.mainImage,
      images: car.images.join(', '),
      location: car.location,
      color: car.color,
      seats: car.seats,
      doors: car.doors,
      available: car.available,
      featured: car.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar({ id: id as Id<"cars"> });
        toast.success("Car deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete car");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      priceType: "daily",
      category: "",
      description: "",
      features: "",
      engine: "",
      horsepower: "",
      acceleration: "",
      topSpeed: "",
      transmission: "",
      fuelType: "",
      mainImage: "",
      images: "",
      location: "",
      color: "",
      seats: 2,
      doors: 2,
      available: true,
      featured: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Cars Management</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCar(null);
            resetForm();
          }}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Car
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">
            {editingCar ? "Edit Car" : "Add New Car"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Car Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <select
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              required
            >
              <option value="">Select Brand</option>
              {brands?.map((brand: any) => (
                <option key={brand._id} value={brand.name}>{brand.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <select
              value={formData.priceType}
              onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              required
            >
              <option value="">Select Category</option>
              {categories?.map((category: any) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Seats"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Doors"
              value={formData.doors}
              onChange={(e) => setFormData({ ...formData, doors: parseInt(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="md:col-span-2 lg:col-span-3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              rows={3}
              required
            />
            <input
              type="text"
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="md:col-span-2 lg:col-span-3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="url"
              placeholder="Main Image URL"
              value={formData.mainImage}
              onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
              className="md:col-span-2 lg:col-span-3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Additional Images (comma separated URLs)"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="md:col-span-2 lg:col-span-3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            />

            {/* Specifications */}
            <h4 className="md:col-span-2 lg:col-span-3 text-lg font-semibold text-white mt-4 mb-2">Specifications</h4>
            <input
              type="text"
              placeholder="Engine"
              value={formData.engine}
              onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Horsepower"
              value={formData.horsepower}
              onChange={(e) => setFormData({ ...formData, horsepower: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Acceleration (0-60 mph)"
              value={formData.acceleration}
              onChange={(e) => setFormData({ ...formData, acceleration: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Top Speed"
              value={formData.topSpeed}
              onChange={(e) => setFormData({ ...formData, topSpeed: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Transmission"
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Fuel Type"
              value={formData.fuelType}
              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />

            {/* Checkboxes */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-wrap gap-4 mt-4">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="mr-2"
                />
                Available
              </label>
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-2"
                />
                Featured
              </label>
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
              >
                {editingCar ? "Update Car" : "Create Car"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCar(null);
                  resetForm();
                }}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cars List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {cars?.map((car: any) => (
                <tr key={car._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-lg object-cover" src={car.mainImage} alt={car.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{car.name}</div>
                        <div className="text-sm text-gray-400">{car.year}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{car.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">AED {car.price}/{car.priceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {car.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-yellow-400 hover:text-yellow-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Categories Tab Component
function CategoriesTab({ categories, createCategory, updateCategory, deleteCategory }: any) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    carCount: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory._id, ...formData });
        toast.success("Category updated successfully!");
      } else {
        await createCategory(formData);
        toast.success("Category created successfully!");
      }

      setShowForm(false);
      setEditingCategory(null);
      resetForm();
    } catch (error) {
      toast.error("Failed to save category");
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      carCount: category.carCount,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory({ id: id as Id<"categories"> });
        toast.success("Category deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
      carCount: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Categories Management</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCategory(null);
            resetForm();
          }}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Category
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Car Count"
              value={formData.carCount}
              onChange={(e) => setFormData({ ...formData, carCount: parseInt(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="md:col-span-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              rows={3}
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="md:col-span-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />

            <div className="md:col-span-2 flex gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
              >
                {editingCategory ? "Update Category" : "Create Category"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                  resetForm();
                }}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category: any) => (
          <div key={category._id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
              <p className="text-gray-400 mb-4">{category.description}</p>
              <p className="text-yellow-400 mb-4">{category.carCount} cars</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Brands Tab Component
function BrandsTab({ brands, createBrand, updateBrand, deleteBrand }: any) {
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    carCount: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBrand) {
        await updateBrand({ id: editingBrand._id, ...formData });
        toast.success("Brand updated successfully!");
      } else {
        await createBrand(formData);
        toast.success("Brand created successfully!");
      }

      setShowForm(false);
      setEditingBrand(null);
      resetForm();
    } catch (error) {
      toast.error("Failed to save brand");
    }
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description,
      logo: brand.logo,
      carCount: brand.carCount,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this brand?")) {
      try {
        await deleteBrand({ id: id as Id<"brands"> });
        toast.success("Brand deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete brand");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      logo: "",
      carCount: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Brands Management</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingBrand(null);
            resetForm();
          }}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Brand
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">
            {editingBrand ? "Edit Brand" : "Add New Brand"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Brand Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Car Count"
              value={formData.carCount}
              onChange={(e) => setFormData({ ...formData, carCount: parseInt(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="md:col-span-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              rows={3}
              required
            />
            <input
              type="url"
              placeholder="Logo URL"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="md:col-span-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />

            <div className="md:col-span-2 flex gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
              >
                {editingBrand ? "Update Brand" : "Create Brand"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBrand(null);
                  resetForm();
                }}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands?.map((brand: any) => (
          <div key={brand._id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src={brand.logo} alt={brand.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-white">{brand.name}</h3>
                  <p className="text-yellow-400">{brand.carCount} cars</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{brand.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(brand)}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(brand._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bookings Tab Component
function BookingsTab({ bookings }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Bookings Management</h2>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {bookings?.map((booking: any) => (
                <tr key={booking._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{booking.customerName}</div>
                      <div className="text-sm text-gray-400">{booking.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.startDate} to {booking.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    AED {booking.totalPrice} ({booking.totalDays} days)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Inquiries Tab Component
function InquiriesTab({ inquiries }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Inquiries Management</h2>

      <div className="grid grid-cols-1 gap-6">
        {inquiries?.map((inquiry: any) => (
          <div key={inquiry._id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{inquiry.name}</h3>
                <p className="text-gray-400">{inquiry.email}</p>
                <p className="text-gray-400">{inquiry.phone}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full mt-2 sm:mt-0 ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  inquiry.status === 'responded' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {inquiry.status}
              </span>
            </div>
            <p className="text-gray-300">{inquiry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuth") === "true";
  });

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
function onLogout() {
  throw new Error("Function not implemented.");
}

