import axios from "axios";

export const handleLogin = async (data, user) => {
  try {
    // Send a POST request to the /login/student endpoint
    const response = await fetch(
      import.meta.env.VITE_REACT_BACKEND_URL + "/login/" + user,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response)
    // Check if the request was successful
    if (response.ok) {
      const result = await response.json();

      // Clear previous token and user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log(result)
      // Save the token to the local storage
      localStorage.setItem("token", result.token);
      var status = ""
      if (user === "student") {
        status = "student";
      } else {
        status = "professor";
      }
      console.log(user)
      const userData = user === "student" ? result.user : result.user;
      console.log(userData)
      userData.status = status;
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
      window.location.href = "/";
    } else {
      console.error("Failed to login");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export const handlerRegister = async (formData, user) => {
  try {
    console.log(import.meta.env.VITE_REACT_BACKEND_URL + "/register/" + user)
    console.log(JSON.stringify(formData))
    const response = await axios.post(
      import.meta.env.VITE_REACT_BACKEND_URL + "/register/" + user,
      formData,
      {}
    );

    if (response.status === 201 || response.status === 200) {
      console.log(user + " registered successfully");
      window.location.href = "/login";
    } else {
      console.error(response.status + " " + response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};
