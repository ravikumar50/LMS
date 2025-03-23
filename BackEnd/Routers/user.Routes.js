import {Router} from 'express';
import { register,login,logout,getProfile, forgotPassword, resetPassword,changePassword, updateUser} from '../Controllers/user.Controller.js';
import {isLoggedIn} from '../Middlewares/auth.Middleware.js';
import upload from '../Middlewares/multer.Middleware.js';
const router = Router();


router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword/:resetToken',resetPassword);
router.post('/changePassword', isLoggedIn, changePassword);
router.put('/update', isLoggedIn,upload.single("avatar"),updateUser);


export default router;
