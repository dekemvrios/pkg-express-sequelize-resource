const paginate = require("../paginate");

const find = (Model, options = {}) => {
    return async (req, res) => {
        const pageSet = options.pageSet || req.pageSet || {};
        const findAll = options.findAll || req.findAll || {};
        const {
            entries,
            headers: {status, ...headers},
        } = await paginate(Model, {pageSet, findAll});

        res.set(headers);
        return res.status(status).json(entries);
    };
};

module.exports = find