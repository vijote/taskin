import { useState, ReactNode } from 'react';
import './PillDropdown.css';

interface PillOptionProps {
    label: string,
    onClick: Function
    value: unknown,
}

type Option = {
    label: string
    value: ReactNode
}

interface PillDropdownProps {
    initialValue: Option
    options: Option[]
    label?: string
    name: string
    className?: string
}

function PillDropdown(props: PillDropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>(props.initialValue)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const onOptionClick = (newValue: Option) => () => {
        setSelectedOption(newValue)
    }

    return (
        <div className='pill-dropdown-container'>
            <label className='dropdown-label' htmlFor={props.name}>{props.label}</label>
            <div className={`pill-dropdown ${props.className || ''}`} tabIndex={0} onClick={toggleDropdown} onBlur={() => setIsDropdownOpen(false)}>
                <span>{selectedOption.label}</span>
                <div className={`dropdown-option-container ${isDropdownOpen ? 'open' : ''}`}>
                    {props.options.map(option => <PillOption
                        key={option.label}
                        onClick={onOptionClick(option)}
                        value={option.value}
                        label={option.label}
                    />)}
                </div>
            </div>
            <input readOnly={true} value={selectedOption.value as string} type="text" name={props.name} id={props.name} hidden={true} />
        </div>
    );
}

function PillOption(props: PillOptionProps) {
    const handleClick = () => {
        props.onClick(props.value)
    }

    return (
        <div className='dropdown-option' onClick={handleClick}>{props.label}</div>
    )
}

export default PillDropdown;
