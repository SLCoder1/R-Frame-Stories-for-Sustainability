import React, { useState } from 'react';

function ToggleComponent() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isVisible ? 'Hide' : 'Show'} Component
      </button>

      {isVisible && (
        <div className="mt-4 p-4 border border-gray-300 rounded shadow">
          <p>This is the toggled component!</p>
        </div>
      )}
    </div>
  );
}

export default ToggleComponent;
