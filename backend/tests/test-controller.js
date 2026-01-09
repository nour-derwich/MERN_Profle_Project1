const controller = require("../controllers/registration.controller");

console.log("Checking registration controller exports:");
console.log("=========================================");

const requiredMethods = [
  "createRegistration",
  "verifyEmail",
  "resendVerificationEmail",
  "updatePaymentStatus",
  "sendWelcomeEmail",
  "sendCustomNotification",
  "getRegistrationById",
  "updateRegistrationStatus",
  "getAllRegistrations",
  "getRegistrationStats",
  "getRegistrationsByFormation",
  "exportRegistrations",
  "updateRegistration",
  "deleteRegistration",
  "cancelRegistration",
  "bulkAction",
];

requiredMethods.forEach((method) => {
  if (controller[method]) {
    console.log(`✅ ${method}: Exported`);
  } else {
    console.log(`❌ ${method}: MISSING!`);
  }
});
