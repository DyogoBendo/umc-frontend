import { Stack } from '@mui/material'
import {AppHeader} from '../../components/ui/header'
import {AppFooter} from '../../components/ui/footer'
import { Outlet } from 'react-router'

export function AppLayout() {
	return (		
			<Stack minHeight="100vh">
				<AppHeader />

				<Stack flexGrow={1} py={3} px={10}>					
						<Outlet />					
				</Stack>

				<AppFooter />
			</Stack>		
	)
}
