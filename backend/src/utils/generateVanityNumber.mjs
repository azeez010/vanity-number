import { readFileSync } from "fs";
import {  wordsListPath } from "word-list";
import { Sentiment } from "sentiment";

import { getVanityNumbers } from "../dynamohelpers/getVanityNumbers.mjs"

// Use the 'word-list' library for a simple English word list
const englishWords = readFileSync(wordsListPath, 'utf8').split('\n');

export async function generateMeaningfulVanityNumbers(phoneNumber, dynamoClient, rangeStart = 3, rangeEnd = 6, sentimentCheck=false) {
    let vanityList = await getVanityNumbers(phoneNumber);

    if (vanityList) {
        //if the vanityList is already in the database, return it
        return vanityList;
    }

    const keypadMapping = {
        '0': '0',
        '1': '1',
        '2': 'ABC',
        '3': 'DEF',
        '4': 'GHI',
        '5': 'JKL',
        '6': 'MNO',
        '7': 'PQRS',
        '8': 'TUV',
        '9': 'WXYZ'
    };

    const sentiment = new Sentiment();

    function backtrack(current, remainingDigits) {
        if (!remainingDigits.length) {
            return [current];
        }

        const results = [];
        const currentDigit = remainingDigits[0];

        for (const letter of keypadMapping[currentDigit]) {
            results.push(...backtrack(current + letter, remainingDigits.slice(1)));
        }

        return results;
    }

    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
        return [];
    }

    const meaningfulVanityNumbers = [];

    for (let sliceLength = rangeStart; sliceLength <= rangeEnd; sliceLength++) {
        const lastDigits = phoneNumber.slice(-sliceLength);
        const vanityNumberCandidates = new Set(backtrack('', lastDigits));

        // Filter candidates to select meaningful words
        for (const candidate of Array.from(vanityNumberCandidates)) {
            if (englishWords.includes(candidate.toLowerCase())) {
                if(sentimentCheck)
                {
                    let score = sentiment.analyze(candidate)
                    if(score >= 1){
                        meaningfulVanityNumbers.push(candidate);
                    }
                } else {
                    meaningfulVanityNumbers.push(candidate)
                }
            }
        }
    }

    return meaningfulVanityNumbers;
}
