import { Stack, Typography } from "@mui/material"

export function AppHeader() {
	return (
		<Stack
			component="header"
			direction="row"
			alignItems="center"
			justifyContent="space-between"			
			height={64}
			px={3}
		>
            <Typography>
			    Header			
            </Typography>
		</Stack>
	)
}
