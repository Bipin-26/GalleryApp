import {
  Button,
  CloseButton,
  Container,
  FormControl,
  Input,
  Box,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Firestore from "../utils/firestore.utils";
import { useAuthContext } from "../contexts/auth.context";
import { GalleryContext } from "../contexts/gallery.context";
import { MdOutlineClose } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import getTimeDifference, { getCurrentTime } from "../utils/time.utils";

const { addComment, readUserDoc } = Firestore;
const CommentSection = ({ items }) => {
  const { currentUserDetail, username, userList } = useAuthContext();
  const { loadImages } = useContext(GalleryContext)
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("")
  const { id } = useParams();
  const item = items.find((item) => item.id === id);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const commentedAt = getCurrentTime().toString();
    addComment(id, "gallery", username, commentText, commentedAt).then(loadImages);
    setCommentText("");
  };
  return (
    <Container
      margin="0"
      padding="0"
      height="100vh"
      zIndex="9999"
      position="absolute"
      top="0"
      left="0"
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="15px 10px"
        borderBottom="1px solid gray"
        position="fixed"
        top="0"
        left="0"
        bg="white"
        zIndex="9999"
        height="65px"
      >
        <Text fontSize="22px" fontWeight="600">
          Comments
        </Text>
        <MdOutlineClose size="27px" onClick={() => navigate(-1)} />
      </Box>
      <Box overflow="scroll" marginTop='65px' marginBottom='65px' padding='10px' >
        <Box marginBottom="10px">
          {item && item.comments.length !== 0  ? item.comments.map((comment) => {
            const {time, type} = getTimeDifference(comment.commentedAt);
            const userProfilePic = userList!==null && userList.find(
              (user) =>
                user.username.split(" ").join("").toLowerCase() ===
                comment.username
            ).photoURL;
            return (
              <Box
                marginBottom="15px"
                display="flex"
                alignItems="center"
                gap="10px"
              >
                <Avatar alignSelf='start' marginTop='5px' width="35px" height="35px" src={userProfilePic} />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems='start'
                  width='85%'
                >
                    <Box display='flex' alignItems='center' gap='20px' >
                        <Text fontWeight='700'>{comment.username}</Text>
                        <Text fontWeight='400' color='gray.400' fontSize='14px'>{time}{type}</Text>
                    </Box>
                  <Text width='100%' color='' padding='0 5px 0 0' fontSize='14px' >{comment.commentText}</Text>
                </Box>
              </Box>
            );
          }) : <Text textAlign='center' fontSize='18px' >No Comments</Text>}
        </Box>
      </Box>
      <form onSubmit={handleOnSubmit}>
        <FormControl
          bg="white"
          height="65px"
          position="fixed"
          bottom="0"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          padding="10px"
          gap='5px'
        >
          {currentUserDetail ? <Avatar height='35px' width='35px' src={currentUserDetail.photoURL} /> : <Avatar height='35px' width='35px' />}
          
          <Input
            margin="0"
            name="comment"
            placeholder="Add Comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            padding="5px 10px"
            border='none'
            focusBorderColor="gray"
            _placeholder={{
              fontSize: "18px",
            }}
          />
          <Button type="submit" bg="none" padding="0" margin="0">
            <RiSendPlaneFill size="30px" />
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

export default CommentSection;
