import styles from './Select.module.scss';

type SelectProps = {
    text: string;
    name: string;
    options: never[];
    handleOnChange: (e: React.FormEvent<HTMLSelectElement>) => void;
    value: string;
};

type OptionProps = {
    id: string;
    name: string;
}

function Select({text, name, options, handleOnChange, value }: SelectProps) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option value=''>Selecione uma Opção</option>
                {options.map((option : OptionProps) => (
                    <option value={option.id} key={option.id}>{ option.name }</option>
                ))}
            </select>
        </div>
    );
}

export default Select;