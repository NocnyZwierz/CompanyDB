const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 1 },
  lastName: { type: String, required: true, minlength: 1 },
  department: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Department' },
});
module.exports = mongoose.model("Employees", employeesSchema);
