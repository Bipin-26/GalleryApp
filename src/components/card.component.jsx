import {
  Card,
  CardBody,
  Image,
  Container,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { GalleryContext } from "../contexts/gallery.context";
import { useAuthContext } from "../contexts/auth.context";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import getTimeDifference from "../utils/time.utils";


const CardComponent = ({ item }) => {

  const { path, caption, id, likedBy, uploadedBy, uploadedAt, previewType } = item;
  const { username, getUserDetailsById } = useAuthContext();
  const { imageLikeHandler } = useContext(GalleryContext)
  const navigate = useNavigate()
  const url = useLocation()
  const userDetail = getUserDetailsById(uploadedBy);
  const hiddenLikedUsers = likedBy.length - 1;
  const liked_user_count = hiddenLikedUsers <= 1 ? `${hiddenLikedUsers} other` : `${hiddenLikedUsers} others`;
  const {time, type} = getTimeDifference(uploadedAt);
  const uploadedPostTImeDifference = () => {
    if (type === 'm'){
      if(time === 1){
        return `${time} minute ago`
      }
      return `${time} minutes ago`
    }
    else if (type === 'h'){
      if(time === 1){
        return `${time} hour ago`
      }
      return `${time} hours ago`
    }
    else if (type === 'd'){
      if(time === 1){
        return `${time} day ago`
      }
      return `${time} days ago`
    }
    else if (type === 'w'){
      if(time === 1){
        return `${time} week ago`
      }
      return `${time} weeks ago`
    }
    else{
      return "Just now"
    }
  }

  const handleUserClicks = () => {
    if(userDetail.username === username){
      navigate('/home/profile')
    }
    if(url.pathname !== '/home/uploadedBy' && userDetail.username !== username){
      navigate({
        pathname:'/home/uploadedBy',
        search:`${createSearchParams({user:userDetail.username})}`
      })
    }
  }

  const doubleClickHandler = (e) => {
    if(e.detail === 2){
      const liked = likedBy.find(user => user === username)
      if(!liked){
        imageLikeHandler(id, username)
      }
    }
  }

  return (
    <>
      <Container marginBottom="10px" padding='0'>
        <Box display="flex" alignItems="center" gap="5px" marginBottom="5px" marginLeft='5px'>
          <Avatar width="30px" height="30px" src={userDetail.photoURL} />
          <Text fontWeight='600' onClick={handleUserClicks} >{userDetail.username}</Text>
        </Box>
        <Card margin="0" padding="0" bg="#000" w="100%" h="400px" borderRadius='none' >
          <CardBody margin="0" padding="0" height="inherit">
            <Image src={path} boxSize="100%" objectFit={previewType} onClick={doubleClickHandler} />
          </CardBody>
        </Card>
        {
            likedBy.length > 0 && 
       <Box display='flex' marginLeft='5px' >
        {
            hiddenLikedUsers === 0 ? <Text>{`Liked by ${likedBy[0]}`}</Text> : <Text>{`Liked by ${likedBy[0]} and ${liked_user_count}`}</Text>
        }
        
       </Box>
        }
        <Box marginTop="5px" display="flex" alignItems="start" gap="10px" marginLeft='5px'>
          {likedBy.find((user) => user === username) ? (
            <FaHeart size="25px" fill="red" />
          ) : (
            <FaRegHeart size="25px" onClick={() => imageLikeHandler(id,username)} />
          )}
          <FaRegComment size="25px" onClick={() => { navigate(`/home/${id}/comments`) }} />
        </Box>
        {likedBy.length === 1 ? <Text fontWeight='600' marginLeft='5px'>{`${likedBy.length} like`}</Text> : <Text fontWeight='600' marginLeft='5px' >{`${likedBy.length} likes`}</Text>}
        <Box marginLeft='5px' display='flex' alignItems='center' gap='3px' >
          <Text fontWeight='600' >{userDetail.username}</Text>
          <Text width='100%' >{caption}</Text>
        </Box>
        <Text marginLeft='5px' fontSize='13px' color='gray.500' >{uploadedPostTImeDifference()}</Text>
      </Container>
    </>
  );
};

export default CardComponent;
