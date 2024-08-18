// Author https://www.youtube.com/@QANSIGLIERE/
// CommonJS

function errorMessage(expectedValue, actualValue, errorMessage, parentExpectedResult, parentActualResult) {
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
    // Make a default state for the flag
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
            // NULL
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
            // JSON
            if (!Array.isArray(actualResult)) {
                // If the expected result is not a JSON
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
            }
            // Array
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
                    // Sort arrays
                    // Length, Items
                    let sortedActualResult = actualResult.sort();
                    let sortedExpectedResults = expectedResult.sort();

                    // Arrays have different length
                    if (sortedActualResult.length != sortedExpectedResults.length) {
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
                    if (sortedActualResult.length > 0) {
                        for (let index = 0; index < sortedActualResult.length; index++) {
                            if (sortedActualResult[index] != sortedExpectedResults[index]) {
                                // Change the flag
                                areTheySame = false;
                                // Warnign message
                                errorMessage(
                                    sortedActualResult[index],
                                    sortedExpectedResults[index],
                                    'These two arrays have different items!',
                                    parentExpectedResult,
                                    parentActualResult,
                                );
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

    return areTheySame; //
}

module.exports.compare2JSONs = compare2JSONs;
