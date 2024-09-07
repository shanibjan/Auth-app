import express from 'express'
import taskModel from '../models/taskModel.js'
const router = express.Router()




router.get('/get-users/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const todos = await taskModel.find({ user: userId });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add-task',async(req,res)=>{
   try {
    const{title,description,userId}=req.body
    if (!title || !description || !userId  ) {
      return res.status(400).send({ error: 'All fields are required' });
    }
    const existingTask = await taskModel.findOne({ description, user: userId });
    
    if (existingTask) {
      return res.status(400).json({ error: 'Task with this description already exists for this user' });
    }
    
        const newItem = new taskModel( { title,description,user:userId} );
    const item = await newItem.save();
    res.json({success:true,message:"Task Added",item});
   } catch (error) {
    console.log({ error });
   } 
})

router.get('/tasks',async(req,res)=>{
  try {
    const tasks=await taskModel.find()
 res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: err.message });
    
  }
  
  
})


router.put('/update/:id', async (req, res) => {
    try {
     
       
       const{status}=req.body
       console.log( status);
       
        
      const item = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
     
      
      res.json({success:true,message:"Task Updated",item});
    } catch (err) {
      console.log(err);
      
      res.status(500).json({ error: err.message });
    }
  });


  router.delete('/delete/:id', async (req, res) => {
    try {
      console.log(req.params.id);
      
      await taskModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



export default router;