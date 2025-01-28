import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { UserView } from 'src/sections/user/view';
import { useRouter } from 'src/routes/hooks';
import { useAuth } from 'src/context/auth-context/useAuth'
import { Box, Typography, Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/sign-in")
  }

  const { userLoggedIn } = useAuth()
  
  if (userLoggedIn) {
    return (
      <>
        <Helmet>
          <title>{`Users - ${CONFIG.appName}`}</title>
        </Helmet>
        <UserView />
      </>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '89vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
        gap: 3,
        background: (theme) => theme.palette.background.neutral,
      }}
    >
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{
          fontWeight: 'fontWeightMedium',
          maxWidth: 480,
          textAlign: 'center',
        }}
      >
        Please sign in to access the application
      </Typography>
      
      <Button
        onClick={handleClick}
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          textTransform: 'uppercase',
          boxShadow: (theme) => theme.customShadows.secondary,
          '&:hover': {
            boxShadow: 'none',
          }
        }}
      >
        Sign In
      </Button>
    </Box>
  );
}
