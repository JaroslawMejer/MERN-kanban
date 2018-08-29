import React from 'react';
import PropTypes from 'prop-types';
import NotesContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';

const Lane = (props) => {
  const { lane, laneNotes, updateLane, addNote, deleteLane, editLane } = props;
  const laneId = lane.id;

  return (
    <div className={styles.laneContainer}>
      <div>
        <div>
          <button onClick={() => addNote({task: 'New Note'}, laneId)}>Add Note</button>
        </div>
        <Edit
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(lane.id)}

          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <div>
          <button onClick={() => deleteLane(laneId)}>Remove Lane</button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
};

export default Lane;