// test-formation-api.js
const http = require("http");

const baseURL = "http://localhost:5000/api/formations";
const testEndpoints = [
  { path: "/categories", name: "Categories" },
  { path: "/levels", name: "Levels" },
  { path: "/statuses", name: "Statuses" },
  { path: "/", name: "All Formations" },
  { path: "/test-id-123", name: "Invalid Formation ID" },
];

console.log("🧪 Testing Formation API Endpoints...\n");

testEndpoints.forEach(({ path, name }) => {
  const url = baseURL + path;
  console.log(`Testing ${name}: ${url}`);

  http
    .get(url, (res) => {
      console.log(`  Status: ${res.statusCode}`);

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          console.log(`  Success: ${json.success ? "✅" : "❌"}`);
          if (json.message) {
            console.log(`  Message: ${json.message}`);
          }
        } catch (e) {
          console.log(`  Response: ${data.substring(0, 100)}...`);
        }
        console.log("");
      });
    })
    .on("error", (err) => {
      console.log(`  ❌ Error: ${err.message}`);
      console.log("");
    });
});
