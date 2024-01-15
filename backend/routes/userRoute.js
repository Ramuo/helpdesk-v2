import express from 'express'
import  { 
    registerUser, 
    loginUser,
    getMe
} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'


// Set up express router
const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser); 

router.get('/:id', getMe);

export default router;