import {
  Container,
  Box,
  Image,
  Button,
  Grid,
  GridItem,
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { useAuthContext } from "../contexts/auth.context";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { Fragment, useContext, useEffect } from "react";
import { GalleryContext } from "../contexts/gallery.context";
import CardComponent from "../components/card.component";
import Firestore from "../utils/firestore.utils";

const { deleteDoc } = Firestore;

const Profile = ({ items }) => {
  const { state } = useContext(GalleryContext);
  const { logout, currentUserDetail } = useAuthContext();
  const navigate = useNavigate();
  const getImageUploadedDates = (items) =>
    Array.from(
      new Set(
        items
          .filter((item) => item.uploadedBy === currentUserDetail.id)
          .map((item) => {
            let d = item.uploadedAt.split(" ");
            return `${d[1]}, ${d[2]} ${d[3]}`;
          })
      )
    );
  const currentUserUploadedDates = getImageUploadedDates(items);
  const currentUserUploads = items
    .filter((item) => item.uploadedBy === currentUserDetail.id)
    .sort((a, b) => {
      let dateA = new Date(a.uploadedAt);
      let dateB = new Date(b.uploadedAt);
      return dateA - dateB;
    });
  const logOutHandler = () => {
    logout();
    navigate("/");
  };

  const {
    onModalHandler,
    modalItem,
    isOpen,
    onClose,
    onOpen,
    setModalItem,
    loadImages,
  } = useContext(GalleryContext);

  useEffect(() => {
    if (modalItem != null) {
      const updatedModalItem = items.filter((item) => item.id === modalItem.id);
      setModalItem(updatedModalItem[0]);
    }
  }, [items]);

  const onDeleteHandler = () => {
    deleteDoc(modalItem.id, "gallery").then(loadImages);
  };
  return (
    <>
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
            <Container margin="0 0 95px 0" padding="0">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                position="fixed"
                top="0"
                bg="white"
                width="100%"
                paddingBottom="10px"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-evenly"
                  padding="15px"
                >
                  {currentUserDetail && (
                    <Box
                      position="relative"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      gap="5px"
                    >
                      <Image
                        src={currentUserDetail.photoURL}
                        boxSize="100px"
                        borderRadius="50%"
                      />
                      <Text fontWeight="600" fontSize="17px">
                        {currentUserDetail.username}
                      </Text>
                    </Box>
                  )}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Text fontSize="20px" fontWeight="600">
                      Uploads
                    </Text>
                    <Text fontSize="20px" fontWeight="500">
                      {currentUserUploads.length}
                    </Text>
                  </Box>
                </Box>
                <Button
                  colorScheme="blue"
                  size="sm"
                  margin="0 10px"
                  onClick={logOutHandler}
                >
                  <Text fontSize="17px">Logout</Text>
                </Button>
              </Box>
              <Text
                fontSize="17px"
                fontWeight="600"
                textAlign="center"
                position="fixed"
                top="200px"
                padding="10px 0"
                bg="white"
                width="100%"
              >
                Your Uploads
              </Text>
              <Box marginTop="250px">
                {currentUserUploadedDates.length > 0 ? (
                  currentUserUploadedDates.map((uploadDate) => {
                    return (
                      <Fragment key={uploadDate}>
                        <Text
                          fontWeight="600"
                          color="gray"
                          marginBottom="5px"
                          marginLeft="5px"
                          fontSize="15px"
                        >
                          {uploadDate}
                        </Text>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap={1}
                          marginBottom="10px"
                        >
                          {currentUserUploads.map((item) => {
                            const imageUploadDate = `${
                              item.uploadedAt.split(" ")[1]
                            }, ${item.uploadedAt.split(" ")[2]} ${
                              item.uploadedAt.split(" ")[3]
                            }`;
                            {
                              if (imageUploadDate === uploadDate) {
                                return (
                                    <GridItem
                                      key={item.id}
                                      w="100%"
                                      h="200px"
                                      onClick={onOpen}
                                    >
                                      <Image
                                        src={item.path}
                                        objectFit="cover"
                                        boxSize="100%"
                                        onClick={() => onModalHandler(item)}
                                      />
                                    </GridItem>
                                );
                              }
                            }
                          })}
                        </Grid>
                        {modalItem && (
                          <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent
                              margin="0 5px"
                              padding="0"
                              paddingTop="10px"
                            >
                              <Box
                                position="absolute"
                                right="2px"
                                display="flex"
                                justifyContent="center"
                                maxWidth="fit-content"
                              >
                                <Menu>
                                  <MenuButton>
                                    <CiMenuKebab size="25px" />
                                  </MenuButton>
                                  <MenuList>
                                    <MenuItem
                                      bg="none"
                                      onClick={() => {
                                        navigate({
                                          pathname: "/home/edit-post",
                                          search: `${createSearchParams({
                                            id: modalItem.id,
                                          })}`,
                                        });
                                      }}
                                    >
                                      Edit
                                    </MenuItem>
                                    <MenuItem
                                      bg="none"
                                      onClick={onDeleteHandler}
                                    >
                                      Delete
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              </Box>
                              <ModalBody margin="0" padding="0">
                                <CardComponent item={modalItem} />
                              </ModalBody>
                            </ModalContent>
                          </Modal>
                        )}
                      </Fragment>
                    );
                  })
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
              </Box>
            </Container>
          ) : (
            <Text>Something Went Wrong</Text>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
