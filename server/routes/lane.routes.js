import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Add a new Lane
router.route('/lanes').post(LaneController.addLane);

// Get all Lanes
router.route('/lanes').get(LaneController.getLanes);

// Delete a lane by laneId
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

// Edit a lane name by laneId
router.route('/lanes/:laneId').put(LaneController.editLaneName);

// drag a note

router.route('/lanes/moveNote/:noteId').put(LaneController.moveNote)

export default router;