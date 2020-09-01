import React, { useEffect } from "react";
import { useState } from "react";

import "./styles.css";
import api from "./services/api";

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
      url: "https://github.com/mocajatuba",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],

    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoryList = repositories.filter(repository => repository.id !== id)

    setRepositories(repositoryList);

  }
  
 return (
    <div>
      <ul data-testid="repository-list">
        <li>
          <ul>
              {repositories.map(repository => <li key={repository.id}>{repository.title}</li> )}
          </ul>
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li>
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
