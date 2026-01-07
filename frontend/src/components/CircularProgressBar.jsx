import React, { useState, useEffect } from 'react';


const CircularProgressBar = ({ progress }) => {
  const [offset, setOffset] = useState(0);
  const [tester, setTester] = useState(0);
  useEffect(() => {
    const progressOffset = (100 - progress) / 100 * 440;
const progressLange=150;
    setOffset(progressOffset);
    setTester(progressLange);
  }, [setOffset, progress,tester, offset]);

  return (

    <div className="circular-progress-container">
      <svg className="circular-progress">
        <circle
          className="circular-progress-background"
          cx="70"
          cy="70"
          r="60"
        />
        <circle
          className="circular-progress-bar"
          cx="70"
          cy="70"
          r="60"
          strokeDasharray="440"
          strokeDashoffset={tester}
        />
        <text x="70" y="70" className="circular-progress-text">English </text>
      </svg>
      <svg className="circular-progress">
        <circle
          className="circular-progress-background"
          cx="70"
          cy="70"
          r="60"
        />
        <circle
          className="circular-progress-bar"
          cx="70"
          cy="70"
          r="60"
          strokeDasharray="440"
          strokeDashoffset={tester}
        />
        <text x="70" y="70" className="circular-progress-text">French </text>
      </svg>
      <svg className="circular-progress">
        <circle
          className="circular-progress-background"
          cx="70"
          cy="70"
          r="60"
        />
        <circle
          className="circular-progress-bar"
          cx="70"
          cy="70"
          r="60"
          strokeDasharray="440"
          strokeDashoffset={tester}
        />
        <text x="70" y="70" className="circular-progress-text">Deutsch</text>
      </svg>
      <svg className="circular-progress">
        <circle
          className="circular-progress-background"
          cx="70"
          cy="70"
          r="60"
        />
        <circle
          className="circular-progress-bar"
          cx="70"
          cy="70"
          r="60"
          strokeDasharray="440"
          strokeDashoffset={offset}
        />
        <text x="70" y="70" className="circular-progress-text">Italian</text>
      </svg>
      <svg className="circular-progress">
        <circle
          className="circular-progress-background"
          cx="70"
          cy="70"
          r="60"
        />
        <circle
          className="circular-progress-bar"
          cx="70"
          cy="70"
          r="60"
          strokeDasharray="440"
          strokeDashoffset="60"
        />
        <text x="70" y="70" className="circular-progress-text">Arabic</text>
      </svg>
     
    </div>
  );
};

export default CircularProgressBar;
