import {Category} from '../data';

interface CreateCategoryRequest {
  name: string;
}

export default async function createCategory(
  value: any,
  category: CreateCategoryRequest
) {
  return await Category.create({...category, balance: 0});
}
