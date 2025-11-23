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
import LoginPage from './pages/auth/login';
import { PrivateRoute } from './components/auth/private-route';
import { AuthLayout } from './layout/auth';
import EntryTypesPage from './pages/entry-type/list';
import { EntryTypeCreatePage } from './pages/entry-type/create';

export const router = createBrowserRouter([
    {
        // CAMADA 1: Contexto de Autenticação (Envolve a aplicação inteira)
        // Como está dentro do createBrowserRouter, o useNavigate do Contexto FUNCIONA.
        element: <AuthLayout />,
        children: [
            // ROTA PÚBLICA (Fora do AppLayout, sem Header)
            { 
                path: "/login", 
                element: <LoginPage /> 
            },

            // ROTAS PRIVADAS
            {
                element: <PrivateRoute />, // Protege tudo abaixo
                children: [
                    {
                        // CAMADA 2: Layout Visual (Header, Padding)
                        element: <AppLayout />, 
                        children: [
                            {
                                path: "/",
                                element: <Navigate to="problems" />
                            },
                            {
                                path: 'problems',
                                children: [
                                    { index: true, element: <ProblemsPage /> },
                                    { path: ':problemId', element: <ProblemPage /> }
                                ]
                            },
                            {
                                path: 'problem-sets',
                                children: [
                                    { index: true, element: <ProblemSetsPage /> },
                                    { path: ':problemSetId', element: <ProblemSetDetailPage /> }
                                ]
                            },
                            {
                                path: 'problem-attempts',
                                children: [
                                    { index: true, element: <ProblemAttemptsPage /> },
                                    { path: 'new', element: <ProblemAttemptCreatePage /> }
                                ]
                            },
                            {
                                path: 'contests',
                                children: [
                                    { index: true, element: <ContestsPage /> },
                                    { path: ':contestId', element: <ContestDetailPage /> }
                                ]
                            },
                            {
                                path: 'contest-participations',
                                children: [
                                    { index: true, element: <ContestParticipationsPage /> },
                                    { path: 'new', element: <ContestParticipationCreatePage /> },
                                    { path: ':contestParticipationId', element: <ContestParticipationDetailPage /> }
                                ]
                            },
                            {
                                path: 'entry-types',
                                children: [
                                    {index: true, element: <EntryTypesPage />},
                                    {path: 'new', element: <EntryTypeCreatePage />}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);