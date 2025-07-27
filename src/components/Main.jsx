import React from 'react'
import Recipe from './Recipe.jsx'
import AIResponse from './AIResponse.jsx'
import { getRecipeFromMistral } from '../ai.js'

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState()
    const [isLoading, setIsLoading] = React.useState(false)
    const recipeSection = React.useRef(null)

    function addIngredient(formData) {
        const newItem = formData.get('ingredient')
        setIngredients(prev => [...prev, newItem])
    }

    async function getRecipe() {
        setIsLoading(true)
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipe(recipeMarkdown)
        } catch (error) {
            console.error("Error fetching recipe:", error)
            setRecipe("Oops! Something went wrong while fetching the recipe.")
        } finally {
            setIsLoading(false)
        }
    }

    function clearRecipe() {
        setRecipe(null)
        setIngredients([]) // Optionally clear ingredients as well
    }
        

    React.useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [recipe])

    return <main>
        <form action={addIngredient}>
            <input 
                type="text" 
                placeholder="e.g, chicken" 
                name='ingredient'
                disabled={isLoading}/>
            <button>Add ingredient</button>
        </form>
        <Recipe 
            ref={recipeSection} 
            ingredients={ingredients} 
            getRecipe={getRecipe}
            loading={isLoading} />
        {recipe && <AIResponse recipe={recipe} />}
        {recipe && <button className='clear' onClick={clearRecipe}>Clear Recipe</button>}
    </main>
}