import React, { useState } from "react";
import Modal from "react-modal";
import "./UserProfileModal.css";
import UserIcon from "../../Images/icons/user.svg";
import EditIcon from "../../Images/icons/editSimple.svg";
import axios from "axios";

function UserProfileModal(props) {
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [image, setImage] = useState(sessionStorage.getItem("avatar"));

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(document.getElementById("image").files[0]));
    console.log(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = document.getElementById("image").files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    // formData.append("image", image);
    if (image) {
      formData.append("image", image);
    }
    try {
      console.log(formData);
      const res = await axios.patch(
        `${process.env.REACT_APP_URL}/admin`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // handle success response
      console.log(res.data);
      sessionStorage.setItem("name", res.data.name);
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem(
        "avatar",
        `http://localhost:8080/${res.data.image.path}`
      );
      props.onRequestClose();
    } catch (err) {
      console.error(err.response.data);
      // handle error response
    }
  };

  const customStyles = {
    content: {
      borderRadius: "10px",
      width: "25%",
      margin: "auto auto",
      height: "65vh",
      overflow: "hidden",
    },
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Edit Profile Modal"
      style={customStyles}
      overlayClassName="Overlay"
    >
      <h2>Editar Perfil</h2>
      <form
        method="post"
        className="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label className="profile-picture-container ">
          <div className="profile-picture">
            {image ? (
              image.includes("localhost:8080") ? (
                <img className="avatar" src={image} />
              ) : (
                <img className="avatar" src={image} />
              )
            ) : (
              <img className="user-icon" src={UserIcon} alt="User Icon" />
            )}
          </div>
          <button
            type="button"
            className="custom-file-upload"
            onClick={() => {
              document.getElementById("image").click();
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
            onChange={handleImageChange}
            name="image"
            id="image"
            type="file"
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
