module.exports = (sequelize, Sequelize) => {
    const dvd = sequelize.define("dvd", {
        title: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.FLOAT,
        },
        description: {
            type: Sequelize.STRING,
        },
        imgURL: {
            type: Sequelize.STRING(1234),
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
    });
    return dvd;
};