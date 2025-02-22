import React from 'react';

const TestimonialFooter = () => {
  return (
    <div>
      <div className="bg-gray-800 w-full py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          "This platform has made studying more fun and effective! I love the gamification aspect and the real-time whiteboard feature."
        </p>
      </div>
      
      {/* Footer Section */}
      <footer className="py-6 text-center bg-gray-900 border-t border-gray-700 w-full">
        <p className="text-gray-500">&copy; 2025 Collaborative Study Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TestimonialFooter;
