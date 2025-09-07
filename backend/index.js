import express from "express";
import fs from "fs";
import path from "path";
import * as mm from "music-metadata";
import cors from "cors";

// Config oku
const configPath = path.join(process.cwd(), "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const musicDir = path.isAbsolute(config.musicDir)
  ? config.musicDir
  : path.join(process.cwd(), config.musicDir);

const port = config.serverPort || 5050;

const app = express();
app.use(cors());
// 🎶 API: Müzik listesini döndür
app.get("/api/music", async (req, res) => {
  try {
    const files = fs.readdirSync(musicDir);
    const songs = [];

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (config.allowedExtensions.includes(ext)) {
        const filePath = path.join(musicDir, file);
        try {
          const metadata = await mm.parseFile(filePath);
          songs.push({
            title: metadata.common.title || path.basename(file, ext),
            artist: metadata.common.artist || "Bilinmeyen Sanatçı",
            duration: metadata.format.duration || 0,
            file: `/music/${file}`
          });
        } catch {
          songs.push({
            title: path.basename(file, ext),
            artist: "Bilinmeyen",
            duration: 0,
            file: `/music/${file}`
          });
        }
      }
    }

    res.json(songs);
  } catch (err) {
    res.status(500).json({
      error: "Müzik klasörü okunamadı",
      details: err.message
    });
  }
});

// 🎵 Statik müzik dosyaları
app.use("/music", express.static(musicDir));

// 🚀 Sunucu başlat
app.listen(port, () => {
  console.log(`🎵 Music API running on http://localhost:${port}`);
  console.log(`📂 Source directory: ${musicDir}`);
});
