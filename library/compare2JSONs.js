// Author https://www.youtube.com/@QANSIGLIERE/
// CommonJS

function convertJSONToString(jsonObject) {
    if (typeof jsonObject == 'object' && jsonObject != null && !Array.isArray(jsonObject)) {
        return JSON.stringify(jsonObject);
    } else {
        return jsonObject;
    }
}

function errorMessage(expectedValue, actualValue, errorMessage, parentExpectedResult, parentActualResult) {
    /////////////////
    // REFACTOR ME //
    /////////////////
    if (expectedValue != parentExpectedResult || actualValue != parentActualResult) {
        if (typeof actualValue == 'object' && typeof expectedValue == 'object') {
            console.log(`
                Parent Expected result: ${JSON.stringify(parentExpectedResult)}
                Parent Actual result: ${JSON.stringify(parentActualResult)}`);
        } else {
            console.log(`
        Parent Expected result: ${parentExpectedResult}
        Parent Actual result: ${parentActualResult}
        Type of parent expected result: ${typeof parentExpectedResult}
        Type of parent actual result: ${typeof parentActualResult}`);
        }
    }

    if (typeof actualValue == 'object' && typeof expectedValue == 'object') {
        let expectedValueKeysDiff = [];
        let actualValueKeysDiff = [];
        Object.keys(expectedValue)
            .sort()
            .forEach(x => {
                if (!Object.keys(actualValue).includes(x)) expectedValueKeysDiff.push(x);
            });
        Object.keys(actualValue)
            .sort()
            .forEach(x => {
                if (!Object.keys(expectedValue).includes(x)) actualValueKeysDiff.push(x);
            });

        console.log(`
            Expected result keys length: ${Object.keys(expectedValue).length}
            Actual result keys length: ${Object.keys(actualValue).length} 
            Difference in expected results keys: ${expectedValueKeysDiff}
            Difference in actual results keys: ${actualValueKeysDiff}
            `);

        console.log(`
        Expected result: ${JSON.stringify(expectedValue)}
        Actual result: ${JSON.stringify(actualValue)}
        Error: ${errorMessage}`);
    } else {
        console.log(`
Expected result: ${expectedValue}
Actual result: ${actualValue}
Type of expected result: ${typeof expectedValue}
Type of actual result: ${typeof actualValue}
Error: ${errorMessage}`);
    }

    if (Array.isArray(actualValue) && Array.isArray(expectedValue)) {
        let expectedValueDiff = [];
        let actualValueDiff = [];
        expectedValue.forEach(x => {
            if (!actualValue.includes(x)) expectedValueDiff.push(x);
        });
        actualValue.forEach(x => {
            if (!expectedValue.includes(x)) actualValueDiff.push(x);
        });

        console.log(`
Expected result length: ${expectedValue.length}
Actual result length: ${actualValue.length} 
Difference in expected results: ${expectedValueDiff}
Difference in actual results: ${actualValueDiff}
`);
    }
}

