import { Box, Button, Container, Typography } from '@mui/material';
import { Seo } from '../components/seo';
import { usePageView } from '../hooks/use-page-view';

const Page404 = () => {

  usePageView();

  return (
    <>
      <Seo title="Error: Not Found" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          py: '80px'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6
            }}
          >
            <Box
              alt="Not found"
              component="img"
              src={process.env.PUBLIC_URL + '/assets/error-404.png'}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            variant={'h1'}
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}
          >
            <Button
              href={'/'}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page404;
