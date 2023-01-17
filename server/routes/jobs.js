const router = require("express").Router();
const {Jobs, validate} = require("../models/jobs");

router.get("/", async (req, res) => {
  const allJobs = await Jobs.find();
  return res.status(200).json(allJobs);
});

router.get("/:id", async (req, res) => {
  const editJobs = await Jobs.findById(req.params.id);
  return res.status(200).json(editJobs);
});

router.post("/", async (req, res) => {
  try {
    const {error} = validate(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});

    await new Jobs({...req.body}).save();
    res.status(201).send({message: "Job created successfully"});
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"});
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const {error} = validate(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});

    await Jobs.findByIdAndUpdate(req.params.id, {...req.body});
    res.status(201).send({message: "Job Edited successfully"});
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Jobs.findByIdAndDelete(req.params.id);
    res.status(201).send({message: "Job Deleted successfully"});
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"});
  }
});

module.exports = router;
