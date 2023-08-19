import { Box, Container, Flex, Image } from "@chakra-ui/react";
import { HiHome, HiUserCircle } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
const Navbar = () => {
  const { currentUserDetail } = useAuthContext();

  return (
    <>
    <Container zIndex='999' position="fixed" bottom='0' margin='0' padding='0' boxSizing="border-box" height='65px' bg='#fff' >
      <Box
        borderTop='1px solid grey'
        borderRadius='0px'
        padding='10px 10px'
        margin='0'
      >
        <Flex alignItems="center" justifyContent='space-evenly'>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2px"
          >
            <Link to='/home'>
            <HiHome size="35px" />
            </Link>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2px"
          >
            <Link to='/home/search-feed'>
            <FiSearch size="35px" />
            </Link>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2px"
          >
            <Link to='/home/upload-image' >
            <BiImageAdd size="35px" />
            </Link>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2px"
          > 
          <Link to={currentUserDetail ? '/home/profile' : '/'} >
            {
              currentUserDetail ? <Image src={currentUserDetail.photoURL} boxSize='35px' borderRadius='50%' /> : <HiUserCircle size="35px" color="grey" />
            }
          </Link>
          </Box>
        </Flex>
      </Box>
    </Container>
    <Outlet />
    </>
  );
};


export default Navbar;
