import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search templates, components..."
          className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}
