const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

// Enable Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Sample data
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

// API route
app.get("/users", (req, res) => {
  res.json(users);
});

// Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "user-service" });
});

// Metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`✅ User-service running on port ${port}`);
});

