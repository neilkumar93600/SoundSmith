// Sidebar.js

import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Previous Chats</h2>
      <div className="slider">
        {/* Example of previous chat entries */}
        <p>Chat 1</p>
        <p>Chat 2</p>
        <p>Chat 3</p>
        {/* Add more chat entries as needed */}
      </div>
    </div>
  );
}

export default Sidebar;
