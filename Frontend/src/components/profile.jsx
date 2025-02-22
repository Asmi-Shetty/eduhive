import TaskList from "./tasklist";
// import CircularProgressTrackers from "./progresstrackers";
import ContactInfo from "./contactInfo";
import ProfileDetails from "./profiledetails";
import Header from "./header";
import Sidebar from "./sidebar";
import TestimonialFooter from "./Footer";

const Profile = () => {
  return (
    <div className="flex h-auto w-screen overflow-hidden bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col w-3/4 p-4">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 m-4 border border-gray-700 h-full bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6 bg-gray-700 flex flex-col items-center rounded-lg shadow-md">
            <ProfileDetails />
            <ContactInfo />
          </div>
          <div className="grid grid-rows-2 gap-6">
            {/* <CircularProgressTrackers /> */}
            <TaskList />
          </div>
        </div>
        <div className="mt-auto">
          <TestimonialFooter />
        </div>
      </div>
    </div>
  );
};

export default Profile;