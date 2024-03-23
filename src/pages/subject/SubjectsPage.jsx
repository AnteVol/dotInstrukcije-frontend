import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubjects } from "../../api/SubjectApi";
import "./SubjectsPage.css";

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await getSubjects();
      setSubjects(response.subjects);
    };

    fetchSubjects();
  }, []);

  return (
    <div className="subjects-page-wrapper">
      <h1>Svi predmet:</h1>
      <div className="subjects-container">
        {subjects.map((subject) => (
          <Link
            to={`/subject/${subject.url}`}
            key={subject.url}
            className="subject-link"
          >
            <div className="subject-card">
              <h2 className="subject-title">{subject.title}</h2>
              <p className="subject-description">
                {subject.description.length > 100
                  ? `${subject.description.slice(0, 100)}...`
                  : subject.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubjectsPage;
