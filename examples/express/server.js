// Express Example - Test the rate limiter middleware
const express = require("express");
const { rateLimitExpress } = require("../../dist/index.js");

const app = express();

// Test 1: Static key rate limiting
app.use(
  "/api/public",
  rateLimitExpress({
    key: "api-limit",
    max: 5,
    window: "1m",
  })
);

app.get("/api/public/data", (req, res) => {
  res.json({
    message: "Success! You accessed the public API.",
    timestamp: new Date().toISOString()
  });
});

// Test 2: IP-based rate limiting (default behavior)
app.use(
  "/api/protected",
  rateLimitExpress({
    max: 3,
    window: "30s",
  })
);

app.get("/api/protected/data", (req, res) => {
  res.json({
    message: "Success! You accessed the protected API.",
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
});

// Test 3: Custom key function
app.use(
  "/api/user",
  rateLimitExpress({
    key: (req) => req.query.userId || "anonymous",
    max: 10,
    window: "1m",
  })
);

app.get("/api/user/profile", (req, res) => {
  res.json({
    message: "Success! User profile accessed.",
    userId: req.query.userId || "anonymous",
    timestamp: new Date().toISOString()
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`\n🚀 Express test server running on http://localhost:${PORT}\n`);
  console.log("Test endpoints:");
  console.log(`  1. http://localhost:${PORT}/api/public/data (5 requests per minute)`);
  console.log(`  2. http://localhost:${PORT}/api/protected/data (3 requests per 30 seconds)`);
  console.log(`  3. http://localhost:${PORT}/api/user/profile?userId=123 (10 requests per minute)\n`);
  console.log("Try making multiple requests to see rate limiting in action!");
  console.log("Example: curl http://localhost:3000/api/public/data\n");
});
