export const saveVanityNumbers = async (number, vanityList, dynamoClient) => {
    const params = {
        TableName: process.env.TABLE,
        Item: {
            phoneNumber: number,
            vanity_numbers: vanityList,
        },
        ConditionExpression: 'attribute_not_exists(phoneNumber)', // do not overwrite existing entries, but shouldn't trigger since checkNumber() handles this
        ReturnConsumedCapacity: 'TOTAL',
    };

    await dynamoClient.put(params).promise();
};