const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ingredientSchema = new schema({
    name: {
        type: String,
        require: true,
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { timestamps: true });
module.exports = Ingredient = mongoose.model("Ingredient", ingredientSchema);