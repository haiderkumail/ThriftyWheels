import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

interface BookingFormProps {
  carId: string;
  onBack: () => void;
}

export default function BookingForm({ carId, onBack }: BookingFormProps) {
  const car = useQuery(api.cars.getCarById, { id: carId as Id<"cars"> });
  const createBooking = useMutation(api.bookings.createBooking);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    startDate: "",
    endDate: "",
    specialRequests: "",
    pickupLocation: "",
    dropoffLocation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    if (!car || days === 0) return 0;
    
    let multiplier = 1;
    if (car.priceType === "weekly") multiplier = days / 7;
    else if (car.priceType === "monthly") multiplier = days / 30;
    else multiplier = days;
    
    return Math.round(car.price * multiplier);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    const totalDays = calculateTotalDays();
    const totalPrice = calculateTotalPrice();

    if (totalDays === 0) {
      toast.error("Please select valid dates");
      return;
    }

    setIsSubmitting(true);

    try {
      await createBooking({
        carId: carId as Id<"cars">,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalDays,
        totalPrice,
        specialRequests: formData.specialRequests || undefined,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
      });

      toast.success("Booking request submitted successfully!");
      onBack();
    } catch (error) {
      toast.error("Failed to submit booking request");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const totalDays = calculateTotalDays();
  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Car Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
              
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={car.mainImage}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-yellow-400 font-semibold">{car.brand}</div>
                <div className="text-white font-bold text-lg">{car.name}</div>
                <div className="text-gray-400">{car.year} • {car.location}</div>
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Rate</span>
                  <span className="text-white">${car.price}/{car.priceType}</span>
                </div>
                {totalDays > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{totalDays} days</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-3">
                      <span className="text-white">Total</span>
                      <span className="text-yellow-400">${totalPrice}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Book Your Rental</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Rental Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pickup Location *
                    </label>
                    <select
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">Select pickup location</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Dubai Mall">Dubai Mall</option>
                      <option value="DIFC">DIFC</option>
                      <option value="Jumeirah">Jumeirah</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Emirates Hills">Emirates Hills</option>
                      <option value="Dubai Airport">Dubai Airport</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Drop-off Location *
                    </label>
                    <select
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">Select drop-off location</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Dubai Mall">Dubai Mall</option>
                      <option value="DIFC">DIFC</option>
                      <option value="Jumeirah">Jumeirah</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Emirates Hills">Emirates Hills</option>
                      <option value="Dubai Airport">Dubai Airport</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                    placeholder="Any special requests or requirements..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || totalDays === 0}
                  className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : `Book Now - $${totalPrice}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
