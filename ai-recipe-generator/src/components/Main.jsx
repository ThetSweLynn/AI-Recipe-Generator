import React from 'react'
import Recipe from './Recipe.jsx'
import AIResponse from './AIResponse.jsx'
import { getRecipeFromMistral } from '../ai.js'

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState()

    function addIngredient(formData) {
        const newItem = formData.get('ingredient')
        setIngredients(prev => [...prev, newItem])
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    return <main>
        <form action={addIngredient}>
            <input type="text" placeholder="e.g, chicken" name='ingredient'/>
            <button>Add ingredient</button>
        </form>
        <Recipe ingredients={ingredients} getRecipe={getRecipe} />
        {recipe && <AIResponse recipe={recipe} />}
    </main>
}