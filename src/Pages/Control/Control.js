import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderElement from '../../element/RenderElement'
import { setElement } from '../../Redux/ActiveElement'
import { clearClicks } from '../../Redux/clicks'
import { getContainer } from '../../Redux/elementContainer'
import { setProject } from '../../Redux/Project/Project'
import Result from '../../Result/Result'
import Sidebar from '../Sidebar/Sidebar'
import styles from "./Control.module.scss"

const Control = () => {
    const {project, elementContainer, activeElement, clicks} = useSelector(s => s)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!activeElement || activeElement === "body") return;
        const c = document.getElementsByClassName(activeElement)[0]?.getBoundingClientRect()
        let temp = (JSON.parse(JSON.stringify(c)))
        dispatch(getContainer(temp));
    }, [activeElement])
    
    useEffect(() => {
        if (clicks.length > 0) {
            dispatch(setElement(clicks[0] || "body"))
            dispatch(clearClicks())
        }
    }, [clicks])

    return (
        <div className={styles.container}>
            <Sidebar/>
            {(activeElement && activeElement != "body") && <div className={styles.box} style={elementContainer ? {...elementContainer, top : elementContainer.top - 5, left : elementContainer.left -5} : {}}></div>}
            <Result/>
            {/* <RenderElement {...project["body"]}/> */}
        </div>
    )
}

export default Control