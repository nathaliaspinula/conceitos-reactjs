import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    api.get("/repositories").then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
      title,
      url,
      techs: ['node']
    }

    await api.post("/repositories", repository).then(response => {
      const { id, title, url, techs } = response.data;
      setRepositories([...repositories, { id, title, url, techs }])
    }
    ).catch(error => alert(error));
  }

  async function handleRemoveRepository(id) {
    const filtered = repositories.filter(repository => repository.id !== id)
    api.delete(`/repositories/${id}`).then(
      setRepositories(filtered)
    ).catch(error => alert(error));
  }

  return (
    <div>
      <ul   data-testid="repository-list">
      {
        repositories.map(repository => (
          
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          
        ))
      }
      </ul>
      <div>
        <label>Title</label>
        <input
          type="text" 
          value={title}
          onChange = {(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Owner</label>
        <input
          type="text" 
          value={url}
          onChange = {(e) => setUrl(e.target.value)}
        />
      </div>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
