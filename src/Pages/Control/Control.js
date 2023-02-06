import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderElement from '../../element/RenderElement'
import { setElement } from '../../Redux/ActiveElement'
import { setProject } from '../../Redux/Project/Project'
import Result from '../../Result/Result'
import Sidebar from '../Sidebar/Sidebar'
import styles from "./Control.module.scss"

const Control = () => {
    const {project} = useSelector(s => s)
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem("project", JSON.stringify(project))
        document.getElementById('iframeid').src = document.getElementById('iframeid').src
    }, [project])

    return (
        <div className={styles.container}>
            <Sidebar/>
            <iframe id="iframeid" className={styles.result} height="100%" width="100%" src="http://localhost:3000"/>
        </div>
    )
}

export default Control