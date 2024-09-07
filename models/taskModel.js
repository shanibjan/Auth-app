import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true,
      },
      description:{
        type:String,
        require:true,
        trim:true,
      },
      status: {
        type: Boolean,
        default: false // false represents unchecked by default
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  },
  {
    timestamps:true
  });

 
  

  

  export default mongoose.model('tasks',TaskSchema)