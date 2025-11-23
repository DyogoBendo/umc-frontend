import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Tooltip 
} from '@mui/material';
import { useNavigate } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { EntryType } from '../../../schemas/entities/entryType'; // Ajuste o caminho

interface TableProps {
  entryTypes: EntryType[];
}

export default function EntryTypeTable({ entryTypes }: TableProps) {
  const navigate = useNavigate();

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        width: 'auto', 
        mx: 2, 
        mt: 4, 
        overflowX: 'auto' 
      }}
    >
      <Table 
        sx={{ 
          minWidth: 400, // Largura mínima menor pois tem poucas colunas
          '& th': { textAlign: 'center', fontWeight: 'bold' },
          '& td': { textAlign: 'center' }
        }} 
        aria-label="tabela de tipos de entrada"
      >
        <TableHead>
          <TableRow>
            {/* Alinhei o nome à esquerda para ficar mais natural, mas pode centralizar se preferir */}
            <TableCell sx={{ textAlign: 'left !important', pl: 4 }}>Nome</TableCell>
            <TableCell>Origem Contest?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entryTypes.map((item) => (
            <TableRow 
              key={item.id}
              hover
              onClick={() => navigate(`/entry-types/${item.id}`)} // Redireciona para edição/detalhe
              sx={{ cursor: 'pointer' }}
            >
              {/* Nome */}
              <TableCell sx={{ textAlign: 'left !important', pl: 4 }}>
                {item.name}
              </TableCell>

              {/* Booleano com Ícones */}
              <TableCell>
                {item.fromContest ? (
                  <Tooltip title="Sim, originado de um contest">
                    <CheckCircleIcon color="success" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Não, entrada manual/avulsa">
                    <CancelIcon color="disabled" />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
          
          {/* Feedback visual se a lista estiver vazia */}
          {entryTypes.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} sx={{ py: 3, fontStyle: 'italic', color: 'text.secondary' }}>
                Nenhum tipo de entrada cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}