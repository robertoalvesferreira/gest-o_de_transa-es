import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  id: string;
  title: string;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<void> {
    // TODO
  }

  public async getTransactions(): Promise<TransactionDTO[]> {
    // const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactions = await this.find({
      join: {
        alias: 'transactions',
        leftJoinAndSelect: {
          categories: 'transactions.category',
        },
      },
    });

    await transactions.forEach((t: Transaction) => {
      delete t.category.id;
    });

    return transactions;
  }
}

export default TransactionsRepository;
