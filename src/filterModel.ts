import { Field, InputType } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class FilterModel {
  @Field()
  @MaxLength(15)
  columnName?: string;

  @Field()
  value?: string;

  @Field()
  @MaxLength(6)
  type?: string;

  @Field()
  subType?: string;

  @Field({ nullable: true })
  dateFrom?: string;

  @Field({ nullable: true })
  dateTo?: string;
}
