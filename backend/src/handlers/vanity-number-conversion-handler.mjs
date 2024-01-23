// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
// import * as AWS from 'aws-sdk';
// import { DynamoDB } from 'aws-sdk';


import { getVanityNumbers } from "../dynamohelpers/getVanityNumbers.mjs"
import { saveVanityNumbers } from "../dynamohelpers/saveVanityNumber.mjs"

import { generateMeaningfulVanityNumbers } from "../utils/generateVanityNumber.mjs"

export const vanityNumberConversionHandler = async (event, context, callback) => {
    // AWS.config.update({ region: process.env.AWS_REGION });

    const dynamoClient = new AWS.DynamoDB.DocumentClient();

    try {
        const number = event['Details']['ContactData']['CustomerEndpoint']['Address']; // getting phone number passed by Connect

        const vanityList = await generateMeaningfulVanityNumbers(number, dynamoClient);

        console.log('Generated vanity numbers! Saving to db: ' + vanityList);
        await saveVanityNumbers(number, vanityList, dynamoClient);

        const result  = {};

        const finalVanityList = vanityList.slice(-3); // taking the last three (or fewer) elements of the array to return to Connect

        for (let i = 0; i < finalVanityList.length; i++) {
            result['number' + i] = finalVanityList[i].replace(/(.)/g, '$&, ');
        }

        callback(null, result);

        const status = 'Success!';
        console.log(status);
        return status;
    } catch (err) {
        const status = 'Failure!';
        console.log(status);
        console.log(err);
        callback(err);
        return status;
    }
}
