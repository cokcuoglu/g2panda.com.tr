import { Router } from 'express';
import rawMaterialsRouter from './inventory/rawMaterials';
import stockEntriesRouter from './inventory/stockEntries';
import productIngredientsRouter from './inventory/productIngredients';
import alertsRouter from './inventory/alerts';
import recipesRouter from './inventory/recipes';
import statsRouter from './inventory/stats';
import intermediateRecipesRouter from './inventory/intermediateRecipes';
import produceRouter from './inventory/produce';

const router = Router();

// Mount sub-routers
router.use('/raw-materials', rawMaterialsRouter);
router.use('/stock-entries', stockEntriesRouter);
router.use('/products', productIngredientsRouter);
router.use('/alerts', alertsRouter);
router.use('/recipes', recipesRouter);
router.use('/stats', statsRouter);
router.use('/intermediate-recipes', intermediateRecipesRouter);
router.use('/produce', produceRouter);

export default router;
