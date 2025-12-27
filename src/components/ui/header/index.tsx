import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAuth } from '../../../hooks/AuthContexts';
import LogoutIcon from '@mui/icons-material/Logout';

// --- Sub-componente para os Botões com Dropdown ---
interface NavDropdownProps {
  label: string;
  basePath: string; 
  create?: boolean | undefined;
  extract?: boolean | undefined;
}

function NavDropdown({ label, basePath, create, extract }: NavDropdownProps) {
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


        {create && (
          <MenuItem 
            onClick={handleClose} 
            component={RouterLink} 
            to={`/${basePath}/new`}
          >
            Cadastrar
          </MenuItem>
        )}
        
        {extract && (
          <MenuItem 
            onClick={handleClose} 
            component={RouterLink} 
            to={`/${basePath}/import`}
          >
            Importar
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}

export function AppHeader() {
  const { signOut } = useAuth();
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
            <NavDropdown label="Problem Sets" basePath="problem-sets" />
            <NavDropdown label="Problem Attempts" basePath="problem-attempts" create />
            <NavDropdown label="Contests" basePath="contests" />
            <NavDropdown label="Contest Participations" basePath="contest-participations" create extract/>
            <NavDropdown label="Entry types" basePath="entry-types" create />
            <NavDropdown label="Competitions" basePath="competitions" create />
          </Box>

          {/* Botão de Logout ou Perfil (Opcional) */}
          <Button 
          color="inherit" 
          onClick={ () => {
              try {
                signOut();
              } catch (error) {
                  console.log(error)
                  alert("Usuário ou senha inválidos");
              }
            }
          }>
            <LogoutIcon/>
          </Button>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
