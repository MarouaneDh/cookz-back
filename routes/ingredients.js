/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the ingredient
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *       example:
 *         name: Tomato
 */

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: The ingredients managing API
 * /api/ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: The ingredient was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: The list of ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Some server error
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get one ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *     responses:
 *       200:
 *         description: The ingredient details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Ingredient'
 *       404:
 *        description: The ingredient was not found
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: edit one ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: The ingredient was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Ingredient'
 *       404:
 *        description: The ingredient was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete the ingredient by id
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *
 *     responses:
 *       200:
 *         description: The ingredient was deleted
 *       404:
 *         description: The ingredient was not found
 *
 */

const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { createIngredient, getAllIngredients, getOneIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredient.controller');

// POST
// Ingredient posting
// PATH: http://localhost:3000/api/ingredients/
// Params Body
router.post("/", isAuth, createIngredient);

// GET
// Getting all ingredients
// PATH: http://localhost:3000/api/ingredients/
router.get("/", isAuth, getAllIngredients);

// GET
// Getting ingredient by id
// PATH: http://localhost:3000/api/ingredients/:id
// Params id
router.get("/:id", isAuth, getOneIngredient);

// PATCH
// Updating a ingredient by id
// PATH: http://localhost:3000/api/ingredients/:id
// Params id body
router.patch("/:id", isAuth, updateIngredient);

// DELETE
// Deleting a ingredient by id
// PATH: http://localhost:3000/api/ingredients/:id
// Params id
router.delete("/:id", isAuth, deleteIngredient);

module.exports = router;
