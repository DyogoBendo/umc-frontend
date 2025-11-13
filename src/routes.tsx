import {createBrowserRouter, Navigate} from 'react-router'
import ProblemsPage from "./pages/problems"
import ProblemPage from './pages/problem';
import { AppLayout } from './layout/app';

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <AppLayout/>,
            children: [
                {
                    index: true,
                    element: <Navigate to="problems" /> 
                },
                {
                    path: 'problems',
                    children: [
                        {
                            index: true,
                            element: <ProblemsPage/>
                        },
                        {
                            path: ':problemId',
                            element: <ProblemPage/>
                        }
                    ]
                }
            ]
        }
    ],
)