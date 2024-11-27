import React from 'react';
import styles from './print.module.css';

const FORMSection = ({ title, children }) => {


    return (
        <>
            <div className={styles.title2}> <span >{title}</span></div>
            <div style={{marginTop:'25px'}} className={styles.text}>
                {children}
            </div>
        </>

    );
}
export default FORMSection

