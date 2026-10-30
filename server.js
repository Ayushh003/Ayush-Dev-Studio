const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data", "messages.json");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html")),
);
app.get("/about", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "about.html")),
);
app.get("/services", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "services.html")),
);
app.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "contact.html")),
);

app.post("/api/contact", (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  const newMessage = {
    name: name.trim(),
    email: email.trim(),
    service: service || "General",
    message: message.trim(),
    date: new Date().toLocaleString(),
  };

  try {
    let messages = [];
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, "utf-8");
      messages = fileData ? JSON.parse(fileData) : [];
    }

    messages.push(newMessage);
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save message." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
