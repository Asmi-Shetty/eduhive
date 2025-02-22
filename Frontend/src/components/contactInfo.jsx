import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const ContactInfo = () => {
  return (
    <div className="border-gray-300 w-full h-40 p-2 mt-2 flex flex-col justify-center text-white text-sm">
      <div className="flex items-center gap-2 mb-1">
        <FontAwesomeIcon icon={faLocationDot} className="text-base" />
        <span>Location</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <FontAwesomeIcon icon={faEnvelope} className="text-base" />
        <span>Email</span>
      </div>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faPhone} className="text-base" />
        <span>Reach out at</span>
      </div>
    </div>
  );
};

export default ContactInfo;
