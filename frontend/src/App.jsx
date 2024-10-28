import { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => setCharacters(data))
            .catch(error => console.error('Error fetching characters:', error));
    }, []);

    return (
        <div className="App">
            <h1>Characters</h1>
            <div className="character-container">
                {characters.map((character) => (
                    <div className="character-card" key={character.id}>
                        <div className="character-name">{character.name}</div>
                        <div className="character-age">Age: {character.age}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;