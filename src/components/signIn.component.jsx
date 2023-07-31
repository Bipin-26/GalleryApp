import { Button, Box, Text, Container, Image } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import bgImageSource from "../assets/login-bg.jpg";
const SignIn = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const loginHandler = async () => {
    await login();
    navigate("/home");
  };
  return (
    <>
      <Container padding="0"  >
        <Box  height="100vh" zIndex='9999'>
          <Image
            src={bgImageSource}
            boxSize="100%"
            objectFit="fill"
            alt="This is background image"
            opacity='0.45'
            overflow='hidden'

          />
        </Box>
        <Box
          position="fixed"
          bottom="0"
          minH="425px"
          bg='rgba(0,0,0,.5)'
          backdropFilter='blur(5px)'
          textColor='#fff'
          padding="0 15px"
          display="flex"
          alignItems="start"
          justifyContent="center"
        >
          <Box marginTop='25px'>
            <Text fontWeight="700" fontSize="32px" marginBottom="25px">
              Welcome to my Photo Gallery App
            </Text>
            <Text fontWeight="500">
              Explore a vast collection of captivating photographs, dive into
              different genres, and indulge in the beauty of the captured world.
              Discover, interact, and share your own cherished moments as you
              embark on a journey through the art of photography.
            </Text>
          </Box>
          <Button
            colorScheme="gray"
            onClick={loginHandler}
            position="absolute"
            bottom="30px"
            padding="25px 30px"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="5px"
            >
              <FcGoogle size="25px" />
              <Text>Sign In with Google</Text>
            </Box>
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
