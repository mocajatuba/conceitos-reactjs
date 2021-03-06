import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

const { v4: uuid } = require('uuid');

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: uuid(),
      url: 'https://github.com/mocajatuba',
      title: 'Desafio ReactJS',
      techs: ['React', '"Node.js'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter((repository) => repository.id !== id);
    setRepositories(newRepositories);
  }
 
 return (
  <div>
    <ul data-testid="repository-list">
      {repositories.map((repository) => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={(e) => handleRemoveRepository(repository.id)}>
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
