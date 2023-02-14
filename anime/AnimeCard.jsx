import React from "react";
import { useNavigate } from "react-router-dom";
function Friendcard(props) {
  const onLocalFriendClicked = (evt) => {
    evt.preventDefault();
    props.onFriendClicked(props.friend, evt);
    console.log("entry", props.friend);
  };
  const navigate = useNavigate();
  const aFriend = props.friend;
  const onEditFriendClicked = (evt) => {
    evt.preventDefault();
    const state = { type: "EDIT_FRIEND", payload: props.friend };
    navigate("/addFriends/" + aFriend.id, { state: state });
  };
  console.log(aFriend);
  return (
    <div className="card" style={{ width: "14rem", margin: "10px" }}>
      <img src={aFriend.primaryImage.imageUrl} alt={aFriend.title} />
      <div className="card-body " style={{ textAlign: "center" }}>
        <h5 className="card-title">{aFriend.title}</h5>
        <p className="card-text">{aFriend.bio}</p>
        <h6 className="text-muted">{aFriend.summary}</h6>
        <div
          className="btn-group justify-content-center"
          role="group"
          style={{ margin: "10px" }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onEditFriendClicked}
          >
            Edit
          </button>
          <div>
            <button
              onClick={onLocalFriendClicked}
              type="submit"
              className="btn btn-secondary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(Friendcard);
