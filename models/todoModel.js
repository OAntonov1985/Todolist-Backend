const mongoose = require("mongoose");

const todoShema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A task must have a title'],
        unique: true,
        maxlength: [60, 'A title name must have less or equal then 60 characters'],
        minlength: [10, 'A title name must have more or equal then 10 characters']
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        require: [true, 'A task must some description'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false
    }
}, {
    versionKey: false
});

todoShema.pre('save', function (next) {
    this.description = this.title;
    next();
});


const Todos = mongoose.model("Todos", todoShema);

module.exports = Todos;