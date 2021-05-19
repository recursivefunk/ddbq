const { QueryBuilder } = require('../src/index');

describe('Initialization', () => {
  it('should throw error when missing table option', () => {
    expect(() => QueryBuilder()).toThrow("Missing required option: 'table'");
  });
  it('should throw error when missing key option', () => {
    expect(() => QueryBuilder({ table: 'my-table' })).toThrow(
      "Missing required option: 'key'"
    );
  });
});

describe('Update Expression', () => {
  const table = 'my-table';
  const key = { sort: '', parition: '' };

  it('should build a standard update expression', () => {
    const builder = QueryBuilder({ table, key });
    const params = builder
      .update({
        item: 'value',
        item2: 'value2',
      })
      .params();

    expect(params).toEqual({
      Key: key,
      TableName: table,
      UpdateExpression:
        'SET #updatedAt = :updatedAt, #item = :item, #item2 = :item2',
      ExpressionAttributeNames: {
        '#updatedAt': '_updatedAt',
        '#item': 'item',
        '#item2': 'item2',
      },
      ExpressionAttributeValues: {
        ':updatedAt': expect.anything(),
        ':item': 'value',
        ':item2': 'value2',
      },
      ReturnValues: 'ALL_NEW',
    });
  });

  it('should build an update expression with removals', () => {
    const builder = QueryBuilder({ table, key });
    const params = builder
      .update({
        item: 'value',
        item2: 'value2',
      })
      .remove(['removeMe', 'removeMe2'])
      .params();

    expect(params).toEqual({
      Key: key,
      TableName: table,
      UpdateExpression:
        'SET #updatedAt = :updatedAt, #item = :item, #item2 = :item2 REMOVE #removeMe, #removeMe2',
      ExpressionAttributeNames: {
        '#updatedAt': '_updatedAt',
        '#item': 'item',
        '#item2': 'item2',
        '#removeMe': 'removeMe',
        '#removeMe2': 'removeMe2',
      },
      ExpressionAttributeValues: {
        ':updatedAt': expect.anything(),
        ':item': 'value',
        ':item2': 'value2',
      },
      ReturnValues: 'ALL_NEW',
    });
  });
});
