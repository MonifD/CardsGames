import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-center space-x-6">
          <Link
            to="/simple-bataille"
            className="text-lg px-4 py-2 hover:bg-blue-500 rounded"
          >
            Simple Bataille
          </Link>
        </div>
      </nav>
        <Outlet />
    </div>
  );
};

export default Main;
