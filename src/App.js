import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories]  =  useState([]);
     
  useEffect(()=>{
     api.get('repositories').then(response =>{
         setRepositories(response.data);
     });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title   : `Novo projeto adicionado em: ${Date.now()}`,
      url     : "",
      techs   : ['Node', 'React']
   });
   const repositori = response.data;
   setRepositories([...repositories, repositori]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter( 
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map( repository =>(
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
