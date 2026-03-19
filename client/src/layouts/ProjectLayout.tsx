// <-- Layout riêng cho phần Quản lý dự án
import { Outlet } from "react-router-dom";
// import ProjectPage from "../pages/Project/ProjectPage";

function ProjectLayout() {
    return (  
        <div>
            <Outlet/>
        </div>
    );
}

export default ProjectLayout;