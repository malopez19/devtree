import { Router } from "express";
import { createAccountHandler, loginHandler } from "./handlers";
import { handleInputErrors, validateLoginInput, validateRegisterInput } from "./middleware/validation";

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

//auth and register routes
router.post('/auth/register', validateRegisterInput, handleInputErrors, createAccountHandler);
router.post('/auth/login', validateLoginInput, handleInputErrors, loginHandler);

export default router;