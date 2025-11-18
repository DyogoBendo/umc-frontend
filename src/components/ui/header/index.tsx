import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// --- Sub-componente para os Botões com Dropdown ---
interface NavDropdownProps {
  label: string;
  basePath: string; // Ex: 'problems', 'competitors'
}

function NavDropdown({ label, basePath }: NavDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        color="inherit"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />} // Ícone de seta para baixo
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ textTransform: 'none', fontSize: '1rem' }} // Estilo opcional
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem 
          onClick={handleClose} 
          component={RouterLink} 
          to={`/${basePath}`}
        >
          Listar
        </MenuItem>


        <MenuItem 
          onClick={handleClose} 
          component={RouterLink} 
          to={`/${basePath}/new`}
        >
          Cadastrar
        </MenuItem>
      </Menu>
    </Box>
  );
}

export function AppHeader() {
	return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
		
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UMC
          </Typography>

          {/* ÁREA DOS MENUS (Horizontal) */}
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <NavDropdown label="Problems" basePath="problems" />
            <NavDropdown label="Competitors" basePath="competitors" />
            <NavDropdown label="Problem Sets" basePath="problem-sets" />
            <NavDropdown label="Problem Attempts" basePath="problem-attempts" />
          </Box>

          {/* Botão de Logout ou Perfil (Opcional) */}
          <Button color="inherit">Login</Button>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
