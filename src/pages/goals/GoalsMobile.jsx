import { useContext, useState } from "react";
import { Accordion, 
        Card,
        useAccordionToggle,
        AccordionContext } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GoalsArea from "./GoalsArea";
import accStyles from './AccordionStyles.module.css';
import PropTypes from 'prop-types';

const GoalsMobile = ({ id }) => {
  const [keyParameters] = useState({
    goals_id: id,
  });

  const { goals_id } = keyParameters;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <div
        className={accStyles.Header}
        style={{
          color: isCurrentEventKey ? '#3c159c' : 'black',
          fontWeight: isCurrentEventKey ? 'bold' : 'normal',
        }}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i className="fa-solid fa-angle-down"></i>
        ) : (
          <i className="fa-solid fa-angle-up"></i>
        )}
      </div>
    );
  }

  return (
    <div>
      <button aria-label="Click to return to the previous page" onClick={handleBack}>
        Back
      </button>

      <GoalsArea id={goals_id} />

      <Accordion>
        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Goal Tasks</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>Tasks will go here</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

GoalsMobile.propTypes = {
  id: PropTypes.number, 
  children: PropTypes.string,
  


}
export default GoalsMobile;