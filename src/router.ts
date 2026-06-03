import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

//auth and register routes
router.post('/auth/register', (req, res) => {
  // Authentication logic here
  console.log('Registering user with data:', req.body);
});

export default router;