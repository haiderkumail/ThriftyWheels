export default function About() {
  const features = [
    {
      icon: "🏆",
      title: "Premium Fleet",
      description: "Curated collection of the world's finest supercars and luxury vehicles"
    },
    {
      icon: "🔧",
      title: "Expert Maintenance",
      description: "All vehicles maintained to the highest standards by certified technicians"
    },
    {
      icon: "🚗",
      title: "Flexible Rental",
      description: "Daily, weekly, and monthly rental options to suit your needs"
    },
    {
      icon: "🌟",
      title: "VIP Service",
      description: "White-glove service with delivery and pickup at your location"
    },
    {
      icon: "💎",
      title: "Exclusive Access",
      description: "Access to rare and limited edition vehicles not available elsewhere"
    },
    {
      icon: "🛡️",
      title: "Full Insurance",
      description: "Comprehensive insurance coverage for complete peace of mind"
    }
  ];

  return (
    <section id="about" className="scroll-mt-20 py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
          <p className="text-gray-300 text-lg mb-8">
            Experience luxury car rental like never before in Dubai
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Dubai's Premier Luxury Car Rental
              </h3>
              <p className="text-gray-300 mb-6">
                For over a decade, we've been Dubai's trusted partner for luxury car rentals. 
                Our commitment to excellence and attention to detail has made us the preferred 
                choice for discerning clients who demand nothing but the best.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                  <div className="text-gray-400">Premium Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
                  <div className="text-gray-400">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                  <div className="text-gray-400">Luxury Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-gray-400">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.pixabay.com/photo/2016/02/28/20/23/dubai-1227538_1280.jpg"
                alt="Dubai skyline"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
