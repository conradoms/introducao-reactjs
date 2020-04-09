import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      "url": "https://github.com/conradoms",
      "title": `Conra ${Date.now()}`,
      "techs": ["Node", "Express", "TypeScript", ".NetCore", "React Native"]
    });

    setRepository([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepository(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
