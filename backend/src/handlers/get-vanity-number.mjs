// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { getLastFiveVanityNumbers } from "../dynamohelpers/getVanityNumbers.mjs"

export const getVanityNumberHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
  let lastFiveCallersVanityNumber = await getLastFiveVanityNumbers();
 
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*", //DO NOT USE THIS VALUE IN PRODUCTION - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
    body: JSON.stringify(lastFiveCallersVanityNumber)
  };
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
