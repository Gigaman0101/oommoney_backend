module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // validate: {
            //     max: 16,
            //     min: 8
            // }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     max: 16,
            //     min: 8
            // }
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isEmail: true,
            // }
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING
        },
        id_card: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        education_level: {
            type: DataTypes.STRING
        },
        price_range: {
            type: DataTypes.STRING
        },
        career: {
            type: DataTypes.STRING
        },
        profile_url: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "users",
    })

    User.associate = models => {
        User.hasMany(models.Address, { foreignKey: "user_id" });
        User.hasMany(models.Bag, { foreignKey: "user_id" });
        User.hasMany(models.ConditionBag, { foreignKey: "user_id" });
        User.hasMany(models.Transfer, { foreignKey: "transfer_by" });
        User.hasMany(models.Transfer, { foreignKey: "transfer_to" });
    };

    return User
};