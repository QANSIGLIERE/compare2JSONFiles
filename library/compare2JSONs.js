// Author https://www.youtube.com/@QANSIGLIERE/
// CommonJS

function areIdentical(actualValue, expectedValue) {
    let actualValueKeys = Object.keys(actualValue);
    let expectedValueKeys = Object.keys(expectedValue);

    if (actualValueKeys.length != expectedValueKeys.length) {
        return 0;
    } else {
        let result = 0;
        actualValueKeys.forEach(x => {
            if (actualValue[x] == expectedValue[x]) result += (1 / actualValueKeys.length) * 100;
        });

        return result;
    }
}

function errorMessage(
    expectedValue,
    actualValue,
    errorMessage,
    parentExpectedResult,
    parentActualResult,
    showParentObjects = true,
) {
    let prefix = '### Error ###';

    ///////////////////////////////////////
    // Provide info about parent objects //
    ///////////////////////////////////////
    if ((expectedValue != parentExpectedResult || actualValue != parentActualResult) && showParentObjects) {
        console.log(`
${prefix}
Parent Expected result: ${
            typeof parentExpectedResult == 'object' ? JSON.stringify(parentExpectedResult) : parentExpectedResult
        }
Parent Actual result: ${typeof parentActualResult == 'object' ? JSON.stringify(parentActualResult) : parentActualResult}
\n`);
    }

    ///////////////////////////////////////
    // Objects should have the same type //
    ///////////////////////////////////////
    if (typeof expectedValue != typeof actualValue) {
        console.log(`
${prefix}
Typeof Expected result: ${typeof expectedValue}
Typeof Actual result: ${typeof actualValue}
\n`);
    }

    ////////////
    // Object //
    ////////////
    if (
        typeof actualValue == 'object' &&
        typeof expectedValue == 'object' &&
        !isArray(actualValue) &&
        !isArray(expectedValue)
    ) {
        let expectedValueKeysDiff = [];
        let actualValueKeysDiff = [];
        keys(expectedValue)
            .sort()
            .forEach(x => {
                if (!keys(actualValue).includes(x)) expectedValueKeysDiff.push(x);
            });
        keys(actualValue)
            .sort()
            .forEach(x => {
                if (!keys(expectedValue).includes(x)) actualValueKeysDiff.push(x);
            });

        console.log(`
${prefix}
Expected result keys length: ${keys(expectedValue).length}
Actual result keys length: ${keys(actualValue).length} 
Difference in expected results keys: ${expectedValueKeysDiff}
Difference in actual results keys: ${actualValueKeysDiff}
\n`);
    }

    ///////////
    // Array //
    ///////////
    if (isArray(actualValue) && isArray(expectedValue)) {
        let expectedValueDiff = [];
        let actualValueDiff = [];
        expectedValue.forEach(x => {
            if (!(actualValue.filter(y => areIdentical(y, x) > 99).length > 0 ? true : false))
                expectedValueDiff.push(x);
        });
        actualValue.forEach(x => {
            if (!(expectedValue.filter(y => areIdentical(y, x) > 99).length > 0 ? true : false))
                actualValueDiff.push(x);
        });

        console.log(`
${prefix}
Expected result length: ${expectedValue.length}
Actual result length: ${actualValue.length} 
Difference in expected results: ${
            typeof expectedValueDiff == 'object' ? JSON.stringify(expectedValueDiff) : expectedValueDiff
        }
Difference in actual results: ${typeof actualValueDiff == 'object' ? JSON.stringify(actualValueDiff) : actualValueDiff}
\n`);
    }

    ///////////////////
    // Error Message //
    ///////////////////
    console.log(`
${prefix}
Expected result: ${typeof expectedValue == 'object' ? JSON.stringify(expectedValue) : expectedValue}
Actual result: ${typeof actualValue == 'object' ? JSON.stringify(actualValue) : actualValue}
${errorMessage}
\n`);
}

function errorMessageUniquenessJSONKeys(uniquenessJSONKeys, errorMessage, suggestedKeys = '', showMessage = true) {
    if (showMessage)
        console.log(`
${errorMessage}
uniquenessJSONKeys: ${uniquenessJSONKeys}`);

    if (!Array.isArray(uniquenessJSONKeys) && showMessage)
        console.log(`
Typeof uniquenessJSONKeys: ${typeof uniquenessJSONKeys}`);

    if (suggestedKeys && showMessage) {
        console.log(`
You could use one of the following keys ${suggestedKeys}`);
    }
}

function isNull(value) {
    return value == null ? true : false;
}

function isArray(value) {
    return Array.isArray(value) ? true : false;
}

