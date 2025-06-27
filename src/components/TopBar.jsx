import { Menu, Maximize, Minimize, User } from "lucide-react";

const Topbar = ({ onToggleSidebar, onToggleFullscreen, onToggleProfileSidebar, isFullscreen }) => {
  return (
    <div className="bg-white  border-b p-3 flex justify-between items-center md:pr-10">
      <div className="flex items-center space-x-4">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-200 rounded">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={onToggleFullscreen} className="p-2 hover:bg-gray-200 rounded">
          {isFullscreen ? (
            <Minimize className="w-5 h-5" />
          ) : (
            <Maximize className="w-5 h-5" />
          )}
        </button>
       
      </div>
    </div>
  );
};

export default Topbar;