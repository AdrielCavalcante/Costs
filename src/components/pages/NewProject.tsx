import { useHistory } from "react-router";

import styles from "./NewProject.module.scss";

import ProjectForm from "../project/ProjectForm";

function NewProject() {

    const history = useHistory();

    function createPost(project: { cost: number; services: never[]; }) {
        // Inicialize o cost e services como 0
        project.cost = 0;
        project.services = []

        fetch("http://localhost:8000/projects", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                history.push('/projects', { message: 'Projeto criado com sucesso!' });
            })
            .catch((err) => console.log());
    }

    return (
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    );
}

export default NewProject;