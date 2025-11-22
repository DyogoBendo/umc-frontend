import {createBrowserRouter, Navigate} from 'react-router'
import ProblemsPage from "./pages/problems"
import ProblemPage from './pages/problem';
import ProblemSetsPage from './pages/problem-sets/list'

import { AppLayout } from './layout/app';
import ProblemAttemptsPage from './pages/problem-attempts/list';
import {ProblemAttemptCreatePage } from './pages/problem-attempts/create';
import ProblemSetDetailPage from './pages/problem-sets/details';
import { ContestParticipationCreatePage } from './pages/contest-participation/create';
import ContestsPage from './pages/contest/list';
import ContestDetailPage from './pages/contest/detail';
import ContestParticipationsPage from './pages/contest-participation/list';
import ContestParticipationDetailPage from './pages/contest-participation/details';

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
                },
                {
                    path: 'contests',
                    children: [
                        {
                            index: true,
                            element: <ContestsPage />
                        },
                        {
                            path: ':contestId',
                            element: <ContestDetailPage />
                            
                        }
                    ]
                },
                {
                    path: 'contest-participations',
                    children: [
                        {
                            index: true,
                            element: <ContestParticipationsPage />
                        },
                        {
                            path: 'new',
                            element: <ContestParticipationCreatePage />
                        },
                        {
                            path: ':contestParticipationId',
                            element: <ContestParticipationDetailPage />
                        }

                    ]
                }
            ]
        }
    ],
)