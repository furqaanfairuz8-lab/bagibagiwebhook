const express = require("express")
const app = express()
app.use(express.json())

const TOKEN = "Bogi123"  // token rahasia kamu

// Antrian pesan
let messages = []

// ======================================================
// POST /kirim  — untuk kirim pesan dari luar (Discord, dll)
// ======================================================
app.post("/kirim", (req, res) => {
    const { token, teks } = req.body

    if (token !== TOKEN) {
        return res.status(403).json({ error: "Token salah" })
    }
    if (!teks) {
        return res.status(400).json({ error: "Field teks kosong" })
    }

    messages.push({ id: Date.now(), teks })
    console.log("[PESAN MASUK]", teks)
    res.json({ ok: true, total: messages.length })
})

// ======================================================
// GET /roblox-cek/kosong  — Roblox ambil + hapus pesan
// ======================================================
app.get("/roblox-cek/kosong", (req, res) => {
    const { token } = req.query

    if (token !== TOKEN) {
        return res.status(403).json({ error: "Token salah" })
    }

    // Kirim semua pesan lalu langsung clear
    const ambil = [...messages]
    messages = []

    res.json(ambil)
})

// ======================================================
// GET /  — cek server hidup
// ======================================================
app.get("/", (req, res) => {
    res.json({ status: "ok", pesan_antri: messages.length })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server jalan di port", PORT)
})
