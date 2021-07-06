const HttpStatus = require('http-status-codes');

const paginate = async function (Model, options = {}) {
  const {
    start = 1,
    limit = 10,
    sort_by = '',
    sort_dir = '',
  } = options.pageSet;

  const findAllOpts = {
    order: [],
    ...(options.findAll || {}),
  };

  if (limit && !isNaN(limit) && limit > 0) {
    findAllOpts.limit = Number(limit);
  }

  if (start && !isNaN(start) && start >= 0) {
    findAllOpts.offset = (Number(start) - 1) * Number(limit);
  }

  if (sort_by && sort_dir) {
    findAllOpts.order.push([sort_by, sort_dir.toUpperCase()]);
  }

  const total = await Model.count();
  const entries = await Model.findAll(findAllOpts);

  const headers = {
    'Content-Range': `${start}-${total < limit ? total : limit}/${total}`,
    status:
      total === 0 || Number(start) + Number(limit) >= total
        ? HttpStatus.OK
        : HttpStatus.PARTIAL_CONTENT,
  };

  return {
    start,
    total,
    limit,
    entries,
    headers,
  };
};

module.exports = paginate
