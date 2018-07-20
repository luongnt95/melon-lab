import React from 'react';
import { List, Button, Card } from 'semantic-ui-react';
// import Countdown from 'react-cntdwn';

const ExecuteRequest = ({
  onExecute,
  readyToExecute,
  targetDate,
  requestId,
}) => (
  <div style={{ padding: '1.2em', backgroundColor: 'rgba(249,209,118,1)' }}>
    <h3>Waiting time required</h3>
    <p style={{ marginTop: '1em' }}>
      <a
        href="https://medium.com/melonport-blog/protecting-participants-ee55a752287"
        target="_blank"
        noopener
        noreferrer
      >
        To prevent information advantage of any economic agent over another, we
        enforce a waiting period before any subscription or redemption can be
        executed.
      </a>
    </p>

    {readyToExecute ? (
      <div className="ui two buttons">
        <Button basic color="black" onClick={() => onExecute(requestId)}>
          Execute my request!
        </Button>
      </div>
    ) : (
      <div>
        Remaining waiting time before request execution:
        {/* <Countdown
                targetDate={targetDate}
                startDelay={100}
                interval={1000}
                timeSeparator=":"
                leadingZero
              /> */}
      </div>
    )}
  </div>
);

export default ExecuteRequest;
