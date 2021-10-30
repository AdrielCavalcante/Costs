import { v4 as uuidv4 } from 'uuid';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import styles from './Project.module.scss';

import ProjectForm from '../project/ProjectForm/ProjectForm';
import Loading from '../layout/Loading/Loading';
import Container from '../layout/Container/Container';
import Message from '../layout/Message/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard'; 
import api from '../../services/api';

type ProjectProps = {
    id: string;
    name: string;
    budget: number;
    category: any;
    cost: number;
    handleRemove: () => void;
    services: servicesProps[];
};

type servicesProps = {
    name: string;
    cost: number;
    description: string;
    id: string;
}

function Project() {

    const { id } = useParams<{ id: string }>();

    const [project, setProject] = useState<ProjectProps>([] as never);
    const [services, setServices] = useState<servicesProps[]>([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        api.get('projects/' + id)
            .then((resp) => {
                setProject(resp.data);
                setServices(resp.data.services);
                setRemoveLoading(true);
            })
            .catch((err) => console.log(err))
    }, [id]);

    function editPost(project: ProjectProps) {
        setMessage('');

        const name = project.name
        const budget = project.budget
        const category = project.category

        if (project.budget < project.cost) {
            setMessage('O Orçamento não pode ser menor que o custo do Projeto!');
            setType('error');
            setShowProjectForm(false);
            return false;
        }
        
        api.patch('projects/' + project.id, { name, budget, category})
            .then((resp) => {
                console.log(resp.data)
                setProject(resp.data);
                setShowProjectForm(false);
                setMessage('O Projeto foi atualizado!');
                setType('success');
            })
            .catch((err) => console.log(err));
    }
    
    function createService(project: ProjectProps) {
        setMessage('');

        const lastService = project.services[(project.services.length) - 1];

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = project.cost + lastServiceCost;

        if (newCost > project.budget) {
            setMessage('Orçamento ultrapassado! Verifique o valor do serviço');
            setType('error');
            setShowServiceForm(false);
            project.services.pop();
            setTimeout(() => {}, 300);
            return false;
        }

        project.cost = newCost;

        const data = (project.services);
        
        api.patch('projects/' + project.id, { services: data })
            .then((resp) => {
                setServices(resp.data.services);
                setShowServiceForm(false);
                setMessage('Serviço adicionado ao projeto!');
                setType('success');
            })
            .catch(err => console.log(err))
    }

    function removeService(id: string , cost: number) {
        setMessage('');
        const servicesUpdated = project.services.filter(
            (service:servicesProps) => service.id !== id
        );

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = projectUpdated.cost - cost;

        api.patch('projects/' + projectUpdated.id, { cost: projectUpdated.cost ,services: projectUpdated.services })
            .then((resp) => {
                setProject(projectUpdated);
                setServices(servicesUpdated);
                setMessage('Serviço removido com sucesso!');
                setType('error');
            })
            .catch((err) => console.log(err))
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
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container custom="start">
                            {services.length > 0 &&
                                services.map((service:servicesProps) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {!removeLoading && <Loading />}
                            {removeLoading && services.length === 0 && <p>Não há serviços cadastrados!</p>}
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