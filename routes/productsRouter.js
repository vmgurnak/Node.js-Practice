import express from 'express';
import {
  getProducts,
  createProducts,
  deleteProduct,
  updateProduct,
  updateSaleProduct,
  updateImagesProduct,
} from '../controllers/productsControllers.js';
import { isValidId } from '../middlewares/isValidid.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addProductShema,
  saleProductShema,
  updateProductShema,
} from '../shemas/productsShemas.js';
import { isEmptyBody } from '../middlewares/isEmptyBody.js';
import { auth } from '../middlewares/auth.js';

import uploadMiddleware from '../middlewares/uploadFiles.js';

const productsRouter = express.Router();

productsRouter.use(auth);
productsRouter.get('/', getProducts);
productsRouter.post('/', validateBody(addProductShema), createProducts);
productsRouter.delete('/:id', isValidId, deleteProduct);
productsRouter.patch(
  '/:id',
  isValidId,
  isEmptyBody,
  validateBody(updateProductShema),
  updateProduct
);
productsRouter.patch(
  '/:id/sale',
  isValidId,
  validateBody(saleProductShema),
  updateSaleProduct
);
productsRouter.patch(
  '/images/:id',
  isValidId,
  uploadMiddleware.array('productImages', 8),
  updateImagesProduct
);

export default productsRouter;
