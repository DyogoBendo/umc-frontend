import { Outlet } from 'react-router'
import { AuthProvider } from '../../hooks/AuthContexts'

export function AuthLayout() {
	return (
		<AuthProvider>
            <Outlet />								
		</AuthProvider>		
	)
}
