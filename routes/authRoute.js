import express  from 'express';
import { loginController, registerController, testController, userAuthController} from '../controllers/authController.js'


//routing object
const router = express.Router()

//routing

//REGISTER || METHOD POST
router.post('/register',registerController)
router.get('/registers',registerController,(req,res)=>{
    res.send(user)
})

//LOGIN || METHOD POST
router.post('/login',loginController)


//test
// router.get('/test',requireSignIn, isAdmin, testController)

// //protected user auth
// router.get('/user-auth', requireSignIn, userAuthController);

// //protected admin auth
// router.get('/admin-auth', requireSignIn,isAdmin, userAuthController);

export default router;