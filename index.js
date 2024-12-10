const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const axios = require("axios");

const port = 2001;

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Users {
          id:ID!
          name:String!
          email:String!
          phone:String!
          website:String!
         }
      type Todo {
        user:Users!
        id:ID!
        title:String! 
        completed: Boolean!
        }

     type Query {
         getTodos: [Todo!]!
         getAllUsers: [Users!]!
         getSingleUser(id:ID!): Users

      }
    `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          todo.userId &&
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            )
          ).data, // yaha hum apne data base se get,update karenge resolver me
      },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data, // yaha pass hum apne data base se get,update karenge resolver me

        getAllUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

        getSingleUser: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },

      //   Query:{
      //     getUser: async () => ((await axios.get("https://jsonplaceholder.typicode.com/users")).data,
      //   },
    },
  });

  app.use(cors());
  app.use(bodyParser.json());
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen({ port }, () => {
    console.log(`��� Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();
