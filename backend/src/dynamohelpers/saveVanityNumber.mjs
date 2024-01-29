import { PutCommand } from '@aws-sdk/lib-dynamodb';

export const saveVanityNumbers = async (number, vanityList, dynamoClient) => {
    let command = new PutCommand({
        TableName: process.env.TABLE,
        Item: {
            phoneNumber: number,
            vanityNumbers: vanityList,
            timestamp: Math.floor(new Date().getTime())
        },
        ConditionExpression: 'attribute_not_exists(phoneNumber)', // do not overwrite existing entries, but shouldn't trigger since checkNumber() handles this
    });

    await dynamoClient.send(command);
};