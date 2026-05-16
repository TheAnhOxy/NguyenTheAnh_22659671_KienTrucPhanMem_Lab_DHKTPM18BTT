const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8082);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((v) => v.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin blocked"));
    },
  })
);
app.use(express.json());

let movies = [
  { id: 1, name: "Oppenheimer", price: 85000, image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Dune: Part Two", price: 90000, image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "John Wick: Chapter 4", price: 75000, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Spider-Man", price: 80000, image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80" }
];

app.get("/health", (_, res) => {
  res.json({ service: "movie-service", status: "ok" });
});

app.get("/movies", (_, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((f) => f.id === id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  return res.json(movie);
});

app.post("/movies", (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "name and price are required" });
  }
  const movie = {
    id: movies.length ? movies[movies.length - 1].id + 1 : 1,
    name,
    price: Number(price),
    image: image || "",
  };
  movies.push(movie);
  return res.status(201).json(movie);
});

app.put("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = movies.findIndex((f) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  movies[index] = { ...movies[index], ...req.body, id };
  return res.json(movies[index]);
});

app.delete("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const oldLength = movies.length;
  movies = movies.filter((f) => f.id !== id);
  if (movies.length === oldLength) {
    return res.status(404).json({ message: "Movie not found" });
  }
  return res.status(204).send();
});

app.listen(port, "0.0.0.0", () => {
  console.log(`movie-service listening on ${port}`);
});
