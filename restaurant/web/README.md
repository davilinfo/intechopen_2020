Frontend and web site of Luxury restaurant of restaurant sidechain

/*Let's configure it. Open the src folder and then open the services folder. Open the api.js file. If you didn't change in the backend the port number of it, then you can just close this file. It is the base url to connect on the backend. Otherwise, specify the host and port number of backend chaging the line baseURL : 'http://localhost:3333'*/

/*Go back to the web folder and run*/
npm ci

/*Run the web site in development mode*/
npm start

/*Run the web site in production mode. It will suggest you to install serve, probably. Configure it and run the serve*/
npm run build

/*Access the web site on the specified host, port and enjoy the restaurant PoC*/



/*After have sidechain, backend and web site running and tested you can start this step*/

/*If you didn't configure the menu items of the restaurant yet then the next is to Configure new food types inside luxury restaurant
running a dish command to include all the menu items of your restaurant from inside of restaurant_sidechains folder. Change the file menu_transaction_request.js properly and then run the following command from the restaurant_sidechain folder:*/ 
node dish_commands/menu_transaction_request.js | tee >(curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions)

/*this command will create a transaction and broadcast it into de restaurant sidechain, after confirmed the website of the restauraunt will have all menu items described in the MenuTransaction*/
