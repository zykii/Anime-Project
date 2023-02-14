import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import friendService from "../services/friendService";

function AddFriends() {
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    primaryImage: "",
  });
  const { id: friendId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect for Edit Friend is firing");
    if (state?.type === "EDIT_FRIEND" && state.payload) {
      console.log(
        "Payload for edit friend has passed, setFormData for Edit Friend"
      );
      setFormData((prevState) => {
        const newState = { ...prevState };
        newState.title = state.payload.title;
        newState.bio = state.payload.bio;
        newState.summary = state.payload.summary;
        newState.headline = state.payload.headline;
        newState.slug = state.payload.slug;
        newState.statusId = state.payload.statusId;
        newState.primaryImage = state.payload.primaryImage.imageUrl;
        return newState;
      });
    }
  }, [state]);
  // ************************************ Submit/Edit Button *********************************
  const onAddSubmit = (e) => {
    e.preventDefault();
    console.log("Submit is being clicked", formData);
    friendService.addFriend(formData).then(onAddSuccess).catch(onAddError);
  };
  const onEditSubmit = (e) => {
    e.preventDefault();
    console.log("Submit is being clicked", formData);
    friendService
      .editFriend(friendId, formData)
      .then(onEditSuccess)
      .catch(onEditError);
  };
  // ************************************* Success/Error Handlers *************************
  var onEditSuccess = (response) => {
    toastr.success("Edit Successful");
    console.log(friendId, response);
    navigate("/friends");
  };
  var onEditError = (response) => {
    toastr.error("Unable to edit friend");
    console.error({ error: response });
  };
  var onAddSuccess = (response) => {
    toastr.success("Add Friend Successful");
    console.log({ friendId: response.data.item });
    navigate("/friends");
  };
  var onAddError = (response) => {
    toastr.error("Unable to add friend");
    console.error({ error: response });
  };
  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    setFormData((prevState) => {
      console.log("updater onChange");
      const newUserObject = {
        ...prevState,
      };
      newUserObject[nameOfField] = newUserValue;
      return newUserObject;
    });
  };
  return (
    <div
      className="container mt-5 fs-2"
      style={{
        backgroundColor: "#f4f4f4",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5">
          <form>
            <h1 style={{ fontSize: "20px" }} className="text mb-3">
              {friendId ? "Edit a Friend" : "Add a Friend"}
            </h1>
            <div className="form-group mb-3" style={{ marginBottom: "10px" }}>
              <label
                style={{ fontSize: "16px" }}
                htmlFor="email"
                className="form-label"
              >
                Title
              </label>
              <input
                style={{
                  fontSize: "14px",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                type="text"
                className="form-control form-control-lg"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={onFormFieldChange}
              />
            </div>
            <div className="form-group mb-3" style={{ marginBottom: "10px" }}>
              <label
                style={{ fontSize: "16px" }}
                htmlFor="firstName"
                className="form-label"
              >
                Bio
              </label>
              <input
                style={{
                  fontSize: "14px",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                type="text"
                className="form-control form-control-lg"
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={onFormFieldChange}
              />
            </div>
            <div className="form-group mb-3" style={{ marginBottom: "10px" }}>
              <label
                style={{ fontSize: "16px" }}
                htmlFor="lastName"
                className="form-label"
              >
                Summary
              </label>
              <input
                style={{
                  fontSize: "14px",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                type="text"
                className="form-control form-control-lg"
                name="summary"
                placeholder="Summary"
                value={formData.summary}
                onChange={onFormFieldChange}
              />
            </div>
            <div className="form-group mb-3" style={{ marginBottom: "10px" }}>
              <label
                style={{ fontSize: "16px" }}
                htmlFor="password"
                className="form-label"
              >
                Headline
              </label>
              <input
                style={{
                  fontSize: "14px",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                type="text"
                className="form-control form-control-lg"
                name="headline"
                placeholder="Headline"
                value={formData.headline}
                onChange={onFormFieldChange}
              />
            </div>
            <div className="form-group mb-3" style={{ marginBottom: "10px" }}>
              <label
                style={{ fontSize: "16px" }}
                htmlFor="passwordConfirm"
                className="form-label"
              >
                Slug
              </label>
              <input
                style={{
                  fontSize: "14px",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                type="text"
                className="form-control form-control-lg"
                name="slug"
                placeholder="Slug"
                value={formData.slug}
                onChange={onFormFieldChange}
              />
            </div>
            <div className="form-group mb-3" style={{ marginBottom: "10px" }}>
              <label
                style={{ fontSize: "16px" }}
                htmlFor="avatarUrl"
                className="form-label"
              >
                Primary Image
              </label>
              <input
                style={{
                  fontSize: "14px",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                type="text"
                className="form-control form-control-lg"
                name="primaryImage"
                placeholder="Provide a Url to an Image"
                value={formData.primaryImage}
                onChange={onFormFieldChange}
              />
            </div>
            {/* If the state being passed has an edit, make the value for edit to be true */}
            {friendId ? (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onEditSubmit}
              >
                <i className="fa fa-save mr-2" />
                Edit Friend
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onAddSubmit}
              >
                <i className="fa fa-save mr-2" />
                Add Friend
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddFriends;
/*
asdgas
*/
