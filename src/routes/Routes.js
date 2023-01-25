import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Result from "../components/Result/Result";
import { Main } from "../layout/Main";
import PrivateRoute from "./PrivateRoute";




export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/db",
        element: <PrivateRoute><Main /></PrivateRoute>,
        children: [
            {
                path: "/db",
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: "/db/home",
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: "/db/result",
                element: <PrivateRoute><Result /></PrivateRoute>,
            }
        ]
    },



]);