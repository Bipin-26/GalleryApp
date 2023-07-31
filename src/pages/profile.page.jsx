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
  MenuItem
} from "@chakra-ui/react";
import { useAuthContext } from "../contexts/auth.context";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CiMenuKebab } from 'react-icons/ci'
// import GridContainer from "../components/grid-container.component";
import {  useContext, useEffect } from "react";
import { GalleryContext } from "../contexts/gallery.context";
import CardComponent from "../components/card.component";
import Firestore from "../utils/firestore.utils";
// import EditPage from "./edit.page";

const { deleteDoc } = Firestore;

// const AlertBox = () => {
//   const { setDisplayAlert, isOpen, onClose } = useContext(GalleryContext)
//   const { cancelRef } = useRef()
//   return (
//     <AlertDialog
//         motionPreset="slideInBottom"
//         isOpen={isOpen}
//         leastDestructiveRef={cancelRef}
//         onClose={onClose}
//         isCentered
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize='lg' fontWeight='bold'>
//               Delete Post
//             </AlertDialogHeader>

//             <AlertDialogBody>
//               Are you sure? 
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button ref={cancelRef} onClick={() => {setDisplayAlert(false); onClose(); }}>
//                 Cancel
//               </Button>
//               <Button colorScheme='red' onClick={() => {setDisplayAlert(false); onClose(); }} ml={3}>
//                 Delete
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>
//   )
// }

const Profile = ({ items }) => {
  // console.log("YOU ARE INSIDE PROFILE PAGE")
  const { logout, currentUserDetail } = useAuthContext();
  const navigate = useNavigate();
  // const [isEditing, setIsEditing] = useState(false)
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

  const { onModalHandler, modalItem, isOpen, onClose, onOpen, setModalItem, loadImages } =
    useContext(GalleryContext);

  useEffect(() => {
    if (modalItem != null) {
      const updatedModalItem = items.filter((item) => item.id === modalItem.id);
      setModalItem(updatedModalItem[0]);
    }
  }, [items]);



  const onDeleteHandler = () => {
    // console.log("YOU ARE INSIDE DELETE FUNCTION IN PROFILE")
    deleteDoc(modalItem.id, "gallery").then(loadImages)
  }
  return (
    <>
      <Container margin="0 0 95px 0" padding="0">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          position="fixed"
          top="0"
          bg="white"
          height="220px"
          width="100%"
          paddingBottom="10px"
          borderBottom="2px solid gray"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            padding="15px"
          >
            {currentUserDetail && (
              <Box position="relative" display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap='5px' >
                <Image
                  src={currentUserDetail.photoURL}
                  boxSize="100px"
                  borderRadius="50%"
                />
                <Text fontWeight='600' fontSize='17px' >{currentUserDetail.username}</Text>
              </Box>
            )}
            <Box display="flex" flexDirection="column" alignItems="center">
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
          top="220px"
          padding="10px 0"
          bg="white"
          width="100%"
        >
          Your Uploads
        </Text>
        <Box marginTop="265px">
          {
          currentUserUploadedDates.length > 0 ? (
            currentUserUploadedDates.map((uploadDate) => {
              return (
                <>
                  <Text
                    fontWeight="600"
                    color="gray"
                    marginBottom="5px"
                    marginLeft="5px"
                    fontSize="15px"
                  >
                    {console.log(uploadDate)}
                    {uploadDate}
                  </Text>
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={1}
                    // bg="gray.200"
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
                            <>
                              {/* <GridContainer items={item} /> */}
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
                            </>
                          );
                        }
                      }
                    })}
                  </Grid>
                  {
                    modalItem && 
                  <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent margin="0 5px" padding="0" paddingTop="10px">
                      <Box position='absolute' right='2px' display='flex' justifyContent='center' maxWidth='fit-content'>
                        <Menu>
                          <MenuButton><CiMenuKebab size='25px' /></MenuButton>
                          <MenuList>
                            <MenuItem bg='none' onClick={()=>{navigate({pathname: '/home/edit-post',
                            search:`${createSearchParams({id:modalItem.id})}`
                          })}} >
                              Edit
                            </MenuItem>
                            <MenuItem bg='none' onClick={onDeleteHandler} >
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
                  }
  
                </>
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
    </>
  );
};

export default Profile;
