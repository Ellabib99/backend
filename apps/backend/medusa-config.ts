import { defineConfig, loadEnv, Modules } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      // vendorCors is not officially supported, but Mercur modules sometimes use it
      // @ts-expect-error
      vendorCors: process.env.VENDOR_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  modules: [
    // 🔹 Marketplace & sellers
    { resolve: "@mercurjs/seller" },
    { resolve: "@mercurjs/reviews" },
    { resolve: "@mercurjs/marketplace" },
    { resolve: "@mercurjs/configuration" },
    { resolve: "@mercurjs/order-return-request" },
    { resolve: "@mercurjs/requests" },
    { resolve: "@mercurjs/brand" },
    { resolve: "@mercurjs/wishlist" },
    { resolve: "@mercurjs/split-order-payment" },
    { resolve: "@mercurjs/attribute" },
    { resolve: "@mercurjs/commission" },

    // 🔹 Core Medusa modules (safe defaults, no Redis required)
    { resolve: "@medusajs/medusa/cache-inmemory", id: Modules.CACHE as string },
    { resolve: "@medusajs/medusa/workflow-engine-inmemory", id: Modules.WORKFLOW_ENGINE as string },

    // 🔹 External integrations (commented out until you provide keys)
    /*
    {
      resolve: "@mercurjs/taxcode",
      options: { apiKey: process.env.STRIPE_SECRET_API_KEY }
    },
    {
      resolve: "@mercurjs/payout",
      options: {
        apiKey: process.env.STRIPE_SECRET_API_KEY,
        webhookSecret: process.env.STRIPE_CONNECTED_ACCOUNTS_WEBHOOK_SECRET,
      },
    },
    {
      resolve: "@mercurjs/algolia",
      options: {
        apiKey: process.env.ALGOLIA_API_KEY,
        appId: process.env.ALGOLIA_APP_ID,
      },
    },
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@mercurjs/payment-stripe-connect",
            id: "stripe-connect",
            options: { apiKey: process.env.STRIPE_SECRET_API_KEY },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "@mercurjs/resend",
            id: "resend",
            options: {
              channels: ["email"],
              api_key: process.env.RESEND_API_KEY,
              from: process.env.RESEND_FROM_EMAIL,
            },
          },
          {
            resolve: "@medusajs/medusa/notification-local",
            id: "local",
            options: {
              channels: ["feed", "seller_feed"],
            },
          },
        ],
      },
    },
    */
  ],
})
