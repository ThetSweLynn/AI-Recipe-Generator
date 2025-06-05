export default function Recipe(props) {
    const ingredientList = props.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)

    return (
        <>
            {ingredientList.length > 0 && <div className="ingredients-list-container">
                <h2>Ingredients on hand:</h2>
                <ul>
                    {ingredientList}
                </ul>
            </div>}
            {ingredientList.length > 3 && <section className="get-recipe-container">
                <div ref={props.ref}>
                    <h2>Ready for a recipe?</h2>
                    <p>Get a recipe for your list of inngredients!</p>
                </div>
                <button onClick={props.getRecipe}>Get Recipe</button>
            </section>}
        </>
    )
}