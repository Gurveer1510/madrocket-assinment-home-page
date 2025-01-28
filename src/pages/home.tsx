import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/context/auth-context/useAuth'

// ----------------------------------------------------------------------

export default function Page() {
  const {userLoggedIn} = useAuth()

  const router = useRouter()

  if (userLoggedIn){
    return (
      <>
        <Helmet>
          <title> {`Dashboard - ${CONFIG.appName}`}</title>
          <meta
            name="description"
            content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
          />
          <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
        </Helmet>
  
        <OverviewAnalyticsView />
      </>
    )
  } else {
    router.push("/sign-in")
  }
  
}
