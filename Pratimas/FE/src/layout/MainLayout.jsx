import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";
import AddProgrammer from "../pages/AddProgrammer/AddProgrammer";
import ChangeProgrammer from "../pages/changeProgrammer/ChangeProgrammer";
import DeleteProgrammer from "../pages/DeleteProgrammer/DeleteProgrammer";
import Navbar from "./Navbar";

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "addProgrammer", element: <AddProgrammer /> },
            { path: "changeProgrammer", element: <ChangeProgrammer /> },
            { path: "deleteProgrammer", element: <DeleteProgrammer /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
