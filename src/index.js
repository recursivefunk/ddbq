const required = ['table'];

function queryBuilder(opts = {}) {
  const presentOpts = Object.keys(opts).filter((k) => !!k);

  required.forEach((requiredKey) => {
    if (!presentOpts.includes(requiredKey)) {
      throw new Error(`Missing required option: '${requiredKey}'`);
    }
  });

  // Default options
  const _timestamp = opts.timestamp || '_updatedAt';

  // Closure state
  let _hasUpdates = false;
  let _hasRemovals = false;
  let _removals = [];
  let _removalAttributeNames = {};
  let _attributeNames = {};
  let _attributeValues = {};

  return {
    /**
     * @param {object} items An object whose keys represent attributes and whose
     * values represent the new values for said attributes on the document
     */
    update(items) {
      Object.entries(items).forEach(([key, val]) => {
        _attributeNames[`#${key}`] = key;
        _attributeValues[`:${key}`] = val;

        _hasUpdates = true;
      });
      return this;
    },
    /**
     * @param {array} attrs The attributes to be removed
     */
    remove(attrs) {
      _removals = _removals.concat(attrs);
      _removals.forEach((key) => {
        _removalAttributeNames[`#${key}`] = key;
      });

      _hasRemovals = true;

      return this;
    },
    /**
     * @param {?object} params
     * @param {?string} params.returnValues
     */
    params({ returnValues = 'ALL_NEW' } = {}) {
      const ts = new Date().toISOString();
      const params = {
        TableName: opts.table,
        ExpressionAttributeNames: {
          '#updatedAt': _timestamp,
          ..._attributeNames,
          ..._removalAttributeNames,
        },
        ExpressionAttributeValues: {
          ':updatedAt': ts,
          ..._attributeValues,
        },
        ReturnValues: returnValues,
      };

      if (_hasUpdates || _hasRemovals) {
        params.UpdateExpression = printUpdateExpression(
          ['#updatedAt', ...Object.keys(_attributeNames)],
          _removals
        ).trim();
      }

      return params;
    },

    _reset() {
      _hasUpdates = false;
      _hasRemovals = false;
      _removals = [];
      _removalAttributeNames = {};
      _attributeNames = {};
      _attributeValues = {};
    },
  };
}

/**
 * @param {Array<String>} attrNames
 * @param {Array<String>} removals
 */
function printUpdateExpression(attrNames, removals) {
  let updateExpression = '';
  const updateLen = Object.keys(attrNames).length;
  const removalLen = removals.length;

  if (updateLen) {
    updateExpression += attrNames.reduce((accum, key, i) => {
      accum += `${key} = :${key.substring(1)}`;

      if (i + 1 < updateLen) {
        accum += ', ';
      }
      return accum;
    }, 'SET ');
  }

  if (removalLen) {
    updateExpression += removals.reduce((accum, key, i) => {
      accum += `#${key}`;

      if (i + 1 < removalLen) {
        accum += ', ';
      }

      return accum;
    }, ' REMOVE ');
  }

  return updateExpression;
}

module.exports = { QueryBuilder: queryBuilder };
