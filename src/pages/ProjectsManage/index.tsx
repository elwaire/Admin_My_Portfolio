import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const ProjectsManagePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <Link to={PATHS.PROJECT_ADD}>Add Project</Link>
            Hellow
        </div>
    );
};

export default ProjectsManagePage;
