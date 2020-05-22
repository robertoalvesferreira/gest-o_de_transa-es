import { Router } from 'express';
// import { getCustomRepository } from 'typeorm';
// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
import { getCustomRepository } from 'typeorm';
import CategoriesRepository from '../repositories/CategoriesRepository';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getCustomRepository(CategoriesRepository);
  const categories = await categoriesRepository.find();
  console.log(categories);
  response.json(categories);
  // TODO
});

categoriesRouter.post('/', async (request, response) => {});

categoriesRouter.delete('/:id', async (request, response) => {
  // TODO
});

categoriesRouter.post('/import', async (request, response) => {
  // TODO
});

export default categoriesRouter;
