import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';

function App() {  
  return (
    <>            
    <CssBaseline />
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <RouterProvider router={router}/>
    </LocalizationProvider>
    </>
  )
}

export default App
