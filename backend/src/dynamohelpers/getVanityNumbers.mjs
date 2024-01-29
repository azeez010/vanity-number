import {ddbDocClient} from "./getDynamoDocClient.mjs"
import { ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';


export const getLastFiveVanityNumbers = async (number) => {
    const params = {
        TableName: process.env.TABLE,
        ScanIndexForward: false,
        Limit: 5
    };

    const result = await ddbDocClient.send(new ScanCommand(params))

    try {
        console.log('Found vanity numbers in db: ' + result.Items);
        return result.Items;
    } catch (err) {
        return null;
    }
};

export const getVanityNumbers = async (number) => {
    const command = new GetCommand({
        TableName: process.env.TABLE,
        Key: {
            phoneNumber: number,
        },
    });


    const result = await ddbDocClient.send(command)
    try {
        console.log('Found vanity numbers in db: ' + result.Item["vanityNumbers"]);
        return result.Item["vanityNumbers"];
    } catch (err) {
        return null; //returns null if no vanity_numbers attribute exists
    }
};