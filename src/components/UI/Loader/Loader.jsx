import React from 'react';
import classes from './Loader.module.css';


function Loader(props) {
  return (
    <div className={classes.center}>
      <div className={classes.Loader}>
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
