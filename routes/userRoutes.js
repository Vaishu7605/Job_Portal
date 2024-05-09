import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { updateUserController } from '../controllers/userController.js';

const router = express.Router();

// UPDATE USER || PUT

router.put('/update-user', userAuth, updateUserController);


export default router;