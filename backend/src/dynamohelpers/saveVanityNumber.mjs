export const saveVanityNumbers = async (number, vanityList, dynamoClient) => {
    const params = {
        TableName: process.env.VANITY_NUMBERS,
        Item: {
            phone_number: number,
            vanity_numbers: vanityList,
        },
        ConditionExpression: 'attribute_not_exists(phone_number)', // do not overwrite existing entries, but shouldn't trigger since checkNumber() handles this
        ReturnConsumedCapacity: 'TOTAL',
    };

    await dynamoClient.put(params).promise();
};