import express from 'express';

import AuthControllers from '../controllers/authControllers.js';
import authMiddleware from '../middlewares/auth.js';

const jsonParser = express.json();

const router = express.Router();

router.post('/register', jsonParser, AuthControllers.register);
router.post('/login', jsonParser, AuthControllers.login);
router.post('/logout', jsonParser, authMiddleware, AuthControllers.logout);
router.get('/current', jsonParser, authMiddleware, AuthControllers.current);
router.get('/get-oauth-url', AuthControllers.getGoogleOAuthUrl);

export default router;
