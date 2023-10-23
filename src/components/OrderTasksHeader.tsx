// React specific
import { SetURLSearchParams } from "react-router-dom";

// Icons
import ExpandIcon from "./icons/ExpandIcon";
import CloseIcon from "./icons/CloseIcon";

// Styles
import './OrderTasksHeader.css'

const ORDERING = {
    ASC: '1',
    DESC: '0'
}

const TITLE_SORT_PARAM = "sort-title"
const CREATED_AT_SORT_PARAM = "sort-createdAt"

interface OrderTasksHeaderProps {
    onSearchParamsChange?: (newParams: URLSearchParams) => unknown
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
}

function OrderTasksHeader(props: OrderTasksHeaderProps) {
    const titleSort = props.searchParams.get(TITLE_SORT_PARAM)
    const createdAtSort = props.searchParams.get(CREATED_AT_SORT_PARAM)

    function updateSearchParams(newParams: URLSearchParams) {
        props.setSearchParams(newParams)
        if (props.onSearchParamsChange) props.onSearchParamsChange(newParams)
    }

    const changeOrderProperty = (property: string) => () => {
        const newParams = new URLSearchParams(props.searchParams)

        const noTitleSort = titleSort === null
        const existingAscTitleSort = titleSort && titleSort === ORDERING.ASC

        const noCreatedAtSort = createdAtSort === null
        const existingAscCreatedAtSort = createdAtSort === ORDERING.ASC

        if (property === TITLE_SORT_PARAM)
            if (noTitleSort || existingAscTitleSort) newParams.set(TITLE_SORT_PARAM, ORDERING.DESC)
            else newParams.set(TITLE_SORT_PARAM, ORDERING.ASC)

        if (property === CREATED_AT_SORT_PARAM)
            if (noCreatedAtSort || existingAscCreatedAtSort) newParams.set(CREATED_AT_SORT_PARAM, ORDERING.DESC)
            else newParams.set(CREATED_AT_SORT_PARAM, ORDERING.ASC)

        updateSearchParams(newParams)
    }

    const removeOrderProperty = (property: string) => () => {
        const newParams = new URLSearchParams(props.searchParams)

        if (!newParams.has(property)) return

        newParams.delete(property)
        updateSearchParams(newParams)
    }

    return (
        <section data-testid="order-tasks-header" className="order-tasks-container">
            <p>Ordenar por</p>
            <div className="order-options">
                <div className="order-option">
                    <ExpandIcon className={!titleSort || titleSort === ORDERING.ASC ? "asc" : ""} size={24} />
                    <p className="order-option-label" data-testid="title-sort" onClick={changeOrderProperty(TITLE_SORT_PARAM)}>Titulo</p>
                    {titleSort && <CloseIcon testId="title-remove" size={16} onClick={removeOrderProperty(TITLE_SORT_PARAM)}/>}
                </div>
                <div className="order-option">
                    <ExpandIcon className={!createdAtSort || createdAtSort === ORDERING.ASC ? "asc" : ""} size={24} />
                    <p className="order-option-label" data-testid="created-at-sort" onClick={changeOrderProperty(CREATED_AT_SORT_PARAM)}>Fecha de creación</p>
                    {createdAtSort && <CloseIcon testId="created-at-remove" size={16} onClick={removeOrderProperty(CREATED_AT_SORT_PARAM)}/>}
                </div>
            </div>
        </section>
    )
}

export default OrderTasksHeader