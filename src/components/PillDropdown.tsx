import { useState } from 'react';
import './PillDropdown.css';
import ExpandIcon from './icons/ExpandIcon';
import CloseIcon from './icons/CloseIcon';

interface PillOptionProps {
    label: string,
    onClick: (value: unknown) => unknown
    value: unknown,
}

export type Option = {
    label: string
    value: React.ReactNode
}

interface PillDropdownProps {
    initialValue: Option
    options: Option[]
    name: string
    label?: string
    className?: string
    onChange?: (newValue: Option) => unknown
    removeEnabled?: boolean
    onRemove?: () => void
}

function PillDropdown(props: PillDropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>(props.initialValue)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const onOptionClick = (newValue: Option) => () => {
        setSelectedOption(newValue)

        if (props.onChange) props.onChange(newValue)
    }

    function handleRemoveClick(evt: React.MouseEvent) {        
        evt.stopPropagation()

        if (props.removeEnabled && props.onRemove) props.onRemove()
    }

    function hasValueSelected() {
        for (const option of props.options) {
            if (option.value === selectedOption.value) return true
        }
    }

    const someValueSelected = hasValueSelected()

    return (
        <div data-testid="pill-dropdown" className='pill-dropdown-container'>
            <label data-testid="dropdown-label" className='dropdown-label' htmlFor={props.name}>{props.label}</label>
            <div data-testid="dropdown-handle" className={`pill-dropdown ${props.className || ''}`} tabIndex={0} onClick={toggleDropdown} onBlur={() => setIsDropdownOpen(false)}>
                <span data-testid="selected-option-label">{selectedOption.label}</span>
                {!props.removeEnabled && <ExpandIcon size={16} />}
                {props.removeEnabled && someValueSelected && <CloseIcon testId='pill-option-remove' onClick={handleRemoveClick} size={16} />}
                <div data-testid="pill-dropdown-options" className={`dropdown-option-container ${isDropdownOpen ? 'open' : ''}`}>
                    {props.options.map(option => <PillOption
                        key={option.label}
                        onClick={onOptionClick(option)}
                        value={option.value}
                        label={option.label}
                    />)}
                </div>
            </div>
            <input
                data-testid="selected-option-value"
                readOnly={true}
                value={selectedOption.value as string}
                type="text"
                name={props.name}
                id={props.name}
                hidden={true} />
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
