import React, { useState } from 'react';
import Input from '../form/Input/Input';
import SubmitButton from '../form/SubmitButton/SubmitButton';

import styles from '../project/ProjectForm/ProjectForm.module.scss';

type serviceFormProps = {
    handleSubmit: (project: ProjectProps) => void;
    btnText: string;
    projectData: ProjectProps;
};

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

function ServiceForm({ handleSubmit, btnText, projectData }: serviceFormProps) {

    const [service, setService] = useState<ProjectProps & servicesProps>([] as never);
    

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "cost") {
            setService({ ...service, [e.target.name]: parseFloat(e.target.value) })
        } else {
            setService({ ...service, [e.target.name]: e.target.value })
        }
        
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do Serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do Serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do Serviço"
                name="description"
                placeholder="Escreve sobre o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm;