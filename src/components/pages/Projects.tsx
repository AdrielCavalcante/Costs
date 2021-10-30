import { useLocation } from "react-router";
import { useState, useEffect } from "react";

import Message from "../layout/Message/Message";
import Container from "../layout/Container/Container";
import Loading from "../layout/Loading/Loading";

import styles from "./Projects.module.scss";
import ProjectCard from "../project/ProjectCard/ProjectCard";
import LinkButton from "../layout/LinkButton/LinkButton";
import api from "../../services/api";

type LocationState = {
    from: Location;
    message: string;
};

type ProjectProps = {
    id: string;
    name: string;
    budget: number;
    category?: any;
    handleRemove: () => void;
};


function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation<LocationState>();
    let message = '';

    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        api.get('projects')
            .then((resp) => setProjects(resp.data))
            .then((data) => {
                setRemoveLoading(true);
            })
           
    }, []);

    function RemoveProject(id: any) {
        console.log(id)
        api.delete('projects/'+ id )
            .then(() => {
                setProjects(projects.filter((project: ProjectProps) => project.id !== id));
                setProjectMessage('Projeto Removido com Sucesso!');
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="error" msg={projectMessage} />}
            <Container custom="start">
                {(projects.length > 0) &&
                    projects.map((project: ProjectProps) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={RemoveProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos Cadastrados...</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;