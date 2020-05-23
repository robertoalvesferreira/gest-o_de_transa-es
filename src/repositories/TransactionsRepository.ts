import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface TransactionDTO {
  id: string;
  title: string;
}
interface Balance {
  income?: number;
  outcome?: number;
  total?: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const incomes = await this.find({ where: { type: 'income' } });
    const outcomes = await this.find({ where: { type: 'outcome' } });

    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    incomes.forEach((i: Transaction) => {
      balance.income += Number(i.value);
    });

    outcomes.forEach((i: Transaction) => {
      balance.outcome += Number(i.value);
    });

    balance.total = balance.income - balance.outcome;

    console.log(balance);
    return balance;
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

    // await transactions.forEach((t: Transaction) => {
    //   if (t !== null) {
    //     delete t.category.id;
    //   }
    // });

    return transactions;
  }
}

export default TransactionsRepository;
