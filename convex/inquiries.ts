import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createInquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    carId: v.optional(v.id("cars")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
    });
  },
});

export const getAllInquiries = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inquiries").collect();
  },
});

export const getInquiriesByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("inquiries")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});
