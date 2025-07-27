import ReactMarkdown from 'react-markdown';

export default function AIResponse(props) {
    return <section className='ai-response-container'>
        <h2>Recommeded Recipe</h2>
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
}