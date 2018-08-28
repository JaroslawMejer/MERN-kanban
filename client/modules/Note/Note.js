import React from 'react';
import Proptypes from 'prop-types';
import styles from './Note.css';

const Note = props =>
  <li className={styles.Note}> {props.children} </li>;

Note.propTypes = {
  children: Proptypes.any,
};

export default Note;