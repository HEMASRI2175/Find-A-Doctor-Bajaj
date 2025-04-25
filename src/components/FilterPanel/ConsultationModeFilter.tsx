
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ConsultationType } from "@/types/doctor";

interface ConsultationModeFilterProps {
  selectedMode: ConsultationType;
  onChange: (mode: ConsultationType) => void;
}

const ConsultationModeFilter = ({ 
  selectedMode, 
  onChange 
}: ConsultationModeFilterProps) => {
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-moc" 
        className="text-lg font-semibold mb-3"
      >
        Consultation Mode
      </h3>
      <RadioGroup 
        value={selectedMode} 
        onValueChange={(value) => onChange(value as ConsultationType)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            data-testid="filter-video-consult" 
            value="Video Consult" 
            id="video-consult" 
          />
          <Label htmlFor="video-consult">Video Consult</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            data-testid="filter-in-clinic" 
            value="In Clinic" 
            id="in-clinic" 
          />
          <Label htmlFor="in-clinic">In Clinic</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ConsultationModeFilter;
