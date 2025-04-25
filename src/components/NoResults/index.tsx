
import { Search } from "lucide-react";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No doctors found</h2>
      <p className="text-gray-600 max-w-md">
        We couldn't find any doctors matching your current filters. Try adjusting your
        filters or search terms to see more results.
      </p>
    </div>
  );
};

export default NoResults;
