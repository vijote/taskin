import { useSearchParams } from "react-router-dom";
import ExpandIcon from "./icons/ExpandIcon";
import './OrderTasksHeader.css'

const ORDERING = {
    ASC: '1',
    DESC: '0'
}

interface OrderTasksHeaderProps {
    onSearchChange?: Function
}

function OrderTasksHeader(props: OrderTasksHeaderProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const title = searchParams.get("sort-title")
    const state = searchParams.get("sort-state")

    const changeOrderProperty = (property: string) => () => {
        const newParams = new URLSearchParams(searchParams)

        const noTitleSort = title === null
        const existingAscTitleSort = title && title === ORDERING.ASC

        const noStateSort = state === null
        const existingAscStateSort = state === ORDERING.ASC

        if (property === "sort-title")
            if (noTitleSort || existingAscTitleSort) newParams.set("sort-title", ORDERING.DESC)
            else newParams.set("sort-title", ORDERING.ASC)


        if (property === "sort-state")
            if (noStateSort || existingAscStateSort) newParams.set("sort-state", ORDERING.DESC)
            else newParams.set("sort-state", ORDERING.ASC)

        setSearchParams(newParams)
        if(props.onSearchChange) props.onSearchChange(newParams)
    }

    return (
        <section className="order-tasks-container">
            <h3>Ordenar por</h3>
            <div className="order-options">
                <div className="order-option">
                    <ExpandIcon className={title === ORDERING.ASC ? "asc" : ""} size={24} />
                    <p onClick={changeOrderProperty("sort-title")}>Titulo</p>
                </div>
                <div className="order-option">
                    <ExpandIcon className={state === ORDERING.ASC ? "asc" : ""} size={24} />
                    <p onClick={changeOrderProperty("sort-state")}>Estado</p>
                </div>
            </div>
        </section>
    )
}

export default OrderTasksHeader