import React, { useState } from "react";
import Modal from "react-modal";
import "./UserProfileModal.css";

function UserProfileModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      width: "40%",
      margin: "auto auto",
      height: "75vh",
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
      <form onSubmit={handleSubmit}>
        <label>
          Profile Picture:
          <input type="file" onChange={handleProfilePictureChange} />
        </label>
        <label>
          Nombre y apellido:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={props.onRequestClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
}

export default UserProfileModal;
