// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
// import Caregory from '../models/Category';

interface TransactionDTO {
  title: string;
  value: number;
  type: string;
}
class CreateTransactionService {
  public async execute({ title, value, type }: Request): Promise<Transaction> {
    // TODO
    const transactionRepository = getRepository(Transaction);

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: 'a1dbdb2b-4d3e-4b3d-a7b6-8b0825638c16',
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
