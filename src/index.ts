import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.repo.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /users
app.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Loi chi tiet:", error);
    res.status(500).json({ error: "Lỗi server", message: error.message });
  }
});

// GET /users/:id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User không tồn tại" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// POST /users
app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = await createUser(name, email, age);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// PUT /users/:id
app.put("/users/:id", async (req, res) => {
  try {
    const { age } = req.body;
    const updatedUser = await updateUser(Number(req.params.id), age);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// DELETE /users/:id
app.delete("/users/:id", async (req, res) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
