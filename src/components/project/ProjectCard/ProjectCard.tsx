import { Link } from "react-router-dom";

import styles from "./ProjectCard.module.scss";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import React from "react";

type ProjectCardProps = {
    id: string;
    name: string;
    budget: number;
    category: string;
    handleRemove: (id:string) => void;
};

function ProjectCard({id, name, budget, category, handleRemove}: ProjectCardProps) {

    const remove = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        handleRemove(id);
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p><span>Orçamento:</span> R$ {budget}</p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}><BsPencil /> Editar</Link>
                <button onClick={remove}><BsFillTrashFill /> Excluir</button>
            </div>
        </div>
    );
}

export default ProjectCard;