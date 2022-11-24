# README - Oxbury Tech Test

## Prerequisites

- Node
- npm

## Getting Started

Before attempting anything, ensure you have run `npm i` in this directory to install all dependencies.

## Testing

All tests are in the `test` directory. We use `jest` and `supertest` to test our server. Run `npm t` to execute tests.

## Running The Server

Run `npm start` to run the server. It is configured to run on localhost:9090 by default.

## Endpoints

(a) = protected endpoint - add request header "Authorization": "testToken" to use

(v) = request body validation via schema

(pg) = results paginated and endpoint takes additional queries "page" and "limnit"

- `/api`
  - GET - Returns a 200 and an `ok` message when the server is online

- `/api/data`
  - GET (a) - Returns a 200 and a JSON object containing the whole DB

- `/api/farmers` 
  - GET (a, pg) - Returns a 200 and a list of all farmers
  - POST (a, v) - Returns a 201 and JSON object of the added farmer
  - PATCH (a, v) - Returns a 200 and a confirmation message
  - DELETE (a) - Returns a 200 and a confirmation message

- `/api/applications` 
  - GET (a, pg) - Returns a 200 and a list of all applications
    - Able to compound query: 
      id, type, amount_requested, status, product_id, farmer_id

- `/api/farms` 
  - GET (a, pg) - Returns a 200 and a list of all farms

- `/api/products` 
  - GET (a, pg) - Returns a 200 and a list of all products
  

## Notes

Overall I really enjoyed this exercise, it was good to stretch my JavaScript muscles, having been using Python for the last 9 months.

I added queriable data to JUST the GET /api/applications endpoint, as I wanted to show that I am able to do it, but didn't want to spend too much time repeating the same for the other GET endpoints.

With more time I would use the 'express-rate-limit' package to limit all requests.