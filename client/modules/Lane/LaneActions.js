import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';

import {  createNotes, deleteNote, } from "../Note/NoteActions";


export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';
export const REMOVE_FROM_LANE = 'REMOVE_FROM_LANE';
export const PUSH_TO_LANE = 'PUSH_TO_LANE';

export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      notes: lane.notes || [],
      ...lane,
    }
  };
}

export function createLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneRequest(lane) {
  return (dispatch) => {
    return callApi(`lanes/${lane.id}`, 'put', {id: lane.id, name: lane.name}).then(laneResp => {
      dispatch(updateLane(lane));
    })
  }
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  };
}

export function deleteLaneRequest(lane) {
  return(dispatch) => {
    return  callApi(`lanes/${lane.id}`, 'delete')
      .then( () => {
        lane.notes.forEach( note => { 
          dispatch(deleteNote( note, lane.id))
        })
        dispatch(deleteLane(lane.id));
      })
  }
}

export function editLane(laneId) {
  return {
    type: EDIT_LANE,
    id: laneId,
  }
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}

export function removeFromLane(sourceLaneId, noteId) {
  return {
    type: REMOVE_FROM_LANE,
    sourceLaneId,
    noteId,
  }
}

export function pushToLane(targetLaneId, noteId) {
  return {
    type: PUSH_TO_LANE,
    targetLaneId,
    noteId,
  }
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;

     dispatch(createLanes(normalizedLanes));
     dispatch(createNotes(notes));
    });
  };
}

export function changeLanesRequest(sourceLaneId, targetLaneId, noteId, newNotes) {
  return (dispatch) => {
    return callApi(`lanes/moveNote/${noteId}`,'put', {sourceId: sourceLaneId, targetId: targetLaneId})
      .then(() => {
        dispatch(removeFromLane(
          sourceLaneId,
          noteId,
        ));
        dispatch(pushToLane(
          targetLaneId,
          noteId,
        ));
      }
    )
    .catch(err => {
      console.log(err);
    })
  }
}