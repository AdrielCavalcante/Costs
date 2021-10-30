import { useEffect, useState } from "react";

import styles from "./ProjectForm.module.scss";

import Input from "../../form/Input/Input";
import Select from "../../form/Select/Select";
import SubmitButton from "../../form/SubmitButton/SubmitButton";
import api from "../../../services/api";

type ProjectFormProps = {
    btnText: string;
    handleSubmit: any;
    projectData?: any;
};

function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
    
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        api.get("categories")
            .then((resp) => setCategories(resp.data))
            .catch((err) => console.log(err))
    }, [])

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        if (e.target.name === "budget") {
            setProject({ ...project, [e.target.name]: parseFloat(e.target.value) });
        } else {
            setProject({ ...project, [e.target.name]: e.target.value });
        }
    }

    function handleCategory(e: React.FormEvent<HTMLSelectElement>) {
        console.log(e)
        setProject({
            ...project, category: {
                id: e.currentTarget.value,
                name: e.currentTarget.options[e.currentTarget.selectedIndex].text,
            },
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira um nome do Projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="category_id"
                text="Selecione a Categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={ btnText }/>
        </form>
    );
}

export default ProjectForm;