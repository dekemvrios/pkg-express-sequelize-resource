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

  const rangeFrom = (findAllOpts.offset || 0) + 1;
  const rangeTo = (rangeFrom) + limit - 1;

  const headers = {
    'Content-Range': `${rangeFrom}-${total < rangeTo ? total : rangeTo}/${total}`,
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
