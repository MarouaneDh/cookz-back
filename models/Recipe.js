const mongoose = require("mongoose");

const schema = mongoose.Schema;

const oneIngredient = new mongoose.Schema({
    ingredient: String,
    state: String,
    unit: String,
    quantity: String,
    ingredientId: String,
});

const oneReview = new mongoose.Schema({
    review: String,
    score: Number,
    user: {
        type: {
            _id: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            }
        },
        required: true,
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, {
    timestamps: true
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
        type: [oneReview],
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