import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async getBalance(): Promise<void> {
    // TODO
  }

  public async createIfItDoesntExist(category: string): Promise<Category> {
    const categories = await this.findOne({
      where: { title: category },
    });

    if (!categories) {
      const categorie = this.create({ title: category });
      await this.save(categorie);
      return categorie;
    }

    return categories;
  }
}

export default CategoriesRepository;
