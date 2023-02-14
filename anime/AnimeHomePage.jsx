import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "rc-pagination/assets/index.css";
import friendsService from "../services/friendService";
import FriendCard from "./FriendCard";

function Friends() {
  const [pageData, setPageData] = useState({
    arrayOfPeople: [],
    peopleComponents: [],
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleFriends, setToggle] = useState(true);

  useEffect(() => {
    console.log("firing useEffect for get friends");
    friendsService
      .getFriend(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendSuccess)
      .catch(onGetFriendError);
  }, [pageData.pageIndex, pageData.pageSize]);

  const onGetFriendSuccess = (response) => {
    console.log(response);
    let arrayOfPeeps = response.data.item.pagedItems;
    console.log(arrayOfPeeps);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfPeople = arrayOfPeeps;
      pd.peopleComponents = arrayOfPeeps.map(mapFriend);
      pd.totalCount = response.data.item.totalCount;
      return pd;
    });
  };
  const onGetFriendError = (err) => {
    console.error(err);
  };

  //********************* searchFriends *************************
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("submit is firing");
    if (searchQuery === "") {
      friendsService
        .getFriend(pageData.pageIndex, pageData.pageSize)
        .then(onGetFriendSuccess)
        .catch(onGetFriendError);
    } else {
      friendsService
        .searchFriend(0, 10, searchQuery)
        .then(onSearchFriendSuccess)
        .catch((error) => console.error(error));
    }
  };
  const onSearchFriendSuccess = (response) => {
    console.log(response); // log the response object
    let searchResult = response.data.item.pagedItems;
    console.log("onSearch Function searchResult: ", searchResult);

    setPageData((prevState) => {
      console.log(prevState);
      let pd = { ...prevState };
      pd.arrayOfPeople = searchResult;
      console.log(pd.arrayOfPeople);
      pd.peopleComponents = searchResult.map((result) => {
        return (
          <FriendCard
            friend={result}
            key={"ListA-" + result.id}
            onFriendClicked={onDeleteRequested}
          />
        );
      });
      return pd;
    });
  };
  //********************* Toggle friend & Add Friend *********************
  const onToggleClick = () => {
    setToggle((prevState) => {
      return !prevState;
    });
  };

  const onAddFriendClick = () => {};

  //********************* Delete Friend *********************
  const onDeleteRequested = useCallback((myPerson, eObj) => {
    console.log(myPerson.id, { myPerson, eObj });
    const handler = getDeleteSuccessHandler(myPerson.id);
    friendsService.deleteFriend(myPerson.id).then(handler).catch(onDeleteError);
  }, []);
  //********************* Delete success handler *********************
  const getDeleteSuccessHandler = (idToBeDeleted) => {
    console.log("getDeleteSuccessHandler", idToBeDeleted);
    return () => {
      console.log("onDeleteSuccess", idToBeDeleted);
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfPeople = [...pd.arrayOfPeople];
        const idxOf = pd.arrayOfPeople.findIndex((person) => {
          let result = false;
          if (person.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });
        if (idxOf >= 0) {
          pd.arrayOfPeople.splice(idxOf, 1);
          pd.peopleComponents = pd.arrayOfPeople.map(mapFriend);
        }
        return pd;
      });
    };
  };

  const onDeleteError = (err) => {
    console.error(err);
  };

  //********************* mapFriend *********************
  const mapFriend = (aFriend) => {
    return (
      <FriendCard
        friend={aFriend}
        key={"ListA-" + aFriend.id}
        onFriendClicked={onDeleteRequested}
      />
    );
  };
  return (
    <div className="container" style={{ padding: "10px", textAlign: "left" }}>
      <div>
        <form style={{ textAlign: "right" }}>
          <input type="text" onChange={handleSearchInputChange} />
          <button type="submit" onClick={handleSearchSubmit}>
            Search
          </button>
        </form>
      </div>
      <h3>Anime characters</h3>
      <div className="container" style={{ padding: "10px", textAlign: "left" }}>
        <button onClick={onToggleClick} className="btn btn-dark">
          Toggle anime characters!
        </button>
      </div>
      <div className="container" style={{ padding: "10px", textAlign: "left" }}>
        <Link to="/addfriends">
          <button onClick={onAddFriendClick} className="btn btn-warning">
            Add characters
          </button>
        </Link>
      </div>
      <div className="row" style={{ textAlign: "left" }}>
        {toggleFriends && pageData.peopleComponents}
      </div>
    </div>
  );
}

export default Friends;
