import {GraphQLObjectType} from 'graphql';

import transactions from './transactions';
import summary from './summary';
import restaurants from './restaurants';
import categories from './categories';
import accounts from './accounts';
import people from './people';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Query for Transactions',
  fields: () =>
    ({
      transactions,
      summary,
      restaurants,
      categories,
      accounts,
      people,
    } as any),
});
