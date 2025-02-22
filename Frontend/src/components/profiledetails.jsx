const ProfileDetails = () => {
  return (
    <div className="p-6 w-auto bg-gray-900 shadow-lg rounded-2xl flex flex-col items-center">
      <div className="p-4 text-center">
        <img
          src="/profile pic.jpg"
          alt="Profile Picture"
          className="border-4 border-gray-700 h-60 w-60 rounded-full shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Andrea Johnson</h2>
        <p className="text-gray-400 text-sm italic">Student at Cambridge University</p>
      </div>
    </div>
  );
};

export default ProfileDetails;