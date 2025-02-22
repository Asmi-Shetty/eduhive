import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="p-2 bg-gray-900 flex justify-between items-center shadow-md">
      <span className="text-white ml-2 text-lg font-semibold">Profile Details</span>
      <div>
        <FontAwesomeIcon className="text-gray-300 text-2xl m-2 hover:text-gray-100 transition duration-200" icon={faEnvelope} />
        <FontAwesomeIcon className="text-gray-300 text-2xl m-2 hover:text-gray-100 transition duration-200" icon={faBell} />
      </div>
    </div>
  );
};

export default Header;
