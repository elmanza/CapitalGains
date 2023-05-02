# Code Challenge: Capital Gains

This is a command-line program (CLI) that calculates the amount of taxes you need to pay based on the gains or losses of an investment in the stock market. The program takes an array of buy and sell stock operations encoded in JSON format and returns an array of taxes to be paid for each operation.

## Prerequisitos

- Install [**Nodejs**](https://nodejs.org/en/) (Any version)
- Install [**Postman**](https://www.postman.com/)
- Download the repository from [**Github**](https://github.com/elmanza/CapitalGains/)

### Installation

- Clone the project

```bash
  git clone https://github.com/elmanza/CapitalGains.git
```

Install dependencies

```bash
  npm install
  npm i express @hapi/boom cors dotenv ejs nodemon supertest
```

Start the server

```bash
  npm run start
  npm run dev
  npm run cli
```

To use the program through the command line, just write the command to execute the cli.js file on the console, followed by passing as parameters the array of operations enclosed in single quotes. The program will print the result in the console, for example:

```bash
  npm run cli '[{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]'
  node cli.js '[{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]'
```

It is also possible to pass 'n' arrays as arguments in single quotes, for example:

```bash
  npm run cli '[{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]' '[{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]'
```

Or multiple arrays in a single parameter within single quotes:

```bash
  npm run cli '[{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}][{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]'
```

## Endpoints

The project uses a Service-Oriented Architecture (SOA), based on components, which makes it scalable and modular. `express` is used to create the API, and its functionalities can be accessed either through Postman or through the graphical interface.

### Graphical interface

```http
  POST http://localhost:3000/
```

Through the interface, users can verify the functionality of the API services. Users can change the test cases through a select menu that updates the information to be sent to the backend. Users can also change the information as they wish.

### Postman

Two endpoints were created to use the API services. One to send data through query params and the other through the HTTP POST verb and its information through the Payload.

```http
  GET http://localhost:3000/shares?operations=[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}][{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":10.00, "quantity": 5000}]
```

```http
  POST http://localhost:3000/shares
  Payload
    [
        {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":15.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":25.00, "quantity": 5000}
    ]
```

### Testing

To run the tests, simply run the command `npm run test`
