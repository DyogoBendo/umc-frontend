import {Stack, Typography } from '@mui/material'

export function AppFooter() {
	return (
		<Stack
			px={3}
			height={72}
			justifyContent="space-between"
			component="footer"
			direction="row"
			bgcolor="juicy.neutral.black"
		>
			<Stack py={2} justifyContent="center">
				<Typography fontWeight="regular" fontSize={12}>
                    Ultimate Maratona Championship
                </Typography>
				<Typography fontSize={12} fontWeight="regular">
                    0.0.0
                </Typography>					
			</Stack>
		</Stack>
	)
}
