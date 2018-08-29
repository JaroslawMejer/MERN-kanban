import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import { createLaneRequest, deleteLaneRequest, updateLaneRequest } from '../Lane/LaneActions';

const mapStateToProps = (state, ownProps) => {
	return {
		laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
	};
};

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);