
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Doctor } from "@/types/doctor";
import { cn } from "@/lib/utils";
import { User, Video, Building2, Star, DollarSign, Clock } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card 
      data-testid="doctor-card"
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg",
        "animate-fadeIn border-gray-200"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-medical-100 text-medical-500">
                <User size={32} />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 
                  data-testid="doctor-name"
                  className="font-semibold text-lg text-gray-900 mb-1"
                >
                  Dr. {doctor.name}
                </h3>
                
                <div className="flex flex-wrap items-center gap-1 mb-2">
                  {doctor.specialties.map((specialty) => (
                    <Badge 
                      key={specialty} 
                      data-testid="doctor-specialty"
                      variant="secondary"
                      className="bg-medical-50 text-medical-700 rounded-full"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500 mr-1" />
                <span className="font-medium">{doctor.rating}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-medical-500" />
                <span data-testid="doctor-experience" className="text-sm">
                  {doctor.experience} years experience
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                <span data-testid="doctor-fee" className="text-sm">
                  ${doctor.fees} per consultation
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 col-span-2">
                {doctor.consultationType === "Video Consult" ? (
                  <>
                    <Video className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">Video Consultation Available</span>
                  </>
                ) : (
                  <>
                    <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                    <span className="text-sm">In-Clinic Consultation</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
