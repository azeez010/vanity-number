// Import getVanityNumberHandler function from get-vanity-number.mjs
import { getVanityNumberHandler } from '../../../src/handlers/get-vanity-number.mjs';
// Import dynamodb from aws-sdk 
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
 
// This includes all tests for getVanityNumberHandler()
describe('Test getVanityNumberHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    // This test invokes getVanityNumberHandler() and compare the result
    it('should get item by id', async () => { 
        const item = { id: 'id1' }; 
 
        // Return the specified value whenever the spied get function is called 
        ddbMock.on(GetCommand).resolves({
            Item: item,
        }); 
 
        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                phoneNumber: 'id1'
            } 
        };
 
        // Invoke getVanityNumberHandler()
        const result = await getVanityNumberHandler(event);
 
        const expectedResult = { 
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }, 
            body: JSON.stringify(item) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 