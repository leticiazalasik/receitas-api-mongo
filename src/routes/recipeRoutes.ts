import { Router } from 'express';
import { recipeController } from '../controllers/recipeController';

const router = Router();

router.post('/recipes', recipeController.create);
router.get('/recipes', recipeController.list);
router.get('/recipes/:id', recipeController.getById);
router.put('/recipes/edit/:id', recipeController.update);
router.delete('/recipes/delete/:id', recipeController.delete);
router.get('/recipes/title/:title', recipeController.getByTitle);
router.get('/recipes/difficulty/:difficulty', recipeController.getByDifficulty);




export default router;