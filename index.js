const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

const port = 2001;

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Todo {
        id:ID!
        title:String! 
        completed: Boolean!
        priority: String! 
        dueDate:String!
        }

     type Query {
         getTodos: [Todo!]!
      }
    `,
    resolvers: {
      Query: {
        getTodos: () => [
          {
            id: "1",
            title: "Buy groceries",
            completed: false,
            priority: "High",
            dueDate: "2024-10-04",
          },
          {
            id: "2",
            title: "Clean the house",
            completed: true,
            priority: "Low",
            dueDate: "2024-11-04",
          },
          {
            id: "3",
            title: "Finish homework",
            completed: false,
            priority: "High",
            dueDate: "2024-12-03",
          },
          {
            id: "4",
            title: "Exercise",
            completed: false,
            priority: "Low",
            dueDate: "2024-12-04",
          },
          {
            id: "5",
            title: "Call mom",
            completed: true,
            priority: "Medium",
            dueDate: "2024-12-05",
          },
          {
            id: "6",
            title: "Pay bills",
            completed: true,
            priority: "High",
            dueDate: "2024-12-06",
          },
          {
            id: "7",
            title: "Read a book",
            completed: false,
            priority: "Low",
            dueDate: "2024-12-07",
          },
          {
            id: "8",
            title: "Water the plants",
            completed: true,
            priority: "Medium",
            dueDate: "2024-12-08",
          },
          {
            id: "9",
            title: "Reply to emails",
            completed: false,
            priority: "High",
            dueDate: "2024-12-09",
          },
          {
            id: "10",
            title: "Prepare presentation",
            completed: false,
            priority: "High",
            dueDate: "2024-12-10",
          },
          {
            id: "11",
            title: "Attend meeting",
            completed: true,
            priority: "Medium",
            dueDate: "2024-12-11",
          },
          {
            id: "12",
            title: "Grocery shopping",
            completed: false,
            priority: "High",
            dueDate: "2024-12-12",
          },
          {
            id: "13",
            title: "Organize desk",
            completed: false,
            priority: "Low",
            dueDate: "2024-12-13",
          },
          {
            id: "14",
            title: "Schedule appointment",
            completed: true,
            priority: "Medium",
            dueDate: "2024-12-14",
          },
          {
            id: "15",
            title: "Plan vacation",
            completed: false,
            priority: "High",
            dueDate: "2024-12-15",
          },
          {
            id: "16",
            title: "Watch tutorial",
            completed: true,
            priority: "Low",
            dueDate: "2024-12-16",
          },
          {
            id: "17",
            title: "Fix the sink",
            completed: false,
            priority: "High",
            dueDate: "2024-12-17",
          },
          {
            id: "18",
            title: "Write a blog",
            completed: false,
            priority: "Medium",
            dueDate: "2024-12-18",
          },
          {
            id: "19",
            title: "Clean the car",
            completed: true,
            priority: "Medium",
            dueDate: "2024-12-19",
          },
          {
            id: "20",
            title: "Make dinner",
            completed: false,
            priority: "High",
            dueDate: "2024-12-20",
          },
          {
            id: "21",
            title: "Organize files",
            completed: false,
            priority: "Low",
            dueDate: "2024-12-21",
          },
          {
            id: "22",
            title: "Meditate",
            completed: true,
            priority: "Medium",
            dueDate: "2024-12-22",
          },
        ],
      },
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
