import {ddbDocClient} from "./getDynamoDocClient.mjs"
import { GetCommand } from '@aws-sdk/lib-dynamodb';


export const getLastFiveVanityNumbers = async (number) => {
    const params = {
        TableName: process.env.VANITY_NUMBERS,
        Key: {
            phone_number: number,
        },
    };

    const result = await ddbDocClient.send(new GetCommand(params))
    // await dynamoClient.get(params).promise();

    try {
        console.log('Found vanity numbers in db: ' + result.Item['vanity_numbers']);
        return result.Item['vanity_numbers'];
    } catch (err) {
        return null; //returns null if no vanity_numbers attribute exists
    }
};

export const getVanityNumbers = async (number) => {
    const params = {
        TableName: process.env.VANITY_NUMBERS,
        Key: {
            phone_number: number,
        },
    };

    const result = await ddbDocClient.send(new GetCommand(params))
        // await dynamoClient.get(params).promise();

    try {
        console.log('Found vanity numbers in db: ' + result.Item['vanity_numbers']);
        return result.Item['vanity_numbers'];
    } catch (err) {
        return null; //returns null if no vanity_numbers attribute exists
    }
};