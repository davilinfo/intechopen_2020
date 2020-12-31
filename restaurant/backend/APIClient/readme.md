//how to connect to mainnet

import { APIClient } from '@liskhq/lisk-api-client';
const client = APIClient.createMainnetAPIClient();

//how to search data fields on transaction
const result = await client.transactions.get({data: '%hero%'});