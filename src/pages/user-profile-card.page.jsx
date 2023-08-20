import { Box, Container, Image, Text, Divider, Spinner } from "@chakra-ui/react";
import { useAuthContext } from "../contexts/auth.context";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import GridContainer from "../components/grid-container.component";
import { useContext } from "react";
import { GalleryContext } from "../contexts/gallery.context";

const UserProfileCard = ({ items }) => {
  const navigate = useNavigate();
  const { userList } = useAuthContext();
  const username = new URLSearchParams(window.location.search).get("user");
  const { state } = useContext(GalleryContext)
  const userDetails = userList!==null && userList.find((user) => {
    let userD = "";
    if (user.username === username) {
      userD = user;
      // return user;
    }
    return userD;
  });

  const filteredItems = items.filter((item) => {
    let filtered = "";
    if (item.uploadedBy === userDetails.id) {
      filtered = item;
      // return item;
    }
    return filtered
  });

  return (
    <>
    {
      state.isLoading ? 
      <Box height='100vh' display='flex' justifyContent='center' alignItems='center' >
                  <Spinner size='xl' />
              </Box> :
              
    <Container margin="0" padding="0">
      
      <Box
        position="fixed"
        top="0"
        bg="white"
        zIndex="999"
        width="100%"
        height="200px"
      >
        <Box
          position="absolute"
          top="5px"
          left="10px"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size="30px" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          padding="30px 0"
        >
          <Box display="flex" flexDirection="column" alignItems='center'>
            <Image
              src={userDetails.photoURL}
              boxSize="100px"
              borderRadius="50%"
            />
            <Text fontWeight="600" fontSize="17px">
              {userDetails.username}
            </Text>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontSize="20px" fontWeight="600">
              Uploads
            </Text>
            <Text fontSize="20px" fontWeight="600">
              {filteredItems.length}
            </Text>
          </Box>
        </Box>
        <Divider bg="gray.600" />
        <Text
          marginTop="5px"
          textAlign="center"
          fontSize="18px"
          fontWeight="600"
          color="gray.600"
        >
          Uploads
        </Text>
      </Box>
      <Box margin="230px 0 65px 0" padding="0" overflow="scroll">
        {filteredItems && filteredItems.length !== 0 ? (
          <GridContainer items={filteredItems} />
        ) : (
          <Text
            fontWeight="600"
            color="gray.400"
            textAlign="center"
            marginTop="25px"
          >
            No Uploads
          </Text>
        )}
      </Box>
    </Container>
    }
    </>
  );
};

export default UserProfileCard;
