import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const insertSampleCategories = mutation({
  args: {},
  handler: async (ctx) => {
    const sampleCategories = [
      {
        name: "luxury",
        description: "Premium luxury vehicles with exceptional comfort and prestige",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
        carCount: 8,
      },
      {
        name: "sports",
        description: "High-performance sports cars for the ultimate driving experience",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop",
        carCount: 12,
      },
      {
        name: "exotic",
        description: "Rare and exclusive supercars from the world's finest manufacturers",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
        carCount: 15,
      },
      {
        name: "suv",
        description: "Luxury SUVs combining comfort, space, and performance",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
        carCount: 6,
      },
    ];

    for (const category of sampleCategories) {
      await ctx.db.insert("categories", category);
    }

    return "Sample categories inserted successfully";
  },
});
