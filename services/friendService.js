import axios from "axios";
var friendsService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends",
};
friendsService.getFriend = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/friends?pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
friendsService.getEditFriend = (friendId) => {
  const config = {
    method: "GET",
    url: friendsService.endpoint + "/" + friendId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
friendsService.deleteFriend = (friendId) => {
  const config = {
    method: "DELETE",
    url: friendsService.endpoint + "/" + friendId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    console.log("in the middle");
    return friendId;
  });
};
friendsService.addFriend = (payload) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
friendsService.editFriend = (id, payload) => {
  const config = {
    method: "PUT",
    url: friendsService.endpoint + "/" + id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    console.log("in the middle");
    return payload;
  });
};
friendsService.searchFriend = (pageIndex, pageSize, searchQuery) => {
  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/friends/search?pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize +
      "&q=" +
      searchQuery,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export default friendsService;
