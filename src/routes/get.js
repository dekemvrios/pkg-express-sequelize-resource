const Boom = require('boom')

const get = (Model, options = {}) => {
    return async (req, res) => {
        const {id} = req.params;

        const model = await Model.findOne({
            where: {id},
            ...(options.findOne || {}),
        });

        if (!model) throw Boom.notFound();
        return res.json(model);
    };
};

module.exports = get