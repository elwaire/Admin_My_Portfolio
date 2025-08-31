import { Route, Routes, useLocation } from "react-router-dom";

import AboutManagePage from "../pages/AboutManage";

import ProjectsManagePage from "../pages/ProjectsManage";
import AddProjectPage from "../pages/ProjectsManage/AddProject";

import CertificatesManage from "../pages/CertificatesManage";

import NotFound from "../pages/NotFound";

import MainLayout from "../layouts/MainLayout";
import ChildLayout from "../layouts/ChidLayout";
import PATHS from "../constants/paths";

export default function AppRoutes() {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            {/* Routes có layout */}
            <Route element={<MainLayout />}>
                <Route path={PATHS.ABOUT} element={<AboutManagePage />} />

                <Route path={PATHS.PROJECT} element={<ProjectsManagePage />} />
                <Route path={PATHS.PROJECT_ADD} element={<AddProjectPage />} />

                <Route path={PATHS.CERTIFICATE} element={<CertificatesManage />} />

                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Route không layout */}
            <Route element={<ChildLayout />}></Route>
        </Routes>
    );
}
