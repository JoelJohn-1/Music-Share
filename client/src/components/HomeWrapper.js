import { useContext } from 'react'
import WelcomeScreen from './WelcomeScreen'
import WorkScreen from './WorkScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    
    if (auth.loggedIn || auth.guest_user)
        return <WorkScreen />;
    else
        return <WelcomeScreen />
}