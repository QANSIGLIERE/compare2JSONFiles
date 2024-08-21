# compare2JSONFiles

The library is based on the Javascript programming language and allows you to compare two different objects and get a
clear, detailed report of their differences.

## Author

https://www.youtube.com/@QANSIGLIERE/

## Installing

Using npm:

`npm i qansigliere-compare2jsons`

## Functions

`compare2JSONs` - the functions returns true or false value and other details will be printed in the console

## Example

### CommonJS

```
var { compare2JSONs } = require('../index.js');

console.log(compare2JSONs({ id: 1, name: 'iphone' }, { id: 1, name: 'android', version: 1 }, ['id']));
```

Output

```
            Expected result keys length: 2
            Actual result keys length: 3
            Difference in expected results keys:
            Difference in actual results keys: version


        Expected result: {"id":1,"name":"iphone"}
        Actual result: {"id":1,"name":"android","version":1}
        Error: The numbers of keys in actual result and expected result do not match!

        Parent Expected result: [object Object]
        Parent Actual result: [object Object]
        Type of parent expected result: object
        Type of parent actual result: object

Expected result: iphone
Actual result: android
Type of expected result: string
Type of actual result: string
Error: These two objects do not match to each other!
false

```

### ES Module

```
// ES Module

import { compare2JSONs } from "qansigliere-compare2jsons";

console.log(compare2JSONs({ id: 1, name: 'iphone' }, { id: 1, name: 'android', version: 1 }, ['id']));

```

Output

```
            Expected result keys length: 2
            Actual result keys length: 3
            Difference in expected results keys:
            Difference in actual results keys: version


        Expected result: {"id":1,"name":"iphone"}
        Actual result: {"id":1,"name":"android","version":1}
        Error: The numbers of keys in actual result and expected result do not match!

        Parent Expected result: [object Object]
        Parent Actual result: [object Object]
        Type of parent expected result: object
        Type of parent actual result: object

Expected result: iphone
Actual result: android
Type of expected result: string
Type of actual result: string
Error: These two objects do not match to each other!
false

```
