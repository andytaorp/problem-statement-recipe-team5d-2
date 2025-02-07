import React, { useState } from 'react';
import { useRecipeContext } from "../hooks/useRecipeContext";
import { useAuthContext } from "../hooks/useAuthContext";

const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api/recipes';

const RecipeForm = () => {
    const { dispatch } = useRecipeContext();
    const { user } = useAuthContext();

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in to add a recipe.");
            return;
        }

        const recipe = {
            name,
            ingredients: ingredients.split(","),
            instructions,
            prepTime,
            difficulty,
        };

        try {
            const response = await fetch(`${API_URL}/api/recipes`, {
                method: "POST",
                body: JSON.stringify(recipe),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                setName("");
                setIngredients("");
                setInstructions("");
                setPrepTime("");
                setDifficulty("");
                dispatch({ type: "CREATE_RECIPE", payload: json });
            }
        } catch (error) {
            setError("Failed to add recipe. Please try again.");
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Recipe</h3>
            <label>Recipe name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
            <label>Ingredients (comma separated):</label>
            <input
                type="text"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                required
            />
            <label>Instructions:</label>
            <textarea
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
                required
            ></textarea>
            <label>Preparation Time (mins):</label>
            <input
                type="number"
                onChange={(e) => setPrepTime(e.target.value)}
                value={prepTime}
                required
            />
            <label>Difficulty:</label>
            <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty} required>
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button type="submit">Add Recipe</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default RecipeForm;