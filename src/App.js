import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Project, ${Date.now()}`
    });

    const project = response.data;

    console.log(response.data);
    // atualizando a variavel repositories (lista os projetos e o novo projeto)
    setRepositories([...repositories, project]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    const repositoryIndex = repositories.findIndex(project => project.id===id)
    //clonando o array para a newProjects para que possa remover o projeto...
    //... requerido
    const newProjects = [...repositories];
    // remove o projeto que que foi setado no repositoryIndex e o no splice ...
    //... indicamos quantas posições seram afetadas. no caso 1 posição. se ...
    // ...colocarmos 2 por exemplo, seram deletados dois projetos apartir do que ...
    // ... foi setado pelo repositoryIndex.
    newProjects.splice(repositoryIndex, 1);
    //mostra o array atualisado
    setRepositories(newProjects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(project =>
          <li key={project.id}>
            <span>{project.title}</span>
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
