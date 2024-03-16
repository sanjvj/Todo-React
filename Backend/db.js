const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect("mongodb+srv://sanjay3012:Sanjaysurya07@cluster0.nz3bsgl.mongodb.net/todoapp" );

const todoSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todoModel = mongoose.model("todoModel", todoSchema);

module.exports={
  todoModel,
};
