import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { Note } from "./models/note.js"; // your schema file

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/Keeper", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use(cors());            
app.use(express.json());    
app.use(express.static(path.join(process.cwd(), "public"))); 


app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.json(newNote);
});

app.delete("/api/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
