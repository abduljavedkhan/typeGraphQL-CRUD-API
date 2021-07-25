import { Arg, Query, Resolver } from "type-graphql";
import { Inject } from "typedi";
import { Payload } from "./models";
import { PayloadService } from "./services";
import { FilterModel } from "./filterModel";

@Resolver(Payload)
export class PayloadResolver {
  @Inject()
  private PayloadService: PayloadService;

  @Query(() => Payload)
  payload(
    @Arg("databaseId") databaseId: number,
    @Arg("tableName") tableName: String,
    @Arg("filter",{nullable:true}) filter: FilterModel){ // filter by text, number or date
    return this.PayloadService.fetchPayload(databaseId, tableName,filter);
  }
  
}
