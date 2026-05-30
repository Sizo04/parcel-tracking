import {
  faBarsProgress,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons/faBoxOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="flex p-4 bg-[var(--light)] text-white justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="bg-blue-500 p-2 rounded"
            icon={faBoxOpen}
          />
          <h1>TrackFlow</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="flex items-center border-1 rounded py-1 px-3 border-gray-500 hover:bg-[var(--dark)]"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p>Track</p>
          </Link>
          <Link
            href="/shipments"
            className="flex items-center border-1 rounded py-1 px-3 border-gray-500 hover:bg-[var(--dark)]"
          >
            <FontAwesomeIcon icon={faBarsProgress} />
            <p>My Shipemnts</p>
          </Link>
        </div>
        <div className="profile"></div>
      </nav>
    </div>
  );
};

export default Navbar;
