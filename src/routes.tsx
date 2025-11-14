import {createBrowserRouter, Navigate} from 'react-router'
import ProblemsPage from "./pages/problems"
import ProblemPage from './pages/problem';
import ProblemSetsPage from './pages/problem-sets'

import { AppLayout } from './layout/app';
import ProblemAttemptsPage from './pages/problem-attempts';

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
                },
                {
                    path: 'problem-sets',
                    children: [
                        {
                            index: true,
                            element: <ProblemSetsPage/>
                        },
                    ]
                },
                {
                    path: 'problem-attempts',
                    children: [
                        {
                            index: true,
                            element: <ProblemAttemptsPage/>
                        },
                    ]
                }
            ]
        }
    ],
)