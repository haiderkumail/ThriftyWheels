import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface BrandsProps {
  onBrandSelect: (brand: string) => void;
}

export default function Brands({ onBrandSelect }: BrandsProps) {
  const brands = useQuery(api.brands.getAllBrands);

  if (!brands) {
    return (
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Premium Brands</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Premium Brands</h2>
          <p className="text-gray-300 text-lg mb-8">
            Explore vehicles from the world's most prestigious manufacturers
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="group bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-xl"
              onClick={() => onBrandSelect(brand.name)}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-white p-2">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors mb-2">
                {brand.name}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {brand.description}
              </p>
              <span className="text-yellow-400 text-sm font-semibold">
                {brand.carCount} models
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
