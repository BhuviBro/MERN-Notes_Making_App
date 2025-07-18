import Note from "../Models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});//newest firstDescending orderBE
        res.status(200).json({ message: "The notes from DB are \n", notes });
    } catch (error) {
        console.error("Error in getAllNotes Controller: \n", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getNoteById(req,res){
    try {
        const id = (req.params.id)
        const notes = await Note.findById(id);
        if(!notes) return res.status(404).json({message:"Note of given ID not found \n ID: ",id})
        res.status(200).json({message:"Note Found Successfully\n",notes})
    } catch (error) {
        console.error("Error in getNoteById", +error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: "Note created Successfully" });

    } catch (error) {
        console.error("Error in createNote Controller: \n", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
            { title, content },
            { new: true })
        if (!updatedNote) return res.status(404).json({ message: "Note not Found" })
        res.status(200).json({ message: "Note Updated Successfully\n", updatedNote })
    } catch (error) {
        console.error("Error in deleteNote Controller: \n", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function deleteNote(req, res) {

    try {
        const { title, content } = req.body;
        const deletedOne = await Note.findByIdAndDelete(req.params.id)
        if (!deletedOne) res.status(404).json({ message: "Note with ID mentioned note Found" })
        res.status(200).json({ message: "Note Deleted sucessfully\n", deletedOne })
    } catch (error) {
        console.error("Error in updateNote Controller: \n", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}