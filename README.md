# typeGraphQL-CRUD-API

## Steps to run the project
```
- Clone the repository
- update DB details on .env file
- Install the required dependency: `npm install`
- Run the project: `npm run start`
```

## Technical Specification

Following stack has been used in the project
- [TypeGraphQL](https://typegraphql.com/)
- [Node-Postgres](https://node-postgres.com/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

## Output
### - <b>Retrieve Data:</b>
passing input as tableName: <b>"public.product"</b> and getting payload object in response. 

![image](https://user-images.githubusercontent.com/44355278/122685019-b019c080-d226-11eb-8cc2-fed0f00ab002.png)

Passing tableName as <b>"public.purchase_items"</b>

![image](https://user-images.githubusercontent.com/44355278/122685152-54036c00-d227-11eb-9cd8-b09abe589376.png)

Passing tableName as <b>"public.users"</b>

![image](https://user-images.githubusercontent.com/44355278/122685228-9f1d7f00-d227-11eb-8ddb-4c89a3af3202.png)

### - <b>Filtering:</b>
Here, we have three types of filters: number, text or date. Each filter has its own subType. 
## - number filter
1. subType: "greater than" 

Execute below query to get Price value greater than 20
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "number"
      columnName: "price"
      subType: "greater than"
      value: "20"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122685471-2c150800-d229-11eb-9b03-028fccc6adce.png)

2. subType: "less than" 

Execute below query to get Payload having Price value less than 20
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "number"
      columnName: "price"
      subType: "less than"
      value: "20"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122685619-2e2b9680-d22a-11eb-9677-d70f1bea0b5d.png)

3. subType: "equal to" 

Execute below query to get Payload having Price value equal to 108.00
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "number"
      columnName: "price"
      subType: "equal to"
      value: "108.00"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122685658-76e34f80-d22a-11eb-9d91-b34555f32a30.png)

## - text filter
1. subType: "equal to" 

```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "text"
      columnName: "title"
      subType: "equal to"
      value: "Python Book"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122685834-8616cd00-d22b-11eb-934e-ab3286f06c29.png)

2. subType: "includes" 

```{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "text"
      columnName: "title"
      subType: "includes"
      value: "CD"
    }
  ) {
    id
    data
  }
}

```
Response

![image](https://user-images.githubusercontent.com/44355278/122685933-34bb0d80-d22c-11eb-8914-54cab61e8aac.png)

3. subType: "starts with"
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "text"
      columnName: "title"
      subType: "starts with"
      value: "Coloring"
    }
  ) {
    id
    data
  }
}
```
Response
![image](https://user-images.githubusercontent.com/44355278/122686006-9b402b80-d22c-11eb-9aad-dde76651fe67.png)

4. subType: "ends with"
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "text"
      columnName: "title"
      subType: "ends with"
      value: "Book"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122686048-e1958a80-d22c-11eb-887c-1a804b588210.png)


## - date filter
1. subType: "before" 
    pass value as date in YYYY-MM-DD format
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "date"
      columnName: "created_at"
      subType: "before"
      value: "2021-01-02"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122686173-8adc8080-d22d-11eb-96dc-365cb37736fb.png)

2. subType: "after" 
    pass value as date in YYYY-MM-DD format
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "date"
      columnName: "created_at"
      subType: "after"
      value: "2021-01-20"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122686289-de4ece80-d22d-11eb-9759-534199f3fb23.png)

3. subType: "is on"
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "date"
      columnName: "created_at"
      subType: "is on"
      value: "2021-01-02"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122686412-751b8b00-d22e-11eb-974a-0085efa2a45d.png)

4. subType: "between"
   use <b>dateFrom</b> and <b>dateTo</b> input params
```
{
  payload(
    databaseId: 1
    tableName: "public.products"
    filter: {
      type: "date"
      columnName: "created_at"
      subType: "between"
      dateFrom:"2021-01-11", dateTo:"2021-01-20"
    }
  ) {
    id
    data
  }
}
```
Response

![image](https://user-images.githubusercontent.com/44355278/122686521-0f7bce80-d22f-11eb-86df-f2b1dd40c707.png)
