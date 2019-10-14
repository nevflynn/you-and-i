import React, { useState, useEffect } from 'react';
import styles from './FadeText.module.css';

const fadeIn = `
    @keyframes fadeIn {
        0%   { opacity: 0; filter:blur(5px)}
        100% { opacity: 1; filter:blur(0px)}
    }
`;

const headingStyle = {fontFamily: 'Roboto Mono', fontSize: '20px'};
const bodyStyle = {fontFamily: 'Open Sans', fontWeight: '300', fontSize: '16px'};


const FadeText = (props) => {

    const [array, setArray] = useState(props.children.split(' '));

    return (
        
        <div style={props.heading ? headingStyle : bodyStyle} className={styles.sentence}>
            {array.map((word, index) => {
                return <React.Fragment key={index}>
                            <style children={fadeIn} />
                            <span className={styles.word} 
                                key={index}
                                style={{
                                    animationDuration: `1s`,
                                    animationDelay: `${props.delay + index/30}s`, 
                                    animationIterationCount: 1,
                                    animationName: `fadeIn`,
                                    animationTimingFunction: 'ease-in',
                                    animationFillMode: 'backwards',
                                    }}>
                                {word}
                            </span>
                        </React.Fragment>
            })}
        </div>
    );
}

export default FadeText;
