import { Toaster } from "sonner";
import { useRef, useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedCars from "./components/FeaturedCars";
import Categories from "./components/Categories";
import Brands from "./components/Brands";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CarDetails from "./components/CarDetails";
import CarListing from "./components/CarListing";
import BookingForm from "./components/BookingForm";
import AdminPanel from "./components/AdminPanel";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CookiePolicy from "./components/CookiePolicy";



export default function App() {
  // State declarations
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [, setIsHomeContentReady] = useState(false);
  const scrollTargetRef = useRef<string | null>(null);
  // const aboutSectionRef = useRef<HTMLDivElement>(null);
  // const contactSectionRef = useRef<HTMLDivElement>(null);

  const navigateTo = (
    page: string,
    carId?: string,
    category?: string,
    brand?: string,
    scrollTarget?: string
  ) => {
    scrollTargetRef.current = scrollTarget || null;
    setSelectedCarId(carId || null);
    setSelectedCategory(category || null);
    setSelectedBrand(brand || null);
    setCurrentPage(page);
    setIsHomeContentReady(false);
  };

  useEffect(() => {
    if (currentPage === "home" && scrollTargetRef.current) {
      const targetId = scrollTargetRef.current;

      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerHeight = document.querySelector("header")?.offsetHeight || 0;
          const scrollY = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

          window.scrollTo({
            top: scrollY,
            behavior: "smooth",
          });

          scrollTargetRef.current = null;
          return true;
        }
        return false;
      };

      const attemptScroll = () => {
        let attempts = 0;
        const interval = setInterval(() => {
          if (scrollToTarget() || attempts > 20) {
            clearInterval(interval);
          }
          attempts++;
        }, 100);
      };

      window.scrollTo({ top: 0 });
      setTimeout(attemptScroll, 800);
    }
  }, [currentPage]);





  const handleNavigate = (
    page: string,
    carId?: string,
    category?: string,
    brand?: string,
    scrollTarget?: string
  ) => {
    if (page === "home") {
      if (scrollTarget === "about" || scrollTarget === "contact") {
        if (currentPage === "home") {
          // Already on home page, just scroll
          const el = document.getElementById(scrollTarget);
          if (el) {
            const headerHeight = document.querySelector("header")?.offsetHeight || 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        } else {
          // Navigate to home and then scroll
          navigateTo("home", undefined, undefined, undefined, scrollTarget);
        }
        return;
      }

      // Regular home navigation
      if (currentPage === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigateTo("home");
      }
    } else {
      navigateTo(page, carId, category, brand, scrollTarget);
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

const renderPage = () => {
  switch (currentPage) {
    case "car-details":
      return selectedCarId ? (
        <CarDetails
          carId={selectedCarId}
          onBack={() => navigateTo("home")}
          onBook={() => navigateTo("booking", selectedCarId)}
        />
      ) : (
        <div>Car not found</div>
      );
    case "cars":
      return (
        <CarListing
          category={selectedCategory}
          brand={selectedBrand}
          onCarSelect={(carId) => navigateTo("car-details", carId)}
          onBack={() => navigateTo("home")}
        />
      );
    case "booking":
      return selectedCarId ? (
        <BookingForm
          carId={selectedCarId}
          onBack={() => navigateTo("car-details", selectedCarId)}
        />
      ) : (
        <div>Car not found</div>
      );
    case "admin":
      return <AdminPanel />;
    case "privacy":
      return <PrivacyPolicy />;
    case "terms":
      return <TermsOfService />;
    case "cookies":
      return <CookiePolicy />;
    default:
      return (
        <>
          <Hero
            onExplore={() => navigateTo("cars")}
            onContact={() => scrollToId("contact")}
          />
          <FeaturedCars onCarSelect={(carId) => navigateTo("car-details", carId)} />
          <Categories onCategorySelect={(category) => navigateTo("cars", undefined, category)} />
          <Brands onBrandSelect={(brand) => navigateTo("cars", undefined, undefined, brand)} />
          <div id="about">
            <About />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </>
      );
  }
};


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} currentPage={currentPage} />
      <Toaster />
    </div>
  );
}