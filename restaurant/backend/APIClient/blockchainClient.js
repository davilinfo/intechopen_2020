const { APIClient } = require ("@liskhq/lisk-api-client");
const { nodes } = require ("../config/config.json");

const client = new APIClient(nodes);

module.exports = client;

