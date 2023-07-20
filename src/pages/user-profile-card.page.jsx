import {
  Box,
  Container,
  Avatar,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useAuthContext } from "../contexts/auth.context";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import GridContainer from "../components/grid-container.component";

const UserProfileCard = ({ items }) => {


  const navigate = useNavigate();
  const { userList } = useAuthContext();
  const username = new URLSearchParams(window.location.search).get("user");

  const userDetails = userList.find((user) => {
    if (user.username === username) {
      return user;
    }
  });


  const filteredItems = items.filter((item) => {
    if (item.uploadedBy === userDetails.id) {
      return item;
    }
  });



  return (
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
          <Avatar size="40px" src={userDetails.photoURL} />

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
          fontStyle="italic"
          textAlign="center"
          fontSize="18px"
          fontWeight="600"
          color="gray.600"
        >{`${username}'s uploads`}</Text>
      </Box> 
      <Box margin="200px 0 65px 0" padding="0" overflow="scroll">
        {filteredItems && filteredItems.length != 0 ? (
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
  );
};

export default UserProfileCard;
