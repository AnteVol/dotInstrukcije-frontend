import React, { useState, useEffect } from "react";
import ProfessorsComponentProfile from "../../components/professors/ProfessorsComponentProfile";
import "./ProfilePage.css";
import { getInstructionsForProfessor } from "../../api/ProfessorApi";
import MyCalendar from '../../components/design/Calendar';
import { FaCalendar } from 'react-icons/fa'; 

function ProfilePage() {
  const [passedInstructions, setPassedInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false); 

  useEffect(() => {
    async function fetchPassedInstructions() {
      try {
        const instructions = await getInstructionsForProfessor(user.id);
        setPassedInstructions(instructions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passed instructions:", error);
        setLoading(false);
      }
    }

    fetchPassedInstructions();
  }, []);

  if (!localStorage.getItem("token")) {
    window.location.href = '/login';
  }

  let user = JSON.parse(localStorage.getItem('user'));

  let events = [];
  if (passedInstructions.pending != null) {
    events = [
      ...passedInstructions.pending.map(professor => ({
        title: `${professor.name} ${professor.surname}`,
        start: new Date(professor.time), 
        end: new Date(new Date(professor.time).getTime() + 2 * 60 * 60 * 1000),
        color: 'blue'
      })),
      ...passedInstructions.upcoming.map(professor => ({
        title: `${professor.name} ${professor.surname}`,
        start: new Date(professor.time), 
        end: new Date(new Date(professor.time).getTime() + 2 * 60 * 60 * 1000),
        color: 'green' 
      })),
      ...passedInstructions.passed.map(professor => ({
        title: `${professor.name} ${professor.surname}`,
        start: new Date(professor.time), 
        end: new Date(new Date(professor.time).getTime() + 2 * 60 * 60 * 1000),
        color: 'red'
      }))
    ];
  }

  return (
    <>
      <div className="profilepage-wrapper">
        <div className="profilepage-container">
          <div className="student-info">
            <img src={user.profilePictureUrl} className="student-image" />
            <div>
              <h1>{user.name} {user.surname}</h1>
              <p>{user.description}</p>
            </div>
          </div>

          <div>
            <FaCalendar 
              size={30} 
              onClick={() => setShowCalendar(!showCalendar)} 
              style={{ cursor: 'pointer' }} 
            />
            {showCalendar && (
              <div className="calendar-popout">
                <MyCalendar events={events} />
              </div>
            )}
          </div>

          <div>
          <h2>Poslani zahtjevi za instrukcijama:</h2>
              {passedInstructions.pending && passedInstructions.pending.length > 0 && (
                <ProfessorsComponentProfile
                  professors={passedInstructions.pending}
                  showTime={true}
                  showSubject={true}
                  buttonText={JSON.parse(localStorage.getItem('user'))?.status === "professor" ? "Odobri" : "Promijeni"}
                  buttonVariant={"outlined"}
                />
              )}
          </div>

          {!passedInstructions.pending || passedInstructions.pending.length === 0 && (
            <p>Nema još zakazanih instrukcija u toj kategoriji</p>
          )}

          <div>
            <h2>Nadolazeće instrukcije:</h2>
            {passedInstructions.upcoming && passedInstructions.upcoming.length > 0 && (
              <ProfessorsComponentProfile
                professors={passedInstructions.upcoming}
                showTime={true}
                showSubject={true}
                buttonText={"Promijeni"}
                buttonVariant={"outlined"}
              />
            )}
          </div>
         
          {!passedInstructions.upcoming || passedInstructions.upcoming.length === 0 && (
            <p>Nema nadolazećih instrukcija u toj kategoriji</p>
          )}

          <div>
            <h2>Povijest instrukcija:</h2>
            {passedInstructions.passed && passedInstructions.passed.length > 0 && (
              <ProfessorsComponentProfile
                professors={passedInstructions.passed}
                showTime={true}
                showSubject={true}
                buttonText={"Ponovno dogovori"}
              />
            )}
          </div>

          {!passedInstructions.passed || passedInstructions.passed.length === 0 && (
            <p>Nema povijesti instrukcija u toj kategoriji</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
