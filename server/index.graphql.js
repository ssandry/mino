const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { readFileSync } = require("fs");
const SCHEMAGQL = readFileSync(`${__dirname}/schema.gql`, { encoding: "utf8" });
const collections = require("../data/collections.json");

const PORT = 3004;
const SCHEMA = buildSchema(SCHEMAGQL);
const app = express();

const ROOT = {
    getAllCollections: () => {
        return collections
    }
}

app.use("/", graphqlHTTP({
    schema: SCHEMA,
    rootValue: ROOT,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
})