import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if admin already exists
    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingAdmin) {
      throw new Error("Admin account already exists");
    }

    // Create admin user
    const adminId = await ctx.db.insert("users", {
      email: args.email,
      name: "Administrator",
    });

    return adminId;
  },
});

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const user = await ctx.db.get(userId);
    if (!user) return false;

    // Check if user is admin
    return user.email === "admin@luxurycars.com" || 
           (user.email && user.email.includes("admin"));
  },
});

export const getAdminStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || (!user.email?.includes("admin") && user.email !== "admin@luxurycars.com")) {
      throw new Error("Not authorized");
    }

    const cars = await ctx.db.query("cars").collect();
    const bookings = await ctx.db.query("bookings").collect();
    const inquiries = await ctx.db.query("inquiries").collect();
    const categories = await ctx.db.query("categories").collect();
    const brands = await ctx.db.query("brands").collect();

    return {
      totalCars: cars.length,
      totalBookings: bookings.length,
      totalInquiries: inquiries.length,
      totalCategories: categories.length,
      totalBrands: brands.length,
      pendingBookings: bookings.filter(b => b.status === "pending").length,
      newInquiries: inquiries.filter(i => i.status === "new").length,
    };
  },
});

// Car CRUD Operations
export const createCar = mutation({
  args: {
    name: v.string(),
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    priceType: v.string(),
    category: v.string(),
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
    mainImage: v.string(),
    images: v.array(v.string()),
    location: v.string(),
    color: v.string(),
    seats: v.number(),
    doors: v.number(),
    available: v.boolean(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cars", args);
  },
});

export const updateCar = mutation({
  args: {
    id: v.id("cars"),
    name: v.string(),
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    priceType: v.string(),
    category: v.string(),
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
    mainImage: v.string(),
    images: v.array(v.string()),
    location: v.string(),
    color: v.string(),
    seats: v.number(),
    doors: v.number(),
    available: v.boolean(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, updateData);
    return id;
  },
});

export const deleteCar = mutation({
  args: {
    id: v.id("cars"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Category CRUD Operations
export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    image: v.string(),
    carCount: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("categories", args);
  },
});

export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    carCount: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, updateData);
    return id;
  },
});

export const deleteCategory = mutation({
  args: {
    id: v.id("categories"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Brand CRUD Operations
export const createBrand = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    logo: v.string(),
    carCount: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("brands", args);
  },
});

export const updateBrand = mutation({
  args: {
    id: v.id("brands"),
    name: v.string(),
    description: v.string(),
    logo: v.string(),
    carCount: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, updateData);
    return id;
  },
});

export const deleteBrand = mutation({
  args: {
    id: v.id("brands"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Booking Management
export const updateBookingStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
    return args.id;
  },
});

// Inquiry Management
export const updateInquiryStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
    return args.id;
  },
});
