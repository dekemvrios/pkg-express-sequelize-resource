const HttpStatus = require('http-status-codes');
const Boom = require('boom')

const destroy = (Model) => {
    return async (req, res) => {
        const {id} = req.params;

        const model = await Model.findOne({where: {id}});
        if (!model) throw Boom.notFound();

        await model.destroy();
        return res.status(HttpStatus.NO_CONTENT).json();
    };
};

module.exports = destroy