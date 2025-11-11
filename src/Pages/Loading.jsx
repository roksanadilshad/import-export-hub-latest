import React from 'react';

const Loading = () => {
    return (
        <div className="w-11/12 mx-auto my-12 animate-pulse">
      <div className="flex flex-col lg:flex-row bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
        {/* Image Skeleton */}
        <div className="lg:w-1/2 h-64 md:h-96 lg:h-[28rem] bg-gray-300"></div>

        {/* Info Skeleton */}
        <div className="lg:w-1/2 p-8 space-y-6">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="flex space-x-2">
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-2/5"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-1/2 mt-4"></div>
        </div>
      </div>
    </div>
    );
};

export default Loading;