import React, { useState } from 'react';

function MyComponent() {
  const [myState, setMyState] = useState({
    sessionId: 'SES1',
    paradigm: [
    ]
  });

  const handleAddObjects = () => {
    const newObjects = [
      {
        id: 'P3',
        loop: '5',
        results: [0, 1, 0, 0, 1]
      },
      {
        id: 'P4',
        loop: '5',
        results: [1, 1, 1, 1, 1]
      }
    ];

    setMyState(prevState => ({
      ...prevState,
      paradigm: [...prevState.paradigm, ...newObjects]
    }));
  };

  return (
    <div>
      <p>Session ID: {myState.sessionId}</p>
      <ul>
        {myState.paradigm.map(item => (
          <li key={item.id}>
            <p>Paradigm ID: {item.id}</p>
            <p>Loop: {item.loop}</p>
            <p>Results: {item.results.join(', ')}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleAddObjects}>Add Objects</button>
    </div>
  );
}

export default MyComponent;