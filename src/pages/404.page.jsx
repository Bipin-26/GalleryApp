import { Container, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiHome } from 'react-icons/hi'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Box>
                <Box display='flex' flexDirection='column' alignItems='center' >
                    <Text fontSize='72px' fontFamily='Kablammo, cursive' letterSpacing='10px'>404</Text>
                    <Text>Page Not Found</Text>
                </Box>
                <Button bg='none' _focus={{bg:'none'}} margin='0 auto' display='flex' gap='10px' marginTop='50px' alignItems='center' onClick={() => navigate('/')} >
                    <HiHome size="30px" />
                    <Text>
                    Go To Home
                    </Text>
                </Button>
            </Box>
        </Container>
    )
}

export default PageNotFound;