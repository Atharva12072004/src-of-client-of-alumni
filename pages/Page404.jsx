import Navbar from '../template/Navbar';
import Footer from '../template/Footer';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import error404 from '../assets/maintanence/Error404.png';
import TwoCone from '../assets/maintanence/TwoCone.png';
import {useTheme} from '@mui/material/styles';

// ==============================|| ERROR 404 - MAIN ||============================== //

function Page404() {

  const theme= useTheme();

  return (
    <>
         <Navbar/>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', pt: 1.5, pb: 1, overflow: 'hidden', mt: '2rem' }}
      >
        <Grid item xs={12}>
          <Stack direction="row">
            <Grid item>
              <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 300 } }}>
                <img src={error404} alt="Error 404" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Grid>
            <Grid item sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 60, left: -40, width: { xs: 130, sm: 390 }, height: { xs: 115, sm: 330 } }}>
                <img src={TwoCone} alt="Maintenance" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h2" >Page Not Found</Typography>
            <Button color={'primary'} size={'large'} component={Link} to={'/'} variant="contained">
              Back To Home
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
}

export default Page404;
