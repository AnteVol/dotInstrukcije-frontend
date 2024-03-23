import React, { useState } from "react";
import "./SettingsPage.css";


function SettingsPage() {
  const [editableFields, setEditableFields] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    profilePicture: false,
  });

  const userType = localStorage.getItem("user");
  const userObject = JSON.parse(userType);
  const id = userObject.id;

  const [inputValues, setInputValues] = useState({
    name: userObject.name,
    surname: userObject.surname,
    email: userObject.email,
    password: userObject.password,
    profilePicture: userObject.profilePictureUrl,
  });

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const [changesSaved, setChangesSaved] = useState(false);


  const saveChanges = async () => {
    setChangesSaved(true);
    const endpoint = userObject.status === "professor" ? "/professor/edit" : "/student/edit";
    console.log(id)
    const data = {
      name: inputValues.name,
      surname: inputValues.surname,
      email: inputValues.email,
      password: inputValues.password,
      profilePictureUrl: inputValues.profilePicture,
    };
    const dataForUpdate = {
      id: userObject.id,
      name: inputValues.name,
      surname: inputValues.surname,
      email: inputValues.email,
      profilePictureUrl: inputValues.profilePicture,
      status: userObject.status
    };
    const newData = JSON.stringify(dataForUpdate);

    console.log(newData);
    try {
     
      const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(dataForUpdate)
      console.log(userObject)
      localStorage.removeItem("user")

      localStorage.setItem("user", newData);

      alert("Promjene su uspješno spremljene!");
      window.location.href = "/";
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      alert("Došlo je do pogreške prilikom spremanja promjena.");
    }
  };

  return (
    <div className="register-wrapper">
  <div className="register-container">
    <h1> Postavke za  {userObject.status === "student" ? `studenta` : "profesora"}</h1>
    <div class="profile-picture">
      <img src={userObject.profilePictureUrl} alt="Profile Picture"></img>
    </div>
    <form className="register-form">
      <div className="form-group">
        <label htmlFor="name">Ime</label>
        <div className="input-group">
          <input
            type="text"
            id="name"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
            disabled={!editableFields.name}
          />
          <button type="button" onClick={() => toggleEdit("name")}>
            {editableFields.name ? "Spremi" : "Uredi"}
          </button>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="surname">Prezime</label>
        <div className="input-group">
          <input
            type="text"
            id="surname"
            name="surname"
            value={inputValues.surname}
            onChange={handleInputChange}
            disabled={!editableFields.surname}
          />
          <button type="button" onClick={() => toggleEdit("surname")}>
            {editableFields.surname ? "Spremi" : "Uredi"}
          </button>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            value={inputValues.email}
            onChange={handleInputChange}
            disabled={!editableFields.email}
          />
          <button type="button" onClick={() => toggleEdit("email")}>
            {editableFields.email ? "Spremi" : "Uredi"}
          </button>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Lozinka</label>
        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChange}
            disabled={!editableFields.password}
          />
          <button type="button" onClick={() => toggleEdit("password")}>
            {editableFields.password ? "Spremi" : "Uredi"}
          </button>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="profilePicture">URL slike profila</label>
        <div className="input-group">
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={inputValues.profilePicture}
            onChange={handleInputChange}
            disabled={!editableFields.profilePicture}
          />
          <button type="button" onClick={() => toggleEdit("profilePicture")}>
            {editableFields.profilePicture ? "Spremi" : "Uredi"}
          </button>
            </div>
          </div>
        </form>
        <button className="save-changes-button" type="button" onClick={saveChanges} disabled={!Object.values(editableFields).some(Boolean) || changesSaved}>
          Spremi promjene
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
