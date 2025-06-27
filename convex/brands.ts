import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllBrands = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("brands").collect();
  },
});

export const insertSampleBrands = mutation({
  args: {},
  handler: async (ctx) => {
    const sampleBrands = [
      {
        name: "Lamborghini",
        logo: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=100&h=100&fit=crop",
        description: "Italian luxury sports car manufacturer",
        carCount: 5,
      },
      {
        name: "Ferrari",
        logo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&h=100&fit=crop",
        description: "Iconic Italian sports car brand",
        carCount: 8,
      },
      {
        name: "McLaren",
        logo: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=100&h=100&fit=crop",
        description: "British automotive manufacturer",
        carCount: 4,
      },
      {
        name: "Porsche",
        logo: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=100&h=100&fit=crop",
        description: "German sports car manufacturer",
        carCount: 6,
      },
      {
        name: "Bentley",
        logo: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=100&h=100&fit=crop",
        description: "British luxury car manufacturer",
        carCount: 3,
      },
      {
        name: "Rolls-Royce",
        logo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop",
        description: "Ultra-luxury British car manufacturer",
        carCount: 2,
      },
    ];

    for (const brand of sampleBrands) {
      await ctx.db.insert("brands", brand);
    }

    return "Sample brands inserted successfully";
  },
});
