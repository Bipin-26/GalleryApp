import {
  Container,
  Input,
  Box,
  Text,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useAuthContext } from "../contexts/auth.context";
import { createSearchParams, useNavigate } from "react-router-dom";
import GridContainer from "../components/grid-container.component";
import { GalleryContext } from "../contexts/gallery.context";


const Search = ({ items }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredUserList, setFilteredUserList] = useState(null);
  const { username } = useAuthContext();
  const { userList } = useAuthContext();
  const { state } = useContext(GalleryContext);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (userList !== null && e.target.value.length !== 0) {
      setSearchInput(e.target.value.split(" ").join("").toLowerCase());
      const filteredUser = userList.filter((user) => {
        return (
          user.username !== username && user.username.includes(searchInput)
        );
      });
      setFilteredUserList(filteredUser);
    } else {
      setSearchInput("");
      setFilteredUserList(null);
    }
  };
  const onHandleFilteredItems = (user) => {
    navigate({
      pathname: "/home/uploadedBy",
      search: `${createSearchParams({ user: user.username })}`,
    });
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="10px 0"
        borderBottom="1px solid grey"
        position="fixed"
        top="0"
        bg="white"
        width="100%"
      >
        <Input
          placeholder="Search"
          variant="unstyled"
          padding="10px 15px"
          width="95%"
          bg="white"
          borderRadius="20px"
          border="1px solid grey"
          onChange={handleSearch}
        />
      </Box>
      <Box margin="0 15px" bg="white" position="absolute" width="90%">
        {filteredUserList &&
          filteredUserList.map((user) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                padding="10px"
                gap="10px"
                marginBottom="5px"
                onClick={() => onHandleFilteredItems(user)}
              >
                <Avatar width="35px" height="35px" src={user.photoURL} />
                <Text fontSize="17px" fontWeight="600">
                  {user.username}
                </Text>
              </Box>
            );
          })}
      </Box>
      {state.isLoading ? (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          {state.error == null ? (
            <Container margin="70px 0" padding="0">
              {items.length > 0 ? (
                <GridContainer items={items} />
              ) : (
                <Text
                  fontWeight="600"
                  color="gray.400"
                  textAlign="center"
                  paddingTop="15px"
                >
                  No Uploads
                </Text>
              )}
            </Container>
          ) : (
            <Text>Something Went Wrong...</Text>
          )}
        </>
      )}
    </>
  );
};

export default Search;
