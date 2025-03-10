const express = require("express");
const { supabase } = require("../config/supabaseClient");

const router = express.Router();

// Request OTP Login
router.post("/login", async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "OTP Sent! Check your email." });
});

module.exports = router;
