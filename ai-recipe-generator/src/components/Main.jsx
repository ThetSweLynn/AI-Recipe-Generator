import React from 'react'
import Recipe from './Recipe.jsx'
import AIResponse from './AIResponse.jsx'
import { getRecipeFromMistral } from '../ai.js'

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState()
    const recipeSection = React.useRef(null)

    function addIngredient(formData) {
        const newItem = formData.get('ingredient')
        setIngredients(prev => [...prev, newItem])
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    React.useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [recipe])

    return <main>
        <form action={addIngredient}>
            <input type="text" placeholder="e.g, chicken" name='ingredient'/>
            <button>Add ingredient</button>
        </form>
        <Recipe ref={recipeSection} ingredients={ingredients} getRecipe={getRecipe} />
        {recipe && <AIResponse recipe={recipe} />}
    </main>
}