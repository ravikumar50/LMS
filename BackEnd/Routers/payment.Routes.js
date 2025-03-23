import {Router} from 'express';
import {allPayments, getRazorpayApiKey,buySubscription,verifySubscription, cancelSubscription} from '../Controllers/payment.Controller.js';
import {isLoggedIn, authorizedRoles} from '../Middlewares/auth.Middleware.js';

const router = Router();

router.get('/', isLoggedIn, authorizedRoles("ADMIN"), allPayments);
router.get('/razorpayKey',isLoggedIn, getRazorpayApiKey);
router.post('/subscribe', isLoggedIn, buySubscription);
router.post('/verify',isLoggedIn, verifySubscription);
router.post('/unsubscribe',isLoggedIn, cancelSubscription)

export default router;