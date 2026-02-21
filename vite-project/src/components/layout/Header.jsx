import Logo from "./Logo";
import { FiLogOut } from "react-icons/fi"; // modern icon

export default function Header({ onLogout, simple = false }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 sm:px-8 py-4 flex justify-between items-center shadow-sm">
      <Logo className="h-8 w-auto" />
      {!simple && (
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
        >
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      )}
    </header>
  );
}