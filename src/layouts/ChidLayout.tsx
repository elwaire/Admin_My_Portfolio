import { Outlet } from "react-router-dom";

export default function ChildLayout() {
    return (
        <div className="AppWrapper">
            <Outlet />
        </div>
    );
}
