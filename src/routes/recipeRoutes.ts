import { Router } from 'express';
import { recipeController } from '../controllers/recipeController';

const router = Router();

router.post('/recipes', recipeController.create);
router.get('/recipes', recipeController.list);
router.get('/recipes/:id', recipeController.getById);
router.put('/recipes/edit/:id', recipeController.update);


export default router;