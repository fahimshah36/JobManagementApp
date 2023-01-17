const mongoose = require("mongoose");
const Joi = require("joi");

const jobsSchema = new mongoose.Schema({
  jobCategory: {type: String, required: true},
  jobTitle: {type: String, required: true},
  jobDescription: {type: String, required: true},
  jobExperience: {type: Number, required: true},
  date: {type: String, required: true},
});

const Jobs = mongoose.model("jobs", jobsSchema);

const validate = (data) => {
  const schema = Joi.object({
    jobCategory: Joi.string().required().label("Job Category"),
    jobTitle: Joi.string().required().label("Job Title"),
    jobDescription: Joi.string().required().label("Job Description"),
    jobExperience: Joi.number().required().label("Job Experience"),
    date: Joi.string().required().label("Date"),
  });
  return schema.validate(data);
};

module.exports = {Jobs, validate};
