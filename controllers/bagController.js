const db = require('../models');
const { Op } = require('sequelize')

const createGrowFunBag = async (req, res) => {
    try {
        const { name_bag, amount, type_bag } = req.body;
        const newBag = await db.Bag.create({
            name_bag,
            amount,
            type_bag,// "FUN BAG" "GROW BAG" ก็ได้
            user_id: req.user.id
        });

        res.status(201).send(newBag);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const getMyGrowBag = async (req, res) => {
    try {
        const targetBag = await db.Bag.findOne({
            where: {
                [Op.and]: [
                    { user_id: req.user.id },
                    { type_bag: "GROW BAG" }
                ]
            }
        });

        if (targetBag) {
            res.status(200).send(targetBag);
        } else {
            res.status(200).send({ message: "คุณยังไม่ได้สร้าง GROW BAG", status: false })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const getMyMoneyBag = async (req, res) => {
    try {
        const targetBag = await db.Bag.findOne({
            where: {
                [Op.and]: [
                    { user_id: req.user.id },
                    { type_bag: "MONEY BAG" }
                ]
            }
        });

        if (targetBag) {
            res.status(200).send(targetBag);
        } else {
            res.status(400).send({ message: "คุณยังไม่ได้สร้าง MONEY BAG" })
        };

    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const getMyFunBag = async (req, res) => {
    try {
        const targetBag = await db.Bag.findOne({
            where: {
                [Op.and]: [
                    { user_id: req.user.id },
                    { type_bag: "FUN BAG" }
                ]
            }
        });

        if (targetBag) {
            res.status(200).send(targetBag);
        } else {
            res.status(200).send({ message: "คุณยังไม่ได้สร้าง FUN BAG", status: false })
        };

    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const getAllBags = async (req, res) => {
    try {
        const allBags = await db.Bag.findAll({ where: { user_id: req.user.id } });

        res.status(200).send(allBags);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const getAllMoney = async (req, res) => {
    try {
        const allBags = await db.Bag.findAll({ where: { user_id: req.user.id } });
        let ans = 0;
        allBags.forEach(item => ans += Number(item.amount));
        // res.status(200).send({ message: ans });
        res.status(200).send(String(ans));
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    };
};

module.exports = {
    createGrowFunBag,
    getMyGrowBag,
    getMyMoneyBag,
    getMyFunBag,
    getAllBags,
    getAllMoney
}