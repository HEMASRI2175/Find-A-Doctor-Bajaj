
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [specialtyCount, setSpecialtyCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  // Fetch statistics for the landing page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        // Get unique specialties count
        const specialties = new Set();
        data.forEach((doctor: any) => {
          doctor.specialities?.forEach((specialty: any) => {
            if (specialty?.name) specialties.add(specialty.name);
          });
        });
        
        setSpecialtyCount(specialties.size);
        setDoctorCount(data.length);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchText)}`);
  };

  const handleSpecialtyClick = (specialty: string) => {
    navigate(`/doctors?specialties=${encodeURIComponent(specialty)}`);
  };

  const handleConsultTypeClick = (type: string) => {
    navigate(`/doctors?moc=${encodeURIComponent(type)}`);
  };

  // Text for animated typing effect
  const textArray = [
    "Find your perfect doctor",
    "Book appointments easily",
    "Get specialized care",
    "Connect with health experts"
  ];
  
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentText = textArray[textIndex];
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }
      
      if (!isDeleting && displayText === currentText) {
        // Start deleting after a pause
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % textArray.length);
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, textArray]);

  // Common specialties for quick links
  const popularSpecialties = [
    "Cardiologist", 
    "Dermatologist", 
    "Pediatrician", 
    "Neurologist",
    "Orthopedic"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Animated Background */}
      <motion.div 
        className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-medical-50 to-medical-100 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background blobs */}
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-medical-200 opacity-20 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut" 
          }}
          style={{ left: '10%', top: '20%' }}
        />
        
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full bg-medical-300 opacity-20 blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut" 
          }}
          style={{ right: '15%', bottom: '10%' }}
        />
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              HealthConnect
            </motion.h1>
            
            <motion.div
              className="text-xl md:text-3xl font-medium text-medical-800 mb-8 h-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="inline-block">{displayText}</span>
              <span className="animate-pulse">|</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <form onSubmit={handleSearch} className="flex max-w-lg mx-auto">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search for doctors, specialties..."
                  className="flex-1 px-6 py-4 rounded-l-full border-2 border-medical-300 focus:outline-none focus:border-medical-500 text-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-4 bg-medical-600 text-white rounded-r-full text-lg font-medium hover:bg-medical-700 transition-colors"
                >
                  Find Doctors
                </motion.button>
              </form>
            </motion.div>
            
            {!isLoading && (
              <motion.div
                className="flex justify-center gap-8 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="text-center">
                  <p className="text-4xl font-bold text-medical-700">{doctorCount}+</p>
                  <p className="text-gray-600 mt-1">Doctors</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-medical-700">{specialtyCount}+</p>
                  <p className="text-gray-600 mt-1">Specialties</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-medical-700">24/7</p>
                  <p className="text-gray-600 mt-1">Support</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Popular Specialties Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular Specialties
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {popularSpecialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                className="bg-medical-50 rounded-xl p-6 text-center cursor-pointer hover:bg-medical-100 transition-colors"
                onClick={() => handleSpecialtyClick(specialty)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-medium text-medical-800">{specialty}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Consultation Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Consultation Types
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
            <motion.div
              className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => handleConsultTypeClick("Video Consult")}
            >
              <div className="h-48 bg-blue-500 flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Video Consultation</h3>
                <p className="text-gray-600">Consult with top doctors from the comfort of your home</p>
                <button className="mt-4 px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors">
                  Find Video Consults
                </button>
              </div>
            </motion.div>
            
            <motion.div
              className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => handleConsultTypeClick("In Clinic")}
            >
              <div className="h-48 bg-purple-500 flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">In-Clinic Visit</h3>
                <p className="text-gray-600">Visit doctors in-person at clinics and hospitals</p>
                <button className="mt-4 px-6 py-2 bg-purple-100 text-purple-700 rounded-full font-medium hover:bg-purple-200 transition-colors">
                  Find Clinic Visits
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-600 to-medical-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to find your doctor?
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-medical-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our extensive database of qualified healthcare professionals and book your appointment today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              onClick={() => navigate('/doctors')}
              className="px-8 py-4 bg-white text-medical-700 rounded-full text-lg font-medium hover:bg-medical-50 transition-colors"
            >
              Browse All Doctors
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 HealthConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
