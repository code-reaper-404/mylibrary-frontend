import React from "react";
import CountUp from 'react-countup';

function DataCard({ icon, count, label, color, text}) {
  return (
    <div className="count-card">
      <div className="card-ico" style={{ background: color }}>
        {icon}
      </div>
      <div className="card-txt">
        {count &&
          <CountUp start={0} end={count} delay={0}>
            {({ countUpRef }) => (
              <span ref={countUpRef} />
            )}
          </CountUp>
        }
        {text &&
          <span className="text-data">{text}</span>
        }
        <p>{label}</p>
      </div>
    </div>
  );
}

export default DataCard;
