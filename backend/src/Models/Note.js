import mongoose from "mongoose";

//1-create a schema
//2-create a model based on schema


//This is a Schema 
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    { timestamps: true },//createdAt and updatedAt fields will be added automatically
)

//This is a Model
const Note = mongoose.model("Note", noteSchema);

export default Note;