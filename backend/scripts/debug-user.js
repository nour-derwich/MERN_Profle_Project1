const express = require("express");
const app = express();

// Load your routes
const formationRoutes = require("../routes/formation.routes");

console.log("🔍 Debugging Formation Routes\n");
console.log("📋 Route stack from formationRoutes:");

// Check if formationRoutes is a router
if (formationRoutes && formationRoutes.stack) {
  formationRoutes.stack.forEach((layer) => {
    if (layer.route) {
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods);
      console.log(`  ${methods.join(",")} ${path}`);
    } else if (layer.name === "router") {
      // Nested router
      console.log("  Nested router found");
    }
  });
} else {
  console.log("❌ formationRoutes is not a valid Express router");
  console.log("Type:", typeof formationRoutes);
  console.log("Has stack?", formationRoutes.stack !== undefined);
}

console.log("\n🧪 Testing route matching...\n");

// Test the route matching logic
const testPaths = [
  "/statuses",
  "/categories",
  "/levels",
  "/550e8400-e29b-41d4-a716-446655440001",
];

testPaths.forEach((testPath) => {
  console.log(`Testing: ${testPath}`);

  // Check what route would match
  if (testPath === "/statuses") {
    console.log("  Should match: GET /statuses");
  } else if (testPath === "/categories") {
    console.log("  Should match: GET /categories");
  } else if (testPath === "/levels") {
    console.log("  Should match: GET /levels");
  } else if (testPath.match(/^\/[a-f0-9-]{36}$/)) {
    console.log("  Should match: GET /:id (UUID pattern)");
  } else {
    console.log("  Unknown pattern");
  }
  console.log("");
});

console.log(
  "💡 If /statuses is matching /:id, check route order in formation.routes.js"
);
