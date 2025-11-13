import React from 'react';

const Skleton = ({ count = 3 }) => {
    return (
        <div className="flex flex-wrap gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
    );
};

export default Skleton;