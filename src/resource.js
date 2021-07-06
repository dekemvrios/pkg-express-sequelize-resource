const patch = require('./routes/patch');
const post = require('./routes/post');
const find = require('./routes/find');
const get = require('./routes/get');
const destroy = require('./routes/destroy');
const query = require('./middleware/query')

module.exports = {query, patch, post, find, get, destroy}