const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: String,
  address: String,
  description: String,
  courses: [{
    courseName: String,
    cutoff: Number,
    seat: Number
  }],
  image: String,
});

module.exports = mongoose.model('College', CollegeSchema);
