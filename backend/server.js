import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

app.get("/images", (req, res) => {
  const files = fs.readdirSync("uploads");
  res.json(files.map(f => `uploads/${f}`));
});

app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ file: req.file.filename });
});

app.delete("/uploads/:filename", (req, res) => {
  const filePath = `uploads/${req.params.filename}`;
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.sendStatus(200);
});

app.delete("/delete", (req, res) => {
  const file = req.query.file;

  const filePath = path.join("uploads", file);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: "File berhasil dihapus" });
  } else {
    res.status(404).json({ message: "File tidak ditemukan" });
  }
});

app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));