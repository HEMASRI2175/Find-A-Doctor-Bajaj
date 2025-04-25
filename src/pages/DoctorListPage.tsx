
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import HeaderSearchBar from '@/components/HeaderSearchBar';
import FilterPanel from '@/components/FilterPanel';
import DoctorCard from '@/components/DoctorCard';
import NoResults from '@/components/NoResults';
import { Doctor, FilterState } from '@/types/doctor';
import useQueryParams from '@/hooks/useQueryParams';
import { useIsMobile } from '@/hooks/use-mobile';

const DoctorListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { filters, updateFilters } = useQueryParams();
  const isMobile = useIsMobile();
  const [showNavShadow, setShowNavShadow] = useState(false);

  // Handle navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowNavShadow(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch doctors from API once on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        // Transform the data to match our Doctor interface
        const transformedData: Doctor[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.photo || "",
          specialties: item.specialities?.map((s: any) => s.name) || [],
          consultationType: item.video_consult ? "Video Consult" : "In Clinic",
          experience: parseInt(item.experience?.split(" ")[0]) || 0,
          fees: parseInt(item.fees?.replace(/[^\d]/g, '')) || 0,
          rating: (Math.random() * 2 + 3).toFixed(1), // Generate a random rating between 3-5
          bio: item.doctor_introduction || ""
        }));
        
        setDoctors(transformedData);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Extract all unique specialties - Adding a check for doctors array
  const allSpecialties = useMemo(() => {
    const specialtySet = new Set<string>();
    if (!doctors || doctors.length === 0) return [];
    
    doctors.forEach(doctor => {
      if (doctor.specialties && Array.isArray(doctor.specialties)) {
        doctor.specialties.forEach(specialty => {
          if (specialty) specialtySet.add(specialty);
        });
      }
    });
    return Array.from(specialtySet).sort();
  }, [doctors]);

  // Apply all filters to the doctors list
  const filteredDoctors = useMemo(() => {
    // Start with all doctors, return empty array if doctors is not yet loaded
    if (!doctors || doctors.length === 0) return [];
    
    let result = [...doctors];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply consultationType filter
    if (filters.consultationType) {
      result = result.filter(doctor => 
        doctor.consultationType === filters.consultationType
      );
    }
    
    // Apply specialties filter
    if (filters.specialties.length > 0) {
      result = result.filter(doctor => 
        doctor.specialties && doctor.specialties.some(specialty => 
          filters.specialties.includes(specialty)
        )
      );
    }
    
    // Apply sorting
    if (filters.sort === 'fees') {
      result = result.sort((a, b) => a.fees - b.fees);
    } else if (filters.sort === 'experience') {
      result = result.sort((a, b) => b.experience - a.experience);
    }
    
    return result;
  }, [doctors, filters]);

  const clearFilters = () => {
    updateFilters({
      search: '',
      consultationType: '',
      specialties: [],
      sort: '',
    });
  };

  const handleSearchChange = (search: string) => {
    updateFilters({ search });
  };

  // Animation variants for staggered list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <header 
        className={`bg-white border-b border-gray-200 sticky top-0 z-40 transition-shadow duration-300 backdrop-blur-sm ${
          showNavShadow ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-6 flex items-center text-medical-600 hover:text-medical-800 transition-colors">
              <Home className="h-5 w-5 mr-1" />
              <span className="font-medium">Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-medical-700">Find A Doctor</h1>
          </div>
          <div className="flex-1 flex items-center justify-center md:justify-end max-w-lg ml-6">
            <HeaderSearchBar 
              doctors={doctors || []}
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filter Status Overview */}
        {(filters.search || filters.consultationType || filters.specialties.length > 0 || filters.sort) && (
          <motion.div 
            className="mb-4 flex items-center justify-between flex-wrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-sm text-gray-600 mb-2 md:mb-0">
              {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
            </div>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <motion.div 
            className={`md:w-1/4 ${isMobile ? '' : 'min-w-[250px]'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FilterPanel
              filters={filters}
              availableSpecialties={allSpecialties}
              onUpdateFilters={updateFilters}
              onClearFilters={clearFilters}
              isMobile={isMobile}
            />
          </motion.div>

          {/* Doctor List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-[180px]"
                    initial={{ opacity: 0.6 }}
                    animate={{ 
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            ) : filteredDoctors.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDoctors.map((doctor, index) => (
                  <motion.div 
                    key={doctor.id}
                    variants={itemVariants}
                    custom={index}
                  >
                    <DoctorCard doctor={doctor} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <NoResults />
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorListPage;
