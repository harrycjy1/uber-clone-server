import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const Alltypes: any = fileLoader(path.join(__dirname, "./api/**/*.graphql"));

const Allresolvers: any = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes: any = mergeTypes(Alltypes);
const mergedResolvers: any = mergeResolvers(Allresolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;
