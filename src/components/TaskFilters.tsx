// React specific
import { SetURLSearchParams } from "react-router-dom"

// Components
import PillDropdown from "./PillDropdown"
import TaskSearch from "./TaskSearch"

// Services
import taskState from "../api/taskState"

// Styles
import './TaskFilters.css'

const SEARCH_PARAM = 'filter-title'
const STATE_PARAM = 'filter-state'

interface TaskFiltersProps {
    searchParams: URLSearchParams
    setSearchParams: SetURLSearchParams
    onFiltersChange?: (newParams: URLSearchParams) => unknown
}

function TaskFilters(props: TaskFiltersProps) {
    const searchFilter = props.searchParams.get(SEARCH_PARAM)
    const stateFilter = props.searchParams.get(STATE_PARAM)

    const defaultStateValue = {
        value: stateFilter || "",
        label: taskState[stateFilter as string] || "Seleccione"
    }

    const options = [
        {
            value: "TO_DO",
            label: taskState.TO_DO,
        },
        {
            value: "IN_PROGRESS",
            label: taskState.IN_PROGRESS,
        },
        {
            value: "DONE",
            label: taskState.DONE,
        }
    ]

    const handleFilterChange = (filter: string) => (newValue?: string) => {
        const newParams = new URLSearchParams(props.searchParams)
        if (!newValue) newParams.delete(filter)
        else newParams.set(filter, newValue)

        props.setSearchParams(newParams)
        if (props.onFiltersChange) props.onFiltersChange(newParams)
    }

    return (
        <div data-testid="task-filters" className="filters-header">
            <TaskSearch defaultValue={searchFilter as string} onSearch={handleFilterChange(SEARCH_PARAM)} />
            <PillDropdown
                label="Buscar por estado"
                onChange={(newValue) => handleFilterChange(STATE_PARAM)(newValue.value as string)}
                className="filters-state"
                name="state"
                initialValue={defaultStateValue}
                options={options}
                removeEnabled
                onRemove={handleFilterChange(STATE_PARAM)}
            />
        </div>
    )
}

export default TaskFilters