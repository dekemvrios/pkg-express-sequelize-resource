const post = (Model, options = {}) => {
    return async (req, res) => {
        const doc = await Model.create(req.body);

        const model = await Model.findOne({
            where: {id: doc.id},
            ...(options.findOne || {}),
        });

        return res.json(model);
    };
};
module.exports = post