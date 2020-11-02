import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
//import backgroundImage from './assets/background.jpg';
import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  // useState retorna um arra com 2 posições
  // 1. Variável com ao seu valor inicial
  // 2. Função para atualizar esse valor

  async function handleAddProject() {
    //projects.push(`Novo Projeto ${Date.now()}`);
    //setProjects([...projects, `Novo Projeto ${Date.now()}`]);
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Pedrooo',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleDeleteProject(id) {
    await api.delete(`projects/${id}`);
    setProjects(projects.filter((pj) => pj.id !== id));
  }
  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleDeleteProject(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </>
  );
}

export default App;
