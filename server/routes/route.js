import express from 'express';
import {userSignup, userLogin} from '../controller/user-controller.js';
import {getProducts, getProductById} from '../controller/product-controller.js';
import {addPaymentGateway, paytmResponse} from '../controller/payment-controller.js';

const router = express.Router();


//after hit signup what can we do, that code write in this callback function, so we write this in seperate file
router.post('/signup', userSignup);
router.post('/login', userLogin);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.post('/payment', addPaymentGateway);
router.post('/callback', paytmResponse);


export default router;