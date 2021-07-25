import { Service } from "typedi";
import { connectionPool, dbConfigPool } from "./connectionPool";
import { databases } from "./db";
import { Payload } from "./models";
import { FilterModel } from "./filterModel";

@Service()
export class PayloadService {
  async fetchPayload(
    id: number,
    tableName: String,
    filter: FilterModel
  ): Promise<Payload> {
    try {
      //seleting db config by id
      const databaseCredentials = databases.find((d) => d.id && +d.id === id);
      if (!databaseCredentials) throw new Error(`Invalid ID!`);
      else dbConfigPool(id);

      let query: string;
      if (filter && filter["type"]) {
        // for fiter by text, number or Date (required format:YYYY-MM-DD)
        switch (filter["type"]) {
          case `number`:
            switch (filter["subType"]) {
              case `less than`:
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} < ${filter["value"]}`;
                break;
              case `greater than`:
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} > ${filter["value"]}`;
                break;
              case `equal to`:
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} = ${filter["value"]}`;
                break;
              default:
                throw new Error(`Invalid subType`);
            }
            break;

          case `text`:
            switch (filter["subType"]) {
              case `includes`:
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} like '%${filter["value"]}%' `;
                break;
              case `starts with`:
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} like '${filter["value"]}%'`;
                break;
              case `ends with`:
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} like '%${filter["value"]}'`;
                break;
              case `equal to`:
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} = '${filter["value"]}'`;
                break;
              default:
                throw new Error(`Invalid subType`);
            }
            break;

          case `date`:
            switch (filter["subType"]) {
              case `before`:
                if (!filter["value"])
                  throw new Error(
                    "Required Parameter for subType:[before] => [value]"
                  );
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} < TO_DATE('${filter["value"]}','YYYY-MM-DD') `;
                break;
              case `after`:
                if (!filter["value"])
                  throw new Error(
                    "Required Parameter for subType:[after] => [value]"
                  );
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} > TO_DATE('${filter["value"]}','YYYY-MM-DD') `;
                break;
              case `is on`:
                if (!filter["value"])
                  throw new Error(
                    "Required Parameter for subType:[is on] => [value]"
                  );
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} BETWEEN TO_DATE('${filter["value"]}','YYYY-MM-DD') AND (TO_DATE('${filter["value"]}','YYYY-MM-DD') + INTERVAL '1 day')`;
                break;
              case `between`:
                if (!filter["dateFrom"] || !filter["dateTo"])
                  throw new Error(
                    "Required Parameter for subType:[between] => [dateFrom,dateTo]"
                  );
                query = `SELECT * FROM ${tableName} WHERE ${filter["columnName"]} BETWEEN '${filter["dateFrom"]}' AND '${filter["dateTo"]}'`;
                break;
              default:
                throw new Error(`Invalid subType`);
            }
            break;
          default:
            throw new Error(
              `Invalid type, allowed type are [number,text,date]`
            );
        }
      } else {
        query = `SELECT * FROM ${tableName}`;
      }

      //calling DB by using connection pool and fetching response
      const res = await connectionPool.query({ text: query });

      return {
        id,
        data: res.rows,
      };
    } catch (err) {
      throw new Error(`Error: ` + err.message);
    }
  }
}
