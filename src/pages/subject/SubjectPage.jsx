import "./SubjectPage.css";
import ProfessorsComponent from "../../components/professors/ProfessorsComponent";
import { getSubject } from "../../api/SubjectApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserPlus } from 'react-icons/fa';
import { addSubjectForProfessor } from "../../api/SubjectApi";

function SubjectPage() {
  if (!localStorage.getItem('token')) {
    window.location.href = '/login';
  }

  let { subjectName } = useParams();
  const [subjectData, setSubjectData] = useState(null);
  const [professorSubjects, setProfessorSubjects] = useState([]);
  const [isProfessorAssociated, setIsProfessorAssociated] = useState(false);
console.log(subjectData)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSubject(subjectName);
      setSubjectData(data);
    };

    fetchData();
  }, [subjectName]);

  const handleAddSubject = async () => {
    try {
      const data = {
        subjectId: subjectData.subject.id,
        professorId: JSON.parse(localStorage.getItem("user")).id
      };
      let response = await addSubjectForProfessor(data);
      console.log(response)
      alert("Čestitamo, postali ste novi instruktor za ovaj predmet")
      window.location.reload();
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <>
      <div className="subjectPage-wrapper">
        <div className="subjectPage-container">
          <div>
            <div className="subjectPage-title">
              <h1>{subjectData ? subjectData.subject.title : "Ime predmeta"}
              {JSON.parse(localStorage.getItem("user")).status === 'professor' && (
                  <FaUserPlus onClick={handleAddSubject} className="join-icon"  style={{ fontSize: '2rem',  marginLeft: '20px' }}/>
                )}</h1>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginLeft: '8px', fontSize: "25px"}}> 
                  {subjectData ? subjectData.subject.description : "Opis predmeta"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2>Instruktori dostupni za ovaj predmet:</h2>
            <ProfessorsComponent
              professors={subjectData ? subjectData.professors : []}
              showSubject={false}
              showInstructionsCount={true}
            />
          </div>
        </div>
    
      </div>
    </>
  );
}

export default SubjectPage;