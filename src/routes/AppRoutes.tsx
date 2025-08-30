import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "../pages/Home";
import AddProjectPage from "../pages/Projects/AddProject";
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
                <Route path={PATHS.HOME} element={<HomePage />} />
                <Route path={PATHS.PROJECT_ADD} element={<AddProjectPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Route không layout */}
            <Route element={<ChildLayout />}></Route>
        </Routes>
    );
}
