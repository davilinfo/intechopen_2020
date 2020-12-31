Example of use to sign and broadcast transaction:
node dish_commands/request_refund.js | tee >(curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions)
