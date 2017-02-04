function assertEquals (message, expected, actual) {
  try {
    deepEquals(expected, actual);
  }
  catch (failure) {
    throw (`${message} ${failure.message}`);   
  }
};

function deepEquals (a, b, trace='') {
  let typeA = getType(a), typeB = getType(b);
  
  if (typeA === 'undefined' && typeB !== 'undefined')
    throw {message: `Found ${trace}, none expected`};
    
  if (typeB === 'undefined' && typeA !== 'undefined')
    throw {message: `Expected ${trace}, but was not found`};
    
  if (typeA !== typeB)
    throw {message: `Expected type ${getType(a)}, but found type ${getType(b)}`};

  if (typeof a !== 'object' && a !== b)
    throw {message: `Expected ${trace ? trace + " " : ""}${JSON.stringify(a)}, but found ${JSON.stringify(b)}`};

  if (typeA === 'array' && a.length !== b.length)
    throw {message: `Expected array length ${a.length}, but found ${b.length}`};

  if (typeof a === 'object')
    ([...Object.keys(a), ...Object.keys(b)]).forEach(
      key => deepEquals(a[key], b[key], `${trace}${buildTrace(a, key)}`)
    );
};

function getType(x) {
  if (x === null)
    return 'null';
  if (x instanceof Array)
    return 'array';
  return typeof x;
};

function buildTrace (element, key) {
  if (element instanceof Array)
    return `[${key}]`
  else
    return `.${key}`
};

module.exports = assertEquals;
