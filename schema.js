const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

/*
const customers = [
  {id:"1", name: "koko", email: 'koko@gmail.com', age:11},
  {id:"2", name: "bobo", email: 'bobo@nana.com', age:55},
  {id:"3", name: "lolo", email: 'lolo@walla.com', age:22},
];
*/

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    email: {type:GraphQLString},
    age: {type:GraphQLInt},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLString},
      },
      resolve(parentValue, args) {
        /*for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }*/
        console.log('id: ', args.id);
        return axios.get('http://localhost:3000/customers/'+args.id)
          .then(res => {
            console.log('res: ', res.data);
            return res.data;
          });
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers')
          .then(res => res.data);
      }
    }
  }
});

const Mutations = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age,
        }).then(res => res.data);
      }
    },
    delCustomer: {
      type: CustomerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, args) {
        return axios.delete('http://localhost:3000/customers/'+args.id)
          .then(res => res.data);
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parentValue, args) {
        return axios.patch('http://localhost:3000/customers/'+args.id, args)
          .then(res => res.data);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});