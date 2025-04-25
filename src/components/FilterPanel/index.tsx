
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterState, ConsultationType, SortOption } from "@/types/doctor";
import { Menu } from "lucide-react";
import ConsultationModeFilter from "./ConsultationModeFilter";
import SpecialtyFilter from "./SpecialtyFilter";
import SortOptions from "./SortOptions";

interface FilterPanelProps {
  filters: FilterState;
  availableSpecialties: string[];
  onUpdateFilters: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  isMobile: boolean;
}

const FilterPanel = ({
  filters,
  availableSpecialties,
  onUpdateFilters,
  onClearFilters,
  isMobile,
}: FilterPanelProps) => {
  const handleConsultationModeChange = (mode: ConsultationType) => {
    onUpdateFilters({ consultationType: mode });
  };

  const handleSpecialtiesChange = (specialties: string[]) => {
    onUpdateFilters({ specialties });
  };

  const handleSortChange = (sort: SortOption) => {
    onUpdateFilters({ sort });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button 
          variant="ghost" 
          className="text-medical-600 hover:text-medical-800 p-0 h-auto"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>
      
      <ConsultationModeFilter 
        selectedMode={filters.consultationType} 
        onChange={handleConsultationModeChange} 
      />
      
      <SpecialtyFilter 
        availableSpecialties={availableSpecialties} 
        selectedSpecialties={filters.specialties} 
        onChange={handleSpecialtiesChange}
      />
      
      <SortOptions 
        selectedSort={filters.sort} 
        onChange={handleSortChange}
      />
    </div>
  );

  // Mobile view - Filter in a sheet/drawer
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="mb-4">
            <Menu className="h-4 w-4 mr-2" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[400px]">
          <div className="py-4">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop view - Filter in sidebar
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit sticky top-6">
      <FilterContent />
    </div>
  );
};

export default FilterPanel;
