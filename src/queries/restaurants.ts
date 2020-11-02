import {uniq} from 'lodash';
import {Transaction} from '../data';

export default async function () {
  const response = await Transaction.findAll({
    where: {category: 'Food > Dining Out'},
  });

  const items = uniq(
    (response as []).map((t: {payee: string}) => t.payee).sort()
  );

  return {
    count: items.length,
    items,
  };
}
