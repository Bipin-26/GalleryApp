import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { HiHome, HiUserCircle } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { BiImageAdd } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <>
    <Container zIndex='999' position="fixed" bottom='0' margin={'0'} padding={'0'} boxSizing="border-box" height='65px' bg='#fff' >
      <Box
        borderTop='1px solid grey'
        borderRadius='20px'
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
            <Link to='/'>
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
            <Link to='/search-feed'>
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
            <Link to='/upload-image' >
            <BiImageAdd size="35px" />
            </Link>
          </Box>
          {/* <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2px"
          >
            <Link to='/my-gallery'>
            <GrGallery size="35px" />
            </Link>
          </Box> */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2px"
          > 
          <Link to='/profile' >
            <HiUserCircle size="35px" color="grey" />
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
