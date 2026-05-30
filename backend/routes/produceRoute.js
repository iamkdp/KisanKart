import express from 'express';
import { getProduce, createProduce, updateProduce, deleteProduce, getAllProduce, getSingleProduce } from '../controllers/produceController.js';
import protect from "../middleware/protect.js";
import {upload} from "../config/cloudinary.js";
const produceRouter = express.Router();

produceRouter.get('/my', protect, getProduce);
produceRouter.get('/', getAllProduce);  
produceRouter.get('/:id', getSingleProduce);

produceRouter.post('/', protect, upload.array('images', 5), createProduce);

produceRouter.put('/:id', protect, updateProduce);

produceRouter.delete('/:id', protect, deleteProduce);

export default produceRouter;