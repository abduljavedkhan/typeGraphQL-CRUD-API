import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { PayloadResolver } from "./resolvers";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [PayloadResolver],
    emitSchemaFile: true,
    container: Container,
  });

  const server = new ApolloServer({ schema });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

bootstrap();
