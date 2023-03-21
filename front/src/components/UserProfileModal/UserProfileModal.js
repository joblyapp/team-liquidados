import React, { useState } from "react";
import Modal from "react-modal";
import "./UserProfileModal.css";
import UserIcon from "../../Images/icons/user.svg";
import EditIcon from "../../Images/icons/editSimple.svg";

function UserProfileModal(props) {
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [profilePicture, setProfilePicture] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to update user profile goes here
    props.onRequestClose();
  };

  const customStyles = {
    content: {
      borderRadius: "10px",
      width: "30%",
      margin: "auto auto",
      height: "70vh",
    },
  };

  function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Edit Profile Modal"
      style={customStyles}
      overlayClassName="Overlay"
    >
      <h2>Editar Perfil</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="profile-picture-container ">
          <div className="profile-picture">
            <img className="user-icon" src={UserIcon} alt="User Icon" />
          </div>
          <button
            type="button"
            className="custom-file-upload"
            onClick={() => {
              document.getElementById("file-upload").click();
            }}
          >
            <img
              style={{ marginRight: "5px" }}
              src={EditIcon}
              alt="icono editar"
            />
            Editar Foto{" "}
          </button>

          <input
            id="file-upload"
            type="file"
            onChange={handleProfilePictureChange}
          />
        </label>
        <label className="inputs">
          Nombre y apellido:
          <input
            className="input"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="inputs">
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <div className="action-buttons">
          <button
            className="cancelar"
            type="button"
            onClick={props.onRequestClose}
          >
            Cancelar
          </button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </Modal>
  );
}

export default UserProfileModal;
