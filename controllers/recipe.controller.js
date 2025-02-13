const jwt = require("jsonwebtoken");
const Recipe = require('../models/Recipe')

const createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).send({ msg: "Recipe created with success", recipe });
    } catch (error) {
        res.status(400).send({ message: "Not able to create recipe" });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const result = await Recipe.find()
            .select("-__v")
            .sort({ createdAt: -1 });

        res.send({
            response: result,
            message: "Got all recipes with success",
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Can't get recipes" });
    }
};

const getOneRecipe = async (req, res) => {
    const _id = req.params.id;
    const filter = req.body;

    try {
        const result = await Recipe.findOne({ _id }).select("-__v");


        res.send({ response: result, message: `Got recipe with success` });
    } catch (error) {
        res.status(400).send({ message: "There is no recipe with this id" });
    }
};


const updateRecipe = async (req, res) => {
    const _id = req.params.id;

    try {
        const recipe = await Recipe.findById(_id);

        if (!recipe) {
            return res.status(404).send({ message: "Recipe not found" });
        }

        Object.assign(recipe, req.body);

        await recipe.save();

        res.status(200).send({ message: `${recipe.recipeName} was updated successfully`, recipe });
    } catch (error) {
        res.status(400).send({ message: "Unable to update recipe" });
    }
};

const deleteRecipe = async (req, res) => {
    const _id = req.params.id

    try {
        const result = await Recipe.deleteOne({ _id });

        result.deletedCount === 1
            ? res.status(200).send({ message: "Recipe was deleted successfully" })
            : res.status(404).send({ message: "There is no recipe with this ID" })

    } catch (error) {
        res.send("Recipe wasn't deleted");
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getOneRecipe,
    updateRecipe,
    deleteRecipe
}