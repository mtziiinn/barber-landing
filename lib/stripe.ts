import "server-only"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("[v0] STRIPE_SECRET_KEY not set - payments will not work")
}

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"
  return new Stripe(key, {
    apiVersion: "2024-12-15.acacia",
  })
}

export const stripe = getStripeClient()
