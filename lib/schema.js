import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root of the Schema',
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: 'hello resource',
      resolve: function(source, args) {
        return 'hello';
      }
    }
  })
});

const Mutuation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createHello: {
      type: GraphQLString,
      description: 'Create hello',
      args: {
        prefix: {type: GraphQLString}
      },
      resolve: function(source, {prefix}) {
        return `${prefix} world!`;
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutuation
});

export default Schema;
