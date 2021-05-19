const { QueryBuilder } = require('../src/index');

describe('Update Expression', () => {
  it('should build a standard update expression', () => {
    const builder = QueryBuilder();
    const params = builder
      .update({
        item: 'value',
        item2: 'value2',
      })
      .params();

    expect(params).toEqual({
      UpdateExpression: 'SET #item = :item, #item2 = :item2',
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
    const builder = QueryBuilder();
    const params = builder
      .update({
        item: 'value',
        item2: 'value2',
      })
      .remove(['removeMe'])
      .params();

    expect(params).toEqual({
      UpdateExpression: 'SET #item = :item, #item2 = :item2 REMOVE #removeMe',
      ExpressionAttributeNames: {
        '#updatedAt': '_updatedAt',
        '#item': 'item',
        '#item2': 'item2',
        '#removeMe': 'removeMe',
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
