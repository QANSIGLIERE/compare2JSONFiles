# compare2JSONFiles

The library is based on the Javascript programming language and allows you to compare two different objects and get a
clear, detailed report of their differences.

## Author

https://www.youtube.com/@QANSIGLIERE/

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/gYegROgTqNg/0.jpg)](https://www.youtube.com/watch?v=gYegROgTqNg)

## Installing

Using npm:

`npm i qansigliere-compare2jsons`

## Functions

`compare2JSONs` - the functions returns true or false value and other details will be printed in the console

## Example

### CommonJS

```
var { compare2JSONs } = require('qansigliere-compare2jsons');

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

Parent Expected result: {"id":1,"name":"iphone"}
Parent Actual result: {"id":1,"name":"android","version":1}


Expected result: iphone
Actual result: android
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

Parent Expected result: {"id":1,"name":"iphone"}
Parent Actual result: {"id":1,"name":"android","version":1}


Expected result: iphone
Actual result: android
Error: These two objects do not match to each other!
false
```

## Improvements and Suggestions

https://forms.gle/6TXrAAoGvPX5kgjt8
