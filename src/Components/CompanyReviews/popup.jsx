import React from "react";
import styles from "./popup.module.css";

export const Popup = (props) => {
  return (
    <div className={styles.popupbox}>
      <div className={styles.box}>
        <span className={styles.closeicon} onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};
