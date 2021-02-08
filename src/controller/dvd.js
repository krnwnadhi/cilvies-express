const dvdModel = require('../model').dvd;
const dvdModelSequelize = require('../model').Sequelize;
const Op = dvdModelSequelize.Op

const dvd = []

module.exports = {
    retrieveAllDvd: async (req, res) => {
        try {
            const title = req.query.title
            const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
            let where;
            if (condition) {
                where = {
                    title: { [Op.like]: `%${title}%` }
                }
            } else if (condition) {
                where = condition
            }
            else {
                where = null
            }

            const allDvd = await dvdModel.findAll({ where: where });

            res.json(allDvd)
        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    },

    retrieveIdDvd: async (req, res) => {
        const id = parseInt(req.params.id);

        const selectedDvd = await dvdModel.findByPk(id);

        if (!selectedDvd) {
            res.status(404).send(`DVD with id: ${id} was not found`)
        } else {
            res.json(selectedDvd)
        };
    },

    createDvd: async (req, res) => {
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const newDvd = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imgURL: req.body.imgURL,
            status: req.body.status ? req.body.status : false,
        }
        await dvdModel.create(newDvd);

        res.sendStatus(201)
    },

    updateDvd: async (req, res) => {
        const payload = req.body;

        const id = parseInt(req.params.id);
        await dvdModel.update(payload, { where: { id: id } });

        res.json({ id, ...payload })
    },

    deleteDvd: async (req, res) => {
        const id = parseInt(req.params.id)
        await dvdModel.destroy({ where: { id: id } });

        res.sendStatus(204);
    },

    deleteAllDvd: async (req, res) => {

        await dvdModel.destroy({ where: {}, truncate: false });

        res.sendStatus(204);
    },
};