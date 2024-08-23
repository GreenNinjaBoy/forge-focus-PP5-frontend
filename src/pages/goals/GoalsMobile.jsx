import { useContext, useState } from "react";
import { Accordion, 
        Card,
        UseAccordionToggle,
        AccordionContext } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GoalsArea from "./GoalsArea";



const GoalsMobile = ( {id}) => {
  const [keyParameters] = useState({
    goals_id: id,
  })

  const { goals_id } = keyParameters;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div>
      <button aria-label="Click to return to the previous page" onClick={handleBack}>
      </button>

      <GoalsArea id={goals_id} />

      <div>
        <p>Tasks will go here</p>
      </div>
    </div>
  )
}

export default GoalsMobile