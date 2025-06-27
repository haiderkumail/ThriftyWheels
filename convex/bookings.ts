import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
  args: {
    carId: v.id("cars"),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    totalDays: v.number(),
    totalPrice: v.number(),
    specialRequests: v.optional(v.string()),
    pickupLocation: v.string(),
    dropoffLocation: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
    });
  },
});

export const getAllBookings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookings").collect();
  },
});

export const getBookingById = query({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBookingsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});
