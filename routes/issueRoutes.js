import express from "express";
import jwt from "jsonwebtoken";
import Issue from "../model/pissue.js";  // Import Issue model

const router = express.Router();

// Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Authentication required" });

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const issues = await Issue.find().populate("userId", "email"); // Populate user details from userId
    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching issues' });
  }
});

// Create a new issue
router.post("/", authenticateToken, async (req, res) => {
  const { title, description, ward } = req.body;

  if (!title || !description || !ward) {
    return res.status(400).json({ message: 'All fields (title, description, ward) are required' });
  }

  try {
    const newIssue = new Issue({
      title,
      description,
      ward,
      userId: req.user.userId,  // Use the authenticated user's ID from the token
    });

    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating issue' });
  }
});

// Upvote an issue
router.post("/upvote/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.upvotes += 1; // Increment upvotes count
    await issue.save();

    res.json({ message: 'Upvoted successfully', issue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating upvotes' });
  }
});

export default router;
