const { findPath } = require("../scripts/handler");

try {
  const result = findPath("ALPHA", "CHARLIE");

  console.log(result);
} catch (error) {
  console.log(error);
}
