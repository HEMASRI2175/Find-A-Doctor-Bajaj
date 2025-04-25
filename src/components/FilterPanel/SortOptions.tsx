
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SortOption } from "@/types/doctor";

interface SortOptionsProps {
  selectedSort: SortOption;
  onChange: (sort: SortOption) => void;
}

const SortOptions = ({ selectedSort, onChange }: SortOptionsProps) => {
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-sort" 
        className="text-lg font-semibold mb-3"
      >
        Sort
      </h3>
      <RadioGroup 
        value={selectedSort} 
        onValueChange={(value) => onChange(value as SortOption)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            data-testid="sort-fees" 
            value="fees" 
            id="sort-fees" 
          />
          <Label htmlFor="sort-fees">Fees (Low to High)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            data-testid="sort-experience" 
            value="experience" 
            id="sort-experience" 
          />
          <Label htmlFor="sort-experience">Experience (High to Low)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SortOptions;
