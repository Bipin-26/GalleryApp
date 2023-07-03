export const getCurrentTime = () => new Date();

const getTimeDifference = (serverTime) => {
  const currentTime = getCurrentTime();
  const timeDifference = currentTime - new Date(serverTime).getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  if (weeks !== 0) {
    return { time: weeks, type: "w" };
  } else if (days !== 0) {
    return { time: days, type: "d" };
  } else if (hours !== 0) {
    return { time: hours, type: "h" };
  } else if (minutes !== 0) {
    return { time: minutes, type: "m" };
  } else {
    return { time: seconds, type: "s" };
  }
};

export default getTimeDifference;
