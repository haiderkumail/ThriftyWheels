import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const getAllCars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cars").collect();
  },
});

export const getFeaturedCars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("cars")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .take(8);
  },
});

export const getCarsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cars")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getCarsByBrand = query({
  args: { brand: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cars")
      .withIndex("by_brand", (q) => q.eq("brand", args.brand))
      .collect();
  },
});

export const getCarById = query({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const searchCars = query({
  args: { 
    searchTerm: v.string(),
    brand: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("cars")
      .withSearchIndex("search_cars", (q) => {
        let searchQuery = q.search("name", args.searchTerm);
        if (args.brand) {
          searchQuery = searchQuery.eq("brand", args.brand);
        }
        if (args.category) {
          searchQuery = searchQuery.eq("category", args.category);
        }
        return searchQuery.eq("available", true);
      });
    
    return await query.take(20);
  },
});

export const getAvailableCars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("cars")
      .withIndex("by_available", (q) => q.eq("available", true))
      .collect();
  },
});

// Sample data insertion function
export const insertSampleCars = mutation({
  args: {},
  handler: async (ctx) => {
    const sampleCars = [
      {
        name: "Lamborghini Huracán EVO",
        brand: "Lamborghini",
        model: "Huracán EVO",
        year: 2023,
        price: 2500,
        priceType: "daily",
        category: "exotic",
        description: "Experience the thrill of driving one of the world's most iconic supercars. The Lamborghini Huracán EVO combines breathtaking performance with stunning Italian design.",
        features: ["V10 Engine", "All-Wheel Drive", "Carbon Fiber Interior", "Advanced Infotainment", "Premium Sound System"],
        specifications: {
          engine: "5.2L V10",
          horsepower: "630 HP",
          acceleration: "0-60 mph in 2.9s",
          topSpeed: "325 km/h",
          transmission: "7-Speed Dual-Clutch",
          fuelType: "Gasoline"
        },
        images: [
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
        available: true,
        featured: true,
        location: "Dubai Marina",
        color: "Arancio Borealis",
        seats: 2,
        doors: 2,
      },
      {
        name: "Ferrari 488 GTB",
        brand: "Ferrari",
        model: "488 GTB",
        year: 2022,
        price: 3000,
        priceType: "daily",
        category: "exotic",
        description: "The Ferrari 488 GTB represents the pinnacle of Italian engineering and design. With its twin-turbo V8 engine, this masterpiece delivers an unforgettable driving experience.",
        features: ["Twin-Turbo V8", "Carbon Fiber Body", "Racing Seats", "Advanced Aerodynamics", "Premium Leather Interior"],
        specifications: {
          engine: "3.9L Twin-Turbo V8",
          horsepower: "661 HP",
          acceleration: "0-60 mph in 3.0s",
          topSpeed: "330 km/h",
          transmission: "7-Speed Dual-Clutch",
          fuelType: "Gasoline"
        },
        images: [
          "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
        available: true,
        featured: true,
        location: "Dubai Mall",
        color: "Rosso Corsa",
        seats: 2,
        doors: 2,
      },
      {
        name: "McLaren 720S",
        brand: "McLaren",
        model: "720S",
        year: 2023,
        price: 2800,
        priceType: "daily",
        category: "exotic",
        description: "The McLaren 720S is a technological marvel that pushes the boundaries of automotive engineering. Experience pure adrenaline with this British supercar.",
        features: ["Carbon Fiber Monocoque", "Active Aerodynamics", "Butterfly Doors", "Track Mode", "Premium Audio"],
        specifications: {
          engine: "4.0L Twin-Turbo V8",
          horsepower: "710 HP",
          acceleration: "0-60 mph in 2.8s",
          topSpeed: "341 km/h",
          transmission: "7-Speed Dual-Clutch",
          fuelType: "Gasoline"
        },
        images: [
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
        ],
        mainImage: "https://cars.mclaren.com/content/dam/mclaren-automotive/models/gts/gts-defiance/McLaren_GTS_Defiance-004.jpg",
        available: true,
        featured: true,
        location: "DIFC",
        color: "Papaya Spark",
        seats: 2,
        doors: 2,
      },
      {
        name: "Porsche 911 Turbo S",
        brand: "Porsche",
        model: "911 Turbo S",
        year: 2023,
        price: 1800,
        priceType: "daily",
        category: "sports",
        description: "The iconic Porsche 911 Turbo S combines everyday usability with supercar performance. German engineering at its finest.",
        features: ["All-Wheel Drive", "Sport Chrono Package", "PASM Suspension", "Premium Interior", "Advanced Safety"],
        specifications: {
          engine: "3.8L Twin-Turbo Flat-6",
          horsepower: "640 HP",
          acceleration: "0-60 mph in 2.6s",
          topSpeed: "330 km/h",
          transmission: "8-Speed PDK",
          fuelType: "Gasoline"
        },
        images: [
          "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
        available: true,
        featured: true,
        location: "Jumeirah",
        color: "GT Silver Metallic",
        seats: 4,
        doors: 2,
      },
      {
        name: "Bentley Continental GT",
        brand: "Bentley",
        model: "Continental GT",
        year: 2023,
        price: 1500,
        priceType: "daily",
        category: "luxury",
        description: "The Bentley Continental GT epitomizes British luxury and craftsmanship. Experience unparalleled comfort and performance in this grand tourer.",
        features: ["Handcrafted Interior", "Diamond Quilted Leather", "Rotating Display", "Massage Seats", "Premium Sound"],
        specifications: {
          engine: "6.0L Twin-Turbo W12",
          horsepower: "626 HP",
          acceleration: "0-60 mph in 3.6s",
          topSpeed: "333 km/h",
          transmission: "8-Speed Dual-Clutch",
          fuelType: "Gasoline"
        },
        images: [
          "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
        available: true,
        featured: false,
        location: "Business Bay",
        color: "Beluga Black",
        seats: 4,
        doors: 2,
      },
      {
        name: "Rolls-Royce Cullinan",
        brand: "Rolls-Royce",
        model: "Cullinan",
        year: 2023,
        price: 2200,
        priceType: "daily",
        category: "luxury",
        description: "The Rolls-Royce Cullinan is the pinnacle of luxury SUVs. Experience the ultimate in comfort, craftsmanship, and prestige.",
        features: ["Magic Carpet Ride", "Starlight Headliner", "Champagne Cooler", "Rear Entertainment", "Bespoke Interior"],
        specifications: {
          engine: "6.75L Twin-Turbo V12",
          horsepower: "563 HP",
          acceleration: "0-60 mph in 4.8s",
          topSpeed: "250 km/h",
          transmission: "8-Speed Automatic",
          fuelType: "Gasoline"
        },
        images: [
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
        ],
        mainImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
        available: true,
        featured: true,
        location: "Emirates Hills",
        color: "Arctic White",
        seats: 5,
        doors: 4,
      }
    ];

    for (const car of sampleCars) {
      await ctx.db.insert("cars", car);
    }

    return "Sample cars inserted successfully";
  },
});

// Complete sample data insertion
export const insertAllSampleData = mutation({
  args: {},
  handler: async (ctx) => {
    // First insert categories and brands, then cars
    await ctx.runMutation(api.categories.insertSampleCategories, {});
    await ctx.runMutation(api.brands.insertSampleBrands, {});
    await ctx.runMutation(api.cars.insertSampleCars, {});
    return "All sample data inserted successfully";
  },
});
