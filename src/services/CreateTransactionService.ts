// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
// import { response } from 'express';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface TransactionDTO {
  title: string;
  value: number;
  type: string;
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // TODO
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categories?.id) {
      throw new AppError('Categoria invalida');
    }
    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: categories?.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
