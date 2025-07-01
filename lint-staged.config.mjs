export default {
  "**/*.{ts,tsx}": ["eslint", "prettier --write --ignore-unknown"],
  "**/*.!({ts,tsx})": "prettier --write --ignore-unknown",
};
