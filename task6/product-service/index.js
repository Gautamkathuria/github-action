const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Sample data
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Tablet" }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "product-service" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`✅ Product-service running on port ${port}`);
});

