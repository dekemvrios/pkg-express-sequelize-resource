const sequelize = require('sequelize');
const {Op} = sequelize;

/**
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const query = async (req, res, next) => {
    const {query} = req;
    // qry pagination
    req.pageSet = query.options ? JSON.parse(query.options) : {};

    let where = {};
    if (query.filters) {
        const filters = JSON.parse(query.filters);
        Object.keys(filters).forEach((prop) => {
            const {val, opr} = filters[prop];
            if (val === '') return;
            where[prop] = {[Op[opr]]: ['like', 'iLike'].includes(opr) ? `%${val}%` : val};
        });
    }

    // sequelize options
    req.findAll = {where};
    next();
};

module.exports = query
