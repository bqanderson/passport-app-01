var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  assignmentNumber: Number,
  studentName: String,
  score: Number,
  dateCompleted: Date
})

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
