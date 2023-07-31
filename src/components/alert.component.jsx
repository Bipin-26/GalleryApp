import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

const AlertContainer = () =>{
    return (
            <Alert status='error' height='100vh' width='100vw' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <AlertIcon boxSize='50px' />
            <AlertTitle>Unsupported screen size!</AlertTitle>
            <AlertDescription>This app was developed for mobile users only.</AlertDescription>
            <AlertDescription>Please open the app in mobile device.</AlertDescription>
            </Alert>
    )
}

export default AlertContainer;