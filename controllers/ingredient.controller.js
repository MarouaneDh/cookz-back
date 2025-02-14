const jwt = require("jsonwebtoken");
const Ingredient = require('../models/Ingredient')

const createIngredient = async (req, res) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        res.status(201).send({ msg: "Ingredient created with success", ingredient });
    } catch (error) {
        res.status(400).send({ message: "Not able to create ingredient" });
    }
};

const getAllIngredients = async (req, res) => {
    try {
        const result = await Ingredient.find()
            .select("-__v")
            .sort({ createdAt: -1 });

        res.send({
            response: result,
            message: "Got all ingredients with success",
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Can't get ingredients" });
    }
};

const getOneIngredient = async (req, res) => {
    const _id = req.params.id;
    const filter = req.body;

    try {
        const result = await Ingredient.findOne({ _id }).select("-__v");


        res.send({ response: result, message: `Got ingredient with success` });
    } catch (error) {
        res.status(400).send({ message: "There is no ingredient with this id" });
    }
};


const updateIngredient = async (req, res) => {
    const _id = req.params.id;

    try {
        const ingredient = await Ingredient.findById(_id);

        if (!ingredient) {
            return res.status(404).send({ message: "Ingredient not found" });
        }

        Object.assign(ingredient, req.body);

        await ingredient.save();

        res.status(200).send({ message: `${ingredient.name} was updated successfully`, ingredient });
    } catch (error) {
        res.status(400).send({ message: "Unable to update ingredient" });
    }
};

const deleteIngredient = async (req, res) => {
    const _id = req.params.id

    try {
        const result = await Ingredient.deleteOne({ _id });

        result.deletedCount === 1
            ? res.status(200).send({ message: "Ingredient was deleted successfully" })
            : res.status(404).send({ message: "There is no ingredient with this ID" })

    } catch (error) {
        res.send("Ingredient wasn't deleted");
    }
};

module.exports = {
    createIngredient,
    getAllIngredients,
    getOneIngredient,
    updateIngredient,
    deleteIngredient
}