/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - recipeSteps
 *         - recipeName
 *         - recipeIngredients
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the recipe
 *         recipeSteps:
 *           type: array
 *           description: The category of your recipe
 *         recipeName:
 *           type: string
 *           description: The recipe name
 *         user:
 *           type: object
 *           description: The object of the recipe creator
 *       example:
 *         user:
 *           - _id: 67ac5f78bee636e30ba4be0d
 *             role: admin,
 *             firstName: Marouane
 *             lastName: Dhambri
 *         recipeSteps: 
 *           - Melt butter in a skillet over medium heat. Add the onion, garlic and thyme. Cook, stirring constantly, until onion is tender. Stir in the beef broth, scraping any onion bits from the bottom of the pan, then stir in the port wine. Bring to a boil, and cook until the mixture has reduced to about 1/2 cup. Set aside. This may also be made ahead of time, and reheated.
 *           - Preheat the oven to 350 degrees F (175 degrees C). Heat oil in a cast-iron or other oven-safe skillet over high heat. Sear steaks quickly on both sides until brown, then place the whole pan into the oven.
 *           - Roast steaks in the oven for about 15 minutes for medium rare - with an internal temperature of 145 degrees F (63 degrees C). You may adjust this time to allow the steaks to finish just below your desired degree of doneness if medium is not what you prefer. Remove from the oven, and place on a baking sheet. Stir together the panko crumbs and blue cheese. Top each steak with a layer of this mixture.
 *           - Preheat the oven's broiler. Place steaks under the preheated broiler until the cheese topping is browned and bubbly. 3 to 4 minutes. Remove from the oven, and let stand for at least 15 minutes before serving. Serve with warm port wine sauce.
 *         recipeName: Blue Cheese Crusted Filet Mignon with Port Wine Sauce
 *         recipeIngredients:
 *           - ingredient: butter
 *             unit: tablespoon
 *             quantity: 1
 *           - ingredient: minced white onion
 *             unit: cup
 *             quantity: 0.5
 *           - ingredient: garlic, minced
 *             unit: cloves
 *             quantity: 3
 *           - ingredient: chopped fresh thyme
 *             unit: tablespoon
 *             quantity: 1
 *           - ingredient: low-sodium beef broth
 *             unit: cup
 *             quantity: 0.75
 *           - ingredient: port wine
 *             unit: cup
 *             quantity: 0.5
 *           - ingredient: vegetable oil
 *             unit: tablespoon
 *             quantity: 1
 *           - ingredient: filet mignon steaks
 *             unit: (1 1/2 inch thick)
 *             quantity: 4
 *           - ingredient: crumbled blue cheese
 *             unit: cup
 *             quantity: 0.75
 *           - ingredient: panko bread crumbs
 *             unit: cup
 *             quantity: 0.25
 */

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: The recipes managing API
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: The recipe was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: The list of recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Some server error
 * /api/recipes/{id}:
 *   get:
 *     summary: Get one recipe
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe id
 *     responses:
 *       200:
 *         description: The recipe details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Recipe'
 *       404:
 *        description: The recipe was not found
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: edit one recipe
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: The recipe was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Recipe'
 *       404:
 *        description: The recipe was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete the recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe id
 *
 *     responses:
 *       200:
 *         description: The recipe was deleted
 *       404:
 *         description: The recipe was not found
 *
 */

const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { createRecipe, getAllRecipes, getOneRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipe.controller');

// POST
// Recipe posting
// PATH: http://localhost:3000/api/recipes/
// Params Body
router.post("/", isAuth, createRecipe);

// GET
// Getting all recipes
// PATH: http://localhost:3000/api/recipes/
router.get("/", isAuth, getAllRecipes);

// GET
// Getting recipe by id
// PATH: http://localhost:3000/api/recipes/:id
// Params id
router.get("/:id", isAuth, getOneRecipe);

// PATCH
// Updating a recipe by id
// PATH: http://localhost:3000/api/recipes/:id
// Params id body
router.patch("/:id", isAuth, updateRecipe);

// DELETE
// Deleting a recipe by id
// PATH: http://localhost:3000/api/recipes/:id
// Params id
router.delete("/:id", isAuth, deleteRecipe);

module.exports = router;
