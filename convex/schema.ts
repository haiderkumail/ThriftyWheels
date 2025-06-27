import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  cars: defineTable({
    name: v.string(),
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    priceType: v.string(), // "daily", "weekly", "monthly"
    category: v.string(), // "luxury", "sports", "exotic", "suv"
    description: v.string(),
    features: v.array(v.string()),
    specifications: v.object({
      engine: v.string(),
      horsepower: v.string(),
      acceleration: v.string(),
      topSpeed: v.string(),
      transmission: v.string(),
      fuelType: v.string(),
    }),
    images: v.array(v.string()), // URLs to car images
    mainImage: v.string(),
    available: v.boolean(),
    featured: v.boolean(),
    location: v.string(),
    mileage: v.optional(v.string()),
    color: v.string(),
    seats: v.number(),
    doors: v.number(),
  })
    .index("by_brand", ["brand"])
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .index("by_available", ["available"])
    .searchIndex("search_cars", {
      searchField: "name",
      filterFields: ["brand", "category", "available"]
    }),

  brands: defineTable({
    name: v.string(),
    logo: v.string(),
    description: v.string(),
    carCount: v.number(),
  }),

  categories: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.string(),
    carCount: v.number(),
  }),

  bookings: defineTable({
    carId: v.id("cars"),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    totalDays: v.number(),
    totalPrice: v.number(),
    status: v.string(), // "pending", "confirmed", "cancelled", "completed"
    specialRequests: v.optional(v.string()),
    pickupLocation: v.string(),
    dropoffLocation: v.string(),
  })
    .index("by_car", ["carId"])
    .index("by_status", ["status"]),

  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    carId: v.optional(v.id("cars")),
    status: v.string(), // "new", "responded", "closed"
  })
    .index("by_status", ["status"]),

  // Admin users table (extends auth users)
  adminUsers: defineTable({
    userId: v.id("users"),
    role: v.string(), // "admin", "super_admin"
    permissions: v.array(v.string()),
  })
    .index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
