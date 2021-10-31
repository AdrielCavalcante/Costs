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

        api.post("projects", { project }, { headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },})
            .then((resp) => {
                history.push('projects/', { message: 'Projeto criado com sucesso!' });
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