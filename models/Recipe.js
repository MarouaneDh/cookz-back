const mongoose = require("mongoose");

const schema = mongoose.Schema;

const oneIngredient = new mongoose.Schema({
    ingredient: String,
    unit: String,
    quantity: String,
});

const recipeSchema = new schema({
    recipeSteps: {
        type: Array,
        required: true,
    },
    recipeName: {
        type: String,
        required: true,
    },
    yield: {
        type: Number,
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
    recipeIngredients: {
        type: [oneIngredient],
        required: true,
    },
    reviews: {
        type: [Object],
        required: false,
    },
    score: {
        type: Number,
        required: false,
    },
    user: {
        type: Object,
        required: true,
    },
    image: {
        type: [String],
        required: false,
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { timestamps: true });

module.exports = Recipe = mongoose.model("recipe", recipeSchema);