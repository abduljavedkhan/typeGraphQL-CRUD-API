import GraphQLJSON from "graphql-type-json";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Payload {
  @Field((type) => ID)
  id: number;

  @Field((type) => [GraphQLJSON])
  data: any[];
}
