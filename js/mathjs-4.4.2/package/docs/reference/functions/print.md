<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function print

Interpolate values into a string template.


## Syntax

```js
math.print(template, values)
math.print(template, values, precision)
math.print(template, values, options)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`template` | string | A string containing variable placeholders.
`values` | Object &#124; Array &#124; Matrix | An object or array containing variables which will be filled in in the template.
`options` | number &#124; Object | Formatting options, or the number of digits to format numbers. See function math.format for a description of all options.

### Returns

Type | Description
---- | -----------
string | Interpolated string


## Examples

```js
// the following outputs: 'Lucy is 5 years old'
math.print('Lucy is $age years old', {age: 5});

// the following outputs: 'The value of pi is 3.141592654'
math.print('The value of pi is $pi', {pi: math.pi}, 10);

// the following outputs: 'hello Mary! The date is 2013-03-23'
math.print('Hello $user.name! The date is $date', {
  user: {
    name: 'Mary',
  },
  date: new Date(2013, 2, 23).toISOString().substring(0, 10)
});

// the following outputs: 'My favorite fruits are apples and bananas !'
math.print('My favorite fruits are $0 and $1 !', [
  'apples',
  'bananas'
]);
```


## See also

[format](format.md)