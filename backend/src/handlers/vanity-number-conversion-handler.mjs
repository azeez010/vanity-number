import {ddbDocClient} from "../dynamohelpers/getDynamoDocClient.mjs"
import { generateMeaningfulVanityNumbers } from "../utils/generateVanityNumber.mjs"


export const vanityNumberConversionHandler = async (event, context, callback) => {
    try {
        const number = event['Details']['ContactData']['CustomerEndpoint']['Address']; // getting phone number passed by Connect
        const vanityList = await generateMeaningfulVanityNumbers(number, ddbDocClient);
        console.log('Generated vanity numbers,  ' + vanityList);

        let result= {};

        let finalVanityList = vanityList.slice(-3); // taking the last three (or fewer) elements of the array to return to Connect

        for (let i = 0; i < finalVanityList.length; i++) {
            result['number' + i] = finalVanityList[i].replace(/(.)/g, '$&, ');
        }
        callback(null, result);
        return 'Success!';
    } catch (err) {
        callback(err);
        return 'Failure!';
    }
}
