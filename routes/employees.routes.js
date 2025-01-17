const express = require("express");
const router = express.Router();
const Employees = require("../models/employees.model");

router.get("/employees", async (req, res) => {
  try {
    res.json(await Employees.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/employees/random", async (req, res) => {
  try {
    const count = await Employees.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employees.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const dep = await Employees.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/employees", async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployees = new Employees({ name: name });
    await newEmployees.save();
    res.json({ newEmployees });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/employees/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Employees.findById(req.params.id);
    if (dep) {
      dep.name = name;
      await dep.save();
      res.json({ dep });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    const dep = await Employees.findById(req.params.id);
    if (dep) {
      await Employees.deleteOne({ _id: req.params.id });
      res.json({ dep });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
