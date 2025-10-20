'use client';

import { useState } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ zoom: '500%', textAlign: 'center' }}>
      <h1>JTB Front End</h1>
      <div>
        <button onClick={(): void => setCount((count: number) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default Home;
