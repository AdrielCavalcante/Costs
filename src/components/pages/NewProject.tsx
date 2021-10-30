import { useHistory } from "react-router";

import styles from "./NewProject.module.scss";

import ProjectForm from "../project/ProjectForm/ProjectForm";
import api from "../../services/api";

type ProjectProps = {
    id: string;
    name: string;
    budget: number;
    category: any;
    cost: number;
    handleRemove: () => void;
    services: never[];
};

function NewProject() {

    const history = useHistory();

    function createPost(project: ProjectProps) {
        
        const name = project.name
        const budget = project.budget
        const category = project.category

        // Inicialize o cost e services como 0
        const cost = project.cost = 0;
        const services = project.services = []
        
        api.post("projects", { name, budget, category, cost, services })
            .then((resp) => {
                history.push('projects', { message: 'Projeto criado com sucesso!' });
            })
            .catch((err) => console.log(err));
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