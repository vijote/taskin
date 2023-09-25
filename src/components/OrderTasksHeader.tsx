import { useSearchParams } from "react-router-dom";
import ExpandIcon from "./icons/ExpandIcon";
import './OrderTasksHeader.css'
import CloseIcon from "./icons/CloseIcon";

const ORDERING = {
    ASC: '1',
    DESC: '0'
}

const TITLE_SORT_PARAM = "sort-title"
const CREATED_AT_SORT_PARAM = "sort-createdAt"

interface OrderTasksHeaderProps {
    onSearchParamsChange?: (newParams: URLSearchParams) => unknown
}

function OrderTasksHeader(props: OrderTasksHeaderProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const titleSort = searchParams.get(TITLE_SORT_PARAM)
    const createdAtSort = searchParams.get(CREATED_AT_SORT_PARAM)

    function updateSearchParams(newParams: URLSearchParams) {
        setSearchParams(newParams)
        if (props.onSearchParamsChange) props.onSearchParamsChange(newParams)
    }

    const changeOrderProperty = (property: string) => () => {
        const newParams = new URLSearchParams(searchParams)

        const noTitleSort = titleSort === null
        const existingAscTitleSort = titleSort && titleSort === ORDERING.ASC

        const noStateSort = createdAtSort === null
        const existingAscStateSort = createdAtSort === ORDERING.ASC

        if (property === TITLE_SORT_PARAM)
            if (noTitleSort || existingAscTitleSort) newParams.set(TITLE_SORT_PARAM, ORDERING.DESC)
            else newParams.set(TITLE_SORT_PARAM, ORDERING.ASC)


        if (property === CREATED_AT_SORT_PARAM)
            if (noStateSort || existingAscStateSort) newParams.set(CREATED_AT_SORT_PARAM, ORDERING.DESC)
            else newParams.set(CREATED_AT_SORT_PARAM, ORDERING.ASC)

        updateSearchParams(newParams)
    }

    const removeOrderProperty = (property: string) => () => {
        const newParams = new URLSearchParams(searchParams)

        if (!newParams.has(property)) return

        newParams.delete(property)
        updateSearchParams(newParams)
    }

    return (
        <section className="order-tasks-container">
            <p>Ordenar por</p>
            <div className="order-options">
                <div className="order-option">
                    <ExpandIcon className={!titleSort || titleSort === ORDERING.ASC ? "asc" : ""} size={24} />
                    <p className="order-option-label" onClick={changeOrderProperty(TITLE_SORT_PARAM)}>Titulo</p>
                    {titleSort && <CloseIcon size={16} onClick={removeOrderProperty(TITLE_SORT_PARAM)}></CloseIcon>}
                </div>
                <div className="order-option">
                    <ExpandIcon className={!createdAtSort || createdAtSort === ORDERING.ASC ? "asc" : ""} size={24} />
                    <p className="order-option-label" onClick={changeOrderProperty(CREATED_AT_SORT_PARAM)}>Fecha de creación</p>
                    {createdAtSort && <CloseIcon size={16} onClick={removeOrderProperty(CREATED_AT_SORT_PARAM)}></CloseIcon>}
                </div>
            </div>
        </section>
    )
}

export default OrderTasksHeader