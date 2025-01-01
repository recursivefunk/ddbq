# ddbq

🚨 DO NOT USE THIS IN PRODUCTION HAVE YOU LOST YOUR MIND?!?! 🚨

I started this years ago when I was working with DynamoDB on a daily basis. This is super experimental and I'm not even sure I want to finish it, but I've decided to dust it off, open it up, and make some progress since I find myself with a little extra time on my hands.

```javascript
const { QueryBuilder } = require('ddbq');

const builder = QueryBuilder({
  table: 'my-table',
  key: { sort: 'sort', partition: 'partition' }
});
const params = builder
  .update({
    item: 'value',
    item2: 'value2'
  })
  .params();

console.log(params);

/*
{
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
}
*/

await client.update(params).promise();
```