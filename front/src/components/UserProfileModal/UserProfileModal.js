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
   
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(
      URL.createObjectURL(document.getElementById("imageProfile").files[0])
    );
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdataUserImg = new FormData();
    formdataUserImg.append(
      "image",
      document.getElementById("imageProfile").files[0]
    );
    var imageUrl;

    axios
      .post("https://api.imgur.com/3/image/", formdataUserImg, {
        headers: {
          Authorization: "Client-ID 5a8be6a81450005",
        },
      })
      .then((res) => {
      
        const formData = {
          email: email,
          name: name,
          image: res.data.data.link,
        };

        

        axios
          .patch(`${process.env.REACT_APP_URL}/admin`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            // handle success response

           
            sessionStorage.setItem("name", res.data.name);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("avatar", res.data.image);

            props.onRequestClose();
          });
      });
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

  // Update styles for smaller screens
  if (window.innerWidth <= 1367) {
    customStyles.content.width = "30%";
    customStyles.content.height = "80vh";
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
              document.getElementById("imageProfile").click();
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
            name="imageProfile"
            id="imageProfile"
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
