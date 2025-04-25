
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SpecialtyFilterProps {
  availableSpecialties: string[];
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

const SpecialtyFilter = ({ 
  availableSpecialties, 
  selectedSpecialties, 
  onChange 
}: SpecialtyFilterProps) => {
  
  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(s => s !== specialty)
      : [...selectedSpecialties, specialty];
    
    onChange(updatedSpecialties);
  };

  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-speciality" 
        className="text-lg font-semibold mb-3"
      >
        Speciality
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {availableSpecialties.map((specialty) => (
          <div key={specialty} className="flex items-start space-x-2">
            <Checkbox
              id={`specialty-${specialty}`}
              data-testid={`filter-specialty-${specialty}`}
              checked={selectedSpecialties.includes(specialty)}
              onCheckedChange={() => handleSpecialtyChange(specialty)}
            />
            <Label 
              htmlFor={`specialty-${specialty}`}
              className="text-sm leading-none pt-0.5"
            >
              {specialty}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyFilter;
