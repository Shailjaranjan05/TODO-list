const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo;