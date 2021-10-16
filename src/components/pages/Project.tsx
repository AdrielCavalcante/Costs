import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import styles from './Project.module.scss';
import ProjectForm from '../project/ProjectForm';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

type ProjectProps = {
    id: number;
    name: string;
    budget: number;
    category: any;
    cost: number;
    handleRemove: () => void;
};


function Project() {

    const { id } = useParams<{id: string}>();

    const [project, setProject] = useState<ProjectProps>([] as never);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                })
            .catch((err) => console.log(err))
    }, [id]);

    function editPost(project:ProjectProps) {
        setMessage('');

        if (project.budget < project.cost) {
            setMessage('O Orçamento não pode ser menor que o custo do Projeto!');
            setType('error');
            return false;
        }

        fetch(`http://localhost:8000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('O Projeto foi atualizado!');
                setType('success');
            })
            .catch((err) => console.log(err));
    }
    
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container custom="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria: </span> {project.category.name}</p>
                                
                                    <p><span>Total de Orçamento: </span> R${project.budget}</p>

                                    <p><span>Total Utilizado: </span> R${project.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                        <ProjectForm
                                            handleSubmit={editPost}
                                            btnText="Concluir Edição"
                                            projectData={project}
                                        />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um Serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && <div>Formulário de Serviço</div>}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container custom="start">
                                <p>Itens de Serviços</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;