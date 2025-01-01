import path from 'node:path';
import fs from 'node:fs/promises';

// import { saveFileToCloudinary } from '../utilits/saveFileToCloudinary.js';
// import { env } from '../utils/env.js';

// import { createError } from '../helpers/createError.js';
import { isNotProduct } from '../helpers/isNotProduct.js';
import Product from '../models/product.js';

export const getProducts = async (req, res, next) => {
  console.log(req.user);
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export const createProducts = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);

    isNotProduct(deleteProduct);

    res.status(200).send(deleteProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    isNotProduct(updateProduct);
    res.status(200).send(updateProduct);
  } catch (error) {
    next(error);
  }
};

export const updateSaleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSaleProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      projection: { sale: 1 },
    });

    isNotProduct(updateSaleProduct);

    res.status(200).send(updateSaleProduct);
  } catch (error) {
    next(error);
  }
};

export const updateImagesProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const createNewPath = (filename) =>
      path.resolve('public', 'products', filename);
    const promissArray = req.files.map(async (file) => {
      await fs.rename(file.path, createNewPath(file.filename));
      return path.join('products', file.filename);
    });
    const promissResult = await Promise.allSettled(promissArray);
    // console.log(promissResult);
    const productImagesUrl = promissResult.map((product) => product.value);

    const product = await Product.findByIdAndUpdate(
      id,
      {
        images: productImagesUrl,
      },
      { new: true }
    );
    // console.log(productImagesUrl);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};
