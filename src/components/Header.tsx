import { useState } from "react";

interface HeaderProps {
  onNavigate: (
    page: string,
    carId?: string,
    category?: string,
    brand?: string,
    scrollTarget?: string
  ) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "cars", label: "Our Fleet" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    { id: "admin", label: "Login" },
  ];

// In Header.tsx
const handleNavClick = (id: string) => {
  if (id === "about" || id === "contact") {
    if (currentPage === "home") {
      // If already on home page, just scroll
      const el = document.getElementById(id);
      if (el) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 0;
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home with scroll target
      onNavigate("home", undefined, undefined, undefined, id);
    }
  } else {
    onNavigate(id);
  }
  setIsMenuOpen(false);
};

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <img
              src="/logo.png" // Update this path to your logo file
              alt="Thrifty Wheels Logo"
              className="h-16 w-auto object-contain"
            />
            <div className="flex items-end space-x-2">
              <div className="text-2xl font-bold text-yellow-400">THRIFTY WHEELS</div>
              <div className="text-sm text-gray-300 pb-1">Dubai</div>
            </div>

          </div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors ${currentPage === item.id ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="text-sm text-gray-300">
              <div className="font-semibold">+971 58 688 1466</div>
              <div className="font-semibold">+971 50 155 0571</div>
            </div>
            <div className="text-yellow-400 text-xs font-medium">24/7 Available</div>
          </div>




          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-yellow-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm font-medium transition-colors ${currentPage === item.id ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-300">
                  <div className="font-semibold">+971 58 688 1466</div>
                  <div className="font-semibold">+971 50 155 0571</div>
                </div>
                <div className="text-yellow-400 text-xs font-medium">24/7 Available</div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
