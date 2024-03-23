export async function getProfessors() {
  try {
    const response = await fetch(
      import.meta.env.VITE_REACT_BACKEND_URL + "/professors",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const professors = await response.json();
    return professors;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

export async function getNewProfessors() {
  try {
    const response = await fetch(
      import.meta.env.VITE_REACT_BACKEND_URL + "/newprofessors",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const professors = await response.json();
    return professors;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

export async function sentInstructionDate(selectedDate, professorId, studentId) {
  try {
    
      const data = JSON.stringify({
        studentId : JSON.parse(localStorage.getItem("user")).id,
        professorId: professorId,
        dateTime: selectedDate});
        console.log(data)
      const response = await fetch(
          import.meta.env.VITE_REACT_BACKEND_URL + "/subject/instruction",
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                  studentId : studentId,
                  professorId: professorId,
                  dateTime: selectedDate,
              })
          }
      );
      if (!response.ok) {
        alert("Neuspješno dodavanje termina instrukcija")
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const date = await response.json();
      console.log(date)
      return date;
  } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
  }

}

export async function getInstructionsForProfessor(professorId) {
  try {
    let user = JSON.parse(localStorage.getItem('user'));
    let endpoint = "";
   
    if(user.status === "student"){
      endpoint = `${import.meta.env.VITE_REACT_BACKEND_URL}/students/myinstructions/${professorId}`
    }else if(user.status === "professor"){
      endpoint = `${import.meta.env.VITE_REACT_BACKEND_URL}/professors/myinstructions/${professorId}`
    }
    console.log(endpoint)
    const response = await fetch(endpoint,
      {
        method: "GET",
        headers: {
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const instructions = await response.json();
    return instructions;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}