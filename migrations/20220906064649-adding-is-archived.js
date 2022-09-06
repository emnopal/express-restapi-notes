/* eslint-disable */
const {config: conf} = require('dotenv');
conf();

const schema = `${process.env.MONGODB_SCHEMA}es`;

module.exports = {
  async up(db, client) {
    // update one <- update only to one field
    // update many <- update to all fields
    await db.collection(schema).updateMany({}, {$set: {isArchived: false}}, false, true)
  },

  async down(db, client) {
    await db.collection(schema).updateMany({}, {$unset: {isArchived: null}}, false, true)
  }
};
