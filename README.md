# GraphQL POC

`npm install`

`npm run dev:start`
> GraphQL IDE: open in browser localhost:**_port_**/graphql


`npm run json:server`
> View JSON data: open in browser localhost:**_port_**/customers


## Test GraphQL CRUD
> open in browser  localhost:**_port_**/graphql

> and run the queries
### Fetch all customers
```
{
  customers {
    email, name, id
  }
}
```

### Fetch customer by id
```
{
  customer(id:"1"){
    email, name, id
  }
}
```

### Add customer
```
mutation {
  addCustomer(name:"mobx", email:"mobx@guesty.com", age:10){
    id,
    name,
    email,
  }
}
```

### Del customer
```
mutation{
  delCustomer(id:"1") {
    id
  }
}
```

### Edit customer
```
mutation{
  editCustomer(id:"2", age:5000){
    id, name, email, age
  }
}
```