import express from 'express';
import { getProduce, createProduce, updateProduce, deleteProduce } from '../controllers/produceController.js';
import protect from "../middleware/protect.js";

const produceRouter = express.Router();

produceRouter.get('/me', protect, getProduce);
produceRouter.post('/', protect, createProduce);
produceRouter.put('/:id', protect, updateProduce);
produceRouter.delete('/:id', protect, deleteProduce);

export default produceRouter;