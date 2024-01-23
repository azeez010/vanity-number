import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';


//DynamoDB Endpoint
const ENDPOINT_OVERRIDE = process.env.ENDPOINT_OVERRIDE;
let ddbClient = undefined;

if(ENDPOINT_OVERRIDE){
    ddbClient = new DynamoDBClient({ endpoint: ENDPOINT_OVERRIDE });
}
else{

    ddbClient = new DynamoDBClient({});    // Use default values for DynamoDB endpoint
    console.warn("No value for ENDPOINT_OVERRIDE provided for DynamoDB, using default");
}

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
