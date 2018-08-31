import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import { createLaneRequest, deleteLaneRequest, updateLaneRequest, editLane } from '../Lane/LaneActions';

const mapStateToProps = (state, ownProps) => {
	return {
		laneNotes: ownProps.lane.notes.map(noteId => {
      return { ...state.notes[noteId] }
    })
	};
};

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  editLane,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);