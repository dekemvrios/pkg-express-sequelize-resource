const Boom = require('boom');

const patch = (Model, options = {}) => {
    return async (req, res) => {
        const {id} = req.params;

        let model = await Model.findOne({where: {id}});
        if (!model) throw Boom.notFound();

        model.set(req.body);
        await model.save(options.save || {});

        model = await Model.findOne({where: {id}});
        return res.json(model);
    };
};
module.exports = patch