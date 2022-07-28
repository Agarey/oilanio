import styles from "./ModeratorBlock.module.css";
import React, { useEffect, useState } from "react";
import { default as axios } from "axios";
import globals from "../../globals";
import { useRouter } from "next/router";
import LoadingBlock from "../LoadingBlock";
import ModerateCourseCard from "../ModerateCourseCard/ModerateCourseCard";
import CourseSearchResultIsNotDefind from "../CourseSearchResultIsNotDefind";
import CardsList from "./CardsList";
import Pagination from "./Pagination";
import ModerateCoursesSection from "../ModerateCoursesSection/ModerateCoursesSection";
import ModerateTutorCardsSection from "../ModerateTutorCardsSection/ModerateTutorCardsSection";

const ModeratorBlock = () => {
  const [currentSection, setCurrentSection] = useState();

  const getCurrentSection = () => {
    switch (currentSection) {
      case "choose":
        return <></>;
      case "course":
        return <ModerateCoursesSection />;
      case "tutor":
        return <ModerateTutorCardsSection />;
      default:
        return <></>;
    }
  };

  return (
    <div style={{width: '95%'}}>
      <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '3%',
                marginBottom: '3%',
                fontSize: 28,
                fontWeight: 700
            }}>
        <h3>Страница создания</h3>
        <select
          value={currentSection}
          onChange={(e) => setCurrentSection(e.target.value)}
        >
          <option value="choose">Выберите направление</option>
          <option value="course">Центр</option>
          <option value="tutor">Репетитор</option>
        </select>
      </div>
      <div>
                {
                    getCurrentSection()
                }
            </div>
    </div>
  );
};

export default ModeratorBlock;