function keys(value) {
    return Object.keys(value);
}

// The function will return true or false state + print detailed report in the log
function compare2JSONs(
    expectedResult,
    actualResult,
    uniquenessJSONKeys = [],
    parentExpectedResult = expectedResult,
    parentActualResult = actualResult,
    showParentObjects = true,
) {
    ///////////////////////////////////////
    // Make a default state for the flag //
    ///////////////////////////////////////
    let areTheySame = true;

    ///////////////////////////////////
    // Filter non-comparable objects //
    ///////////////////////////////////
    if (typeof actualResult != typeof expectedResult) {
        //////////////////////////////////////////////////
        // Change the flag and provide an error message //
        //////////////////////////////////////////////////
        areTheySame = false;
        errorMessage(
            expectedResult,
            actualResult,
            'Objects have different typeof values',
            parentExpectedResult,
            parentActualResult,
            showParentObjects,
        );
        showParentObjects = false;

        //////////////////////
        // NULL VS NON-NULL //
        //////////////////////
    } else if (isNull(actualResult) != isNull(expectedResult)) {
        //////////////////////////////////////////////////
        // Change the flag and provide an error message //
        //////////////////////////////////////////////////
        areTheySame = false;
        errorMessage(
            expectedResult,
            actualResult,
            'One of the objects is not null',
            parentExpectedResult,
            parentActualResult,
            showParentObjects,
        );
        showParentObjects = false;
        ////////////////////////
        // Array VS NON-Array //
        ////////////////////////
    } else if (isArray(actualResult) != isArray(expectedResult)) {
        //////////////////////////////////////////////////
        // Change the flag and provide an error message //
        //////////////////////////////////////////////////
        areTheySame = false;
        errorMessage(
            expectedResult,
            actualResult,
            'One of the objects is not an array',
            parentExpectedResult,
            parentActualResult,
            showParentObjects,
        );
        showParentObjects = false;
    } else if (!isNull(actualResult)) {
        //////////////////////////////////////////////
        // Undefined || Number || String || Boolean //
        //////////////////////////////////////////////
        if (
            typeof actualResult == 'undefined' ||
            typeof actualResult == 'number' ||
            typeof actualResult == 'string' ||
            typeof actualResult == 'boolean'
        ) {
            if (actualResult != expectedResult) {
                //////////////////////////////////////////////////
                // Change the flag and provide an error message //
                //////////////////////////////////////////////////
                areTheySame = false;
                errorMessage(
                    expectedResult,
                    actualResult,
                    'These two objects have different values',
                    parentExpectedResult,
                    parentActualResult,
                    showParentObjects,
                );
                showParentObjects = false;
            }
        } else if (typeof actualResult == 'object' && !isNull(actualResult)) {
            //////////
            // JSON //
            //////////
            if (!isArray(actualResult)) {
                /////////////////////////////////////
                // Compare the number of JSON keys //
                /////////////////////////////////////
                if (keys(actualResult).length != keys(expectedResult).length) {
                    //////////////////////////////////////////////////
                    // Change the flag and provide an error message //
                    //////////////////////////////////////////////////
                    areTheySame = false;
                    errorMessage(
                        expectedResult,
                        actualResult,
                        'The numbers of keys in actual result and expected result do not match!',
                        parentExpectedResult,
                        parentActualResult,
                        showParentObjects,
                    );
                    showParentObjects = false;
                }

                ////////////////////////
                // Compare JSONs keys //
                ////////////////////////
                if (keys(actualResult).length > 0 && keys(expectedResult).length > 0) {
                    let actualResultSortedKeys = keys(actualResult).sort();
                    let expectedResultSortedKeys = keys(expectedResult).sort();

                    let matchingKeysFromActualToExpected = [];

                    actualResultSortedKeys.forEach(x => {
                        if (expectedResultSortedKeys.includes(x)) matchingKeysFromActualToExpected.push(x);
                    });

                    matchingKeysFromActualToExpected.forEach(x => {
                        //////////////////////////////////////////////////
                        // Change the flag and provide an error message //
                        //////////////////////////////////////////////////
                        if (
                            !compare2JSONs(
                                expectedResult[x],
                                actualResult[x],
                                uniquenessJSONKeys,
                                expectedResult,
                                actualResult,
                                showParentObjects,
                            )
                        ) {
                            areTheySame = false;
                            showParentObjects = false;
                        }
                    });
                }
            }

            ///////////
            // Array //
            ///////////
            if (isArray(actualResult)) {
                // Arrays have different length
                if (actualResult.length != expectedResult.length) {
                    //////////////////////////////////////////////////
                    // Change the flag and provide an error message //
                    //////////////////////////////////////////////////
                    areTheySame = false;
                    errorMessage(
                        expectedResult,
                        actualResult,
                        'These two arrays have different length!',
                        parentExpectedResult,
                        parentActualResult,
                        showParentObjects,
                    );
                    showParentObjects = false;
                }

                if (
                    actualResult.length > 0 &&
                    expectedResult.length > 0 &&
                    JSON.stringify(actualResult) != JSON.stringify(expectedResult)
                ) {
                    // Compare items from arrays
                    let actualResultSorted = actualResult.sort();
                    let expectedResultSorted = expectedResult.sort();

                    /////////////////////////////////////
                    // Check each item in actual array //
                    /////////////////////////////////////
                    let showUniquenessJSONKeysError = true;
                    for (
                        let index = 0;
                        index < Math.min(actualResultSorted.length, expectedResultSorted.length);
                        index++
                    ) {
                        let actualItem = actualResultSorted[index];

                        if (typeof actualItem == 'object' && !isArray(actualItem) && !isNull(actualItem)) {
                            /////////////////////////////////////////////
                            // Validate uniquenessJSONKeys is an array //
                            /////////////////////////////////////////////
                            if (!isArray(uniquenessJSONKeys)) {
                                errorMessageUniquenessJSONKeys(
                                    uniquenessJSONKeys,
                                    'uniquenessJSONKeys has a wrong type. It should be an array',
                                    '',
                                    showUniquenessJSONKeysError,
                                );
                                showUniquenessJSONKeysError = false;
                            }

                            if (uniquenessJSONKeys.length == 0) {
                                errorMessageUniquenessJSONKeys(
                                    uniquenessJSONKeys,
                                    "Warning! uniquenessJSONKeys array doesn't have any item",
                                    '',
                                    showUniquenessJSONKeysError,
                                );
                                showUniquenessJSONKeysError = false;
                            } else {
                                let arrayWithExistingUniquenessKeys = uniquenessJSONKeys.filter(x =>
                                    keys(actualItem).includes(x),
                                );

                                if (arrayWithExistingUniquenessKeys.length > 0) {
                                    let uniquenessKey = arrayWithExistingUniquenessKeys[0];
                                    let foundSimilarItem = false;
                                    expectedResultSorted.forEach(x => {
                                        if (x[uniquenessKey] == actualItem[uniquenessKey]) {
                                            foundSimilarItem = true;
                                            //////////////////////////////////////////////////
                                            // Change the flag and provide an error message //
                                            //////////////////////////////////////////////////
                                            if (
                                                !compare2JSONs(
                                                    x,
                                                    actualItem,
                                                    uniquenessJSONKeys,
                                                    expectedResult,
                                                    actualResult,
                                                    showParentObjects,
                                                )
                                            ) {
                                                areTheySame = false;
                                                showParentObjects = false;
                                            }
                                        }
                                    });
                                    if (!foundSimilarItem) {
                                        //////////////////////////////////////////////////
                                        // Change the flag and provide an error message //
                                        //////////////////////////////////////////////////
                                        areTheySame = false;
                                        errorMessage(
                                            expectedResultSorted,
                                            actualItem,
                                            `Did not find any similar item by suggested uniquenessJSONKeys key --${uniquenessKey}--`,
                                            parentExpectedResult,
                                            parentActualResult,
                                            showParentObjects,
                                        );
                                        showParentObjects = false;
                                    }
                                } else
                                    errorMessageUniquenessJSONKeys(
                                        uniquenessJSONKeys,
                                        'Warning! Suggested keys from uniquenessJSONKeys are not acceptable',
                                        keys(actualItem),
                                        showUniquenessJSONKeysError,
                                    );
                                showUniquenessJSONKeysError = false;
                            }
                        } else {
                            //////////////////////////////////////////////////
                            // Change the flag and provide an error message //
                            //////////////////////////////////////////////////
                            if (
                                !compare2JSONs(
                                    expectedResultSorted[index],
                                    actualResultSorted[index],
                                    uniquenessJSONKeys,
                                    expectedResult,
                                    actualResult,
                                    showParentObjects,
                                )
                            ) {
                                areTheySame = false;
                                showParentObjects = false;
                            }
                        }
                    }
                }
            }
        } else {
            // Change the flag
            areTheySame = false;
            errorMessage(
                expectedResult,
                actualResult,
                'These types of data are not supported yet!',
                parentExpectedResult,
                parentActualResult,
                showParentObjects,
            );
            showParentObjects = false;
        }
    }

    return areTheySame;
}

module.exports.compare2JSONs = compare2JSONs;
