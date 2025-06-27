import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface CarDetailsProps {
  carId: string;
  onBack: () => void;
  onBook: () => void;
}

export default function CarDetails({ carId, onBack, onBook }: CarDetailsProps) {
  const car = useQuery(api.cars.getCarById, { id: carId as Id<"cars"> });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const allImages = [car.mainImage, ...car.images];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={allImages[currentImageIndex]}
                alt={`${car.name} image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition duration-300"
              />
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className={`grid gap-4 ${car.images.length >= 3 ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
  {car.images.map((image, index) => (
    <div key={index} className="aspect-video rounded-lg overflow-hidden">
      <img
        src={image}
        alt={`${car.name} ${index + 1}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
      />
    </div>
  ))}
</div>

          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-400 font-semibold uppercase tracking-wide">
                  {car.brand}
                </span>
                <span className="text-gray-400">{car.year}</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{car.name}</h1>
              <p className="text-gray-300 text-lg leading-relaxed">{car.description}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  AED {car.price}
                  <span className="text-lg text-gray-400 font-normal">/{car.priceType}</span>
                </div>
                <div className="text-yellow-400 font-semibold">
                  {car.available ? "Available Now" : "Currently Unavailable"}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/971504412269?text=Hi,%20I'm%20interested%20in%20the%20${car.name} (${car.year})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="tel:+971504412269"
                className="flex items-center justify-center gap-2 flex-1 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">Engine</div>
                  <div className="text-white font-semibold">{car.specifications.engine}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Horsepower</div>
                  <div className="text-white font-semibold">{car.specifications.horsepower}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">0-60 mph</div>
                  <div className="text-white font-semibold">{car.specifications.acceleration}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Top Speed</div>
                  <div className="text-white font-semibold">{car.specifications.topSpeed}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Transmission</div>
                  <div className="text-white font-semibold">{car.specifications.transmission}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Fuel Type</div>
                  <div className="text-white font-semibold">{car.specifications.fuelType}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{car.seats}</div>
                <div className="text-gray-400 text-sm">Seats</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{car.doors}</div>
                <div className="text-gray-400 text-sm">Doors</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{car.color}</div>
                <div className="text-gray-400 text-sm">Color</div>
              </div>
            </div>

            {/* Book Button */}
            {/* <button
              onClick={onBook}
              disabled={!car.available}
              className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {car.available ? "Book Now" : "Currently Unavailable"}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
