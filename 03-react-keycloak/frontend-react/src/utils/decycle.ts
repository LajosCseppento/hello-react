/*
This utility is based on cycle.js, only contains decycle in TS, but with Error support. Original notice below.

This is an overkill for solving a problem 99.99% will never happen. But nice practice for me to convert from JS to TS.
*/

/*
 cycle.js
 2015-02-25

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.
 */

export function decycle(object: unknown): unknown {
  const objects: unknown[] = []; // Keep a reference to each unique object or array
  const paths: string[] = []; // Keep the path to each unique object or array

  return (function derez(value: unknown, path: string): unknown {
    // The derez recurses through the object, producing the deep copy.

    let i, // The loop counter
      name; // Property name

    const _value: unknown =
      // typeof null === 'object', so go on if this value is really an object but not
      // one of the weird builtin objects.
      value &&
      typeof value === 'object' &&
      'toJSON' in value &&
      value.toJSON instanceof Function
        ? value.toJSON()
        : value;

    if (typeof _value === 'object' && _value !== null) {
      // If the value is an object or array, look to see if we have already
      // encountered it. If so, return a $ref/path object. This is a hard way,
      // linear search that will get slower as the number of unique objects grows.

      for (i = 0; i < objects.length; i += 1) {
        if (objects[i] === _value) {
          return {$ref: paths[i]};
        }
      }

      // Otherwise, accumulate the unique value and its path.

      objects.push(_value);
      paths.push(path);

      // If it is an array, replicate the array.

      if (Object.prototype.toString.apply(_value) === '[object Array]') {
        const _valueArray = _value as unknown[];
        const nu = [];
        for (i = 0; i < _valueArray.length; i += 1) {
          nu[i] = derez(_valueArray[i], path + '[' + i + ']');
        }
        return nu;
      } else if (_value instanceof Error) {
        // Fingers crossed that no one generated a circular error
        return _value;
      } else {
        // If it is an object, replicate the object.
        const _valueObject = _value as {[key: string]: unknown};

        const nu: {[key: string]: unknown} = {};
        for (name in _valueObject) {
          if (Object.prototype.hasOwnProperty.call(_value, name)) {
            nu[name] = derez(
              _valueObject[name],
              path + '[' + JSON.stringify(name) + ']'
            );
          }
        }
        return nu;
      }
    }
    return _value;
  })(object, '$');
}
