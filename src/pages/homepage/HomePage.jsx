import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubjects } from "../../api/SubjectApi";
import { getProfessors , getNewProfessors} from "../../api/ProfessorApi";
import ProfessorsComponent from "../../components/professors/ProfessorsComponent";
import BestProfessorsGraph from "../../components/design/ProfessorGraph";
import "./HomePage.css";

function HomePage() {
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      const fetchedProfessors = await getNewProfessors();
      setProfessors(fetchedProfessors.professors);
    };

    fetchProfessors();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await getSubjects();
      setSubjects(response.subjects);
    };

    fetchSubjects();
  }, []);

  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  return (
    <>
      <div className="homepage-wrapper">
        <div className="homepage-container">
          <div>
            <div className="title">
              <img src="/logo/dotGet-logo.svg" alt="" />
              <h2>instrukcije po mjeri!</h2>
            </div>

            {subjects.slice(0, 8).map((subject) => (
              <Link
                to={`/subject/${subject.url}`}
                key={subject.url}
                className="link-no-style"
              >
                <div className="predmet">
                  <h2 className="predmet-text">{subject.title}</h2>
                  <p className="predmet-text">
                    {subject.description.length > 100 
                      ? `${subject.description.slice(0, 100)}...` 
                      : subject.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="professors">
           <div className="title2"> <img src="/logo/dotGet-logo.svg" alt="" />
              <h2 className="professorH2">profesori:</h2>
              </div> 
         
            <ProfessorsComponent
              professors={professors}
              showSubject={true}
              showInstructionsCount={false}
            />
          </div>
        </div>
      </div>


      <div className="homepage-graph">
        <BestProfessorsGraph />
      </div>
    </>
  );
}

export default HomePage;
