const express = require("express");
const multer = require("multer");
const { supabase } = require("../config/supabaseClient");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { data, error } = await supabase.storage.from("documents").upload(originalname, buffer);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ url: data.Key });
});

module.exports = router;