// The function will return true or false state + print detailed report in the log
function compare2JSONs(
    expectedResult,
    actualResult,
    uniquenessJSONKeys = [],
    parentExpectedResult = expectedResult,
    parentActualResult = actualResult,
) {
    ///////////////////////////////////////
    // Make a default state for the flag //
    ///////////////////////////////////////
    let areTheySame = true;
    // Ensure we compare the same types of data
    if (typeof expectedResult != typeof actualResult) {
        // Change the flag
        areTheySame = false;
        // Warnign message
        errorMessage(
            expectedResult,
            actualResult,
            'These two objects have different types of data!',
            parentExpectedResult,
            parentActualResult,
        );
    } else {
        if (
            typeof actualResult == 'undefined' ||
            typeof actualResult == 'number' ||
            typeof actualResult == 'string' ||
            typeof actualResult == 'boolean'
        ) {
            if (actualResult != expectedResult) {
                // Change the flag
                areTheySame = false;
                // Warnign message
                errorMessage(
                    expectedResult,
                    actualResult,
                    'These two objects do not match to each other!',
                    parentExpectedResult,
                    parentActualResult,
                );
            }
        } else if (typeof actualResult == 'object') {
            //////////
            // NULL //
            //////////
            if (actualResult == null && actualResult != expectedResult) {
                // Change the flag
                areTheySame = false;
                // Warnign message
                errorMessage(
                    expectedResult,
                    actualResult,
                    'These two null do not match to each other!',
                    parentExpectedResult,
                    parentActualResult,
                );
            }

            //////////
            // JSON //
            //////////
            if (!Array.isArray(actualResult) && actualResult != null) {
                //////////////////////////////////////////
                // If the expected result is not a JSON //
                //////////////////////////////////////////
                if (Array.isArray(expectedResult)) {
                    // Change the flag
                    areTheySame = false;
                    // Warnign message
                    errorMessage(
                        expectedResult,
                        actualResult,
                        'Expected result is not a JSON!',
                        parentExpectedResult,
                        parentActualResult,
                    );
                }

                /////////////////////////////////////
                // Compare the number of JSON keys //
                /////////////////////////////////////
                if (Object.keys(actualResult).length != Object.keys(expectedResult).length) {
                    // Change the flag
                    areTheySame = false;
                    // Warnign message
                    errorMessage(
                        expectedResult,
                        actualResult,
                        'The numbers of keys in actual result and expected result do not match!',
                        parentExpectedResult,
                        parentActualResult,
                    );
                }

                ////////////////////////
                // Compare JSONs keys //
                ////////////////////////
                let actualResultSortedKeys = Object.keys(actualResult).sort();
                let expectedResultSortedKeys = Object.keys(expectedResult).sort();

                //
                let matchingKeysFromActualToExpected = [];
                actualResultSortedKeys.forEach(x => {
                    if (expectedResultSortedKeys.includes(x)) matchingKeysFromActualToExpected.push(x);
                });

                matchingKeysFromActualToExpected.forEach(x => {
                    if (
                        !compare2JSONs(
                            expectedResult[x],
                            actualResult[x],
                            uniquenessJSONKeys,
                            expectedResult,
                            actualResult,
                        )
                    )
                        areTheySame = false;
                });
            }

            ///////////
            // Array //
            ///////////

            if (Array.isArray(actualResult)) {
                // If the expected result is not an Array
                if (!Array.isArray(expectedResult)) {
                    // Change the flag
                    areTheySame = false;
                    // Warnign message
                    errorMessage(
                        expectedResult,
                        actualResult,
                        'Expected result is not an array!',
                        parentExpectedResult,
                        parentActualResult,
                    );
                } else {
                    // Arrays have different length
                    if (actualResult.length != expectedResult.length) {
                        // Change the flag
                        areTheySame = false;
                        // Warnign message
                        errorMessage(
                            expectedResult,
                            actualResult,
                            'These two arrays have different length!',
                            parentExpectedResult,
                            parentActualResult,
                        );
                    }

                    // Compare items from arrays
                    let actualResultSorted = actualResult.sort();
                    let expectedResultSorted = expectedResult.sort();

                    if (actualResultSorted.length > 0) {
                        // Validate uniquenessJSONKeys value
                        if (!Array.isArray(uniquenessJSONKeys))
                            console.log(`
uniquenessJSONKeys has a wrong type. It should be an array
Typeof uniquenessJSONKeys: ${typeof uniquenessJSONKeys}
uniquenessJSONKeys: ${uniquenessJSONKeys}`);

                        for (let index = 0; index < actualResultSorted.length; index++) {
                            if (
                                typeof actualResultSorted[index] == 'object' &&
                                !Array.isArray(actualResultSorted[index])
                            ) {
                                if (uniquenessJSONKeys.length > 0) {
                                    let arrayWithExistingUniquenessKeys = uniquenessJSONKeys.filter(key =>
                                        Object.keys(actualResultSorted[index]).includes(key),
                                    );
                                    if (arrayWithExistingUniquenessKeys.length > 0) {
                                        let uniquenessKey = arrayWithExistingUniquenessKeys[0];
                                        let foundSimilarItem = false;
                                        expectedResultSorted.forEach(x => {
                                            if (x[uniquenessKey] == actualResultSorted[index][uniquenessKey]) {
                                                foundSimilarItem = true;
                                                console.log(
                                                    `${JSON.stringify(x)} VS ${JSON.stringify(
                                                        actualResultSorted[index],
                                                    )}`,
                                                ); // Remove me
                                                if (
                                                    !compare2JSONs(
                                                        x,
                                                        actualResultSorted[index],
                                                        uniquenessJSONKeys,
                                                        expectedResult,
                                                        actualResult,
                                                    )
                                                )
                                                    areTheySame = false;
                                            }
                                            if (!foundSimilarItem) {
                                                // Change the flag
                                                areTheySame = false;
                                                // Warnign message
                                                errorMessage(
                                                    expectedResultSorted,
                                                    actualResultSorted,
                                                    'Did not found any similar item by suggested uniquenessJSONKeys key',
                                                    parentExpectedResult,
                                                    parentActualResult,
                                                );
                                            }
                                        });
                                    } else {
                                        console.log(`
Warning! Suggested keys in uniquenessJSONKeys are not acceptable
uniquenessJSONKeys: ${uniquenessJSONKeys}`);
                                    }
                                } else {
                                    console.log(`
Warning! uniquenessJSONKeys has no items
uniquenessJSONKeys: ${uniquenessJSONKeys}`);
                                }
                            } else {
                                // Compare non-object items
                                if (
                                    !compare2JSONs(
                                        expectedResultSorted[index],
                                        actualResultSorted[index],
                                        uniquenessJSONKeys,
                                        expectedResult,
                                        actualResult,
                                    )
                                )
                                    areTheySame = false;
                            }
                        }
                    }
                }
            }
        } else {
            // Change the flag
            areTheySame = false;
            // Warnign message
            errorMessage(
                expectedResult,
                actualResult,
                'These types of data are not supported yet!',
                parentExpectedResult,
                parentActualResult,
            );
        }
    }

    return areTheySame;
}

module.exports.compare2JSONs = compare2JSONs;
