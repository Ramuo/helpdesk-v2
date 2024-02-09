import express from 'express'
import  { 
    registerUser, 
    loginUser,
    getUserById,
    updateUser,
    logoutUser
} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';


// Set up express router
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser); 
router.route('/logout').post(logoutUser)
router.route('/:id')
    .get(protect, checkObjectId, getUserById)
    .put(protect, checkObjectId, updateUser);
export default router;