import {createBrowserRouter, Navigate} from 'react-router'
import ProblemsPage from "./pages/problems"
import ProblemPage from './pages/problem';
import ProblemSetsPage from './pages/problem-sets/list'

import { AppLayout } from './layout/app';
import ProblemAttemptsPage from './pages/problem-attempts/list';
import {ProblemAttemptCreatePage } from './pages/problem-attempts/create';
import ProblemSetDetailPage from './pages/problem-sets/details';

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
                        {
                            path: ':problemSetId',
                            element: <ProblemSetDetailPage/>
                        }
                    ]
                },
                {
                    path: 'problem-attempts',
                    children: [
                        {
                            index: true,
                            element: <ProblemAttemptsPage/>
                        },
                        {
                            path: 'new',
                            element: <ProblemAttemptCreatePage/>
                        }
                    ]
                }
            ]
        }
    ],
)