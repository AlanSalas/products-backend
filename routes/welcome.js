import express from "express";
const router = express.Router();

router.get("", (req, res) => {
  res.send(`
    <div>
      <h1>Welcome to products API</h1>
      <a href="https://documenter.getpostman.com/view/8273975/VUjMnkXQ">Api Documentation</a>
    </div>
  `);
});

export default router;
