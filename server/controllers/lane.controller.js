import uuid from 'uuid';
import Lane from '../models/lane';


export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({id: req.params.laneId}).exec( (err, lane) => {
    if(err) {
      res.status(500).send(err);
    }
    if(lane) {
      lane.remove(() => {
        res.status(200).send('Lane deleted');
      });
    } else {
      res.status(500).send('Bad argument!');
    }
  });
}

export function editLaneName(req, res) {
	Lane.update({id: req.params.laneId}, req.body).exec((err, lane) =>{
		if (err) {
			res.status(500).send(err);
		}

		res.json({ lane })
	})
}

export function moveNote(req, res) {
  Lane.update({id: req.params.laneId}, req.body).exec((err, lane) =>{
    if (err) {
      res.status(500).send(err);
    }

    res.json({ lane })
  })
}