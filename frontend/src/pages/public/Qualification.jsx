import { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaPython } from "react-icons/fa";
import {
  FiAward,
  FiBriefcase,
  FiCode,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { SiIbm, SiTensorflow } from "react-icons/si";

// Import components
import QualificationCTA from "../../components/qualification/QualificationCTA";
import QualificationGrid from "../../components/qualification/QualificationGrid";
import QualificationHero from "../../components/qualification/QualificationHero";
import QualificationModal from "../../components/qualification/QualificationModal";
import QualificationStats from "../../components/qualification/QualificationStats";
import QualificationTabs from "../../components/qualification/QualificationTabs";

const Qualifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("education");
  const [selectedItem, setSelectedItem] = useState(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Store the current ref value in a variable
    const currentTimelineRef = timelineRef.current;

    if (currentTimelineRef) observer.observe(currentTimelineRef);

    return () => {
      // Use the stored variable in the cleanup
      if (currentTimelineRef) observer.unobserve(currentTimelineRef);
    };
  }, []); // Empty dependency array is correct here

  // Education Timeline Data
  const education = [
    {
      id: 1,
      title: "Deep Learning Specialization",
      institution: "IBM Developer Skills Network",
      location: "Online",
      date: "March 2024",
      type: "Expert Certification",
      icon: SiTensorflow,
      color: "from-purple-600 to-pink-600",
      bgColor: "from-purple-500/20 to-pink-500/20",
      skills: ["Neural Networks", "CNNs", "RNNs", "TensorFlow"],
      verified: true,
      badge: "Top Rated",
      description: "Advanced deep learning concepts and architectures",
    },
    {
      id: 2,
      title: "Machine Learning with Python",
      institution: "IBM Developer Skills Network",
      location: "Online",
      date: "February 2024",
      type: "Professional Certification",
      icon: FaPython,
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      skills: ["Scikit-learn", "Pandas", "Model Evaluation", "ML Pipelines"],
      verified: true,
      badge: "Verified",
      description: "Comprehensive machine learning with Python",
    },
    {
      id: 3,
      title: "AI & ML Professional Certification",
      institution: "GOMYCODE",
      location: "Tunis, Tunisia",
      date: "Oct 2022 - Feb 2023",
      type: "Intensive Program",
      icon: FiShield,
      color: "from-red-600 to-orange-600",
      bgColor: "from-red-500/20 to-orange-500/20",
      skills: ["Full Stack ML", "Real Projects", "Portfolio Development"],
      verified: true,
      badge: "Professional",
      description: "Comprehensive AI/ML training with hands-on projects",
    },
    {
      id: 4,
      title: "Higher Degree in Electrical Engineering",
      institution: "Higher Institute of Technological Studies of Kelibia",
      location: "Kelibia, Tunisia",
      date: "2014 - 2017",
      type: "Bachelor Degree",
      icon: FaGraduationCap,
      color: "from-primary-600 to-blue-600",
      bgColor: "from-primary-500/20 to-blue-500/20",
      skills: ["Automation", "Control Systems", "Signal Processing"],
      verified: true,
      badge: "Graduated",
      description: "Specialized in automation and control systems engineering",
    },
    {
      id: 5,
      title: "Data Science Professional Track",
      institution: "IBM Developer Skills Network",
      location: "Online",
      date: "2023 - 2024",
      type: "Professional Track",
      icon: FiTrendingUp,
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-500/20 to-emerald-500/20",
      skills: ["Data Analysis", "Visualization", "Statistics", "Python"],
      verified: true,
      badge: "Completed",
      description: "Complete data science professional development track",
    },
  ];

  // Professional Experience Timeline Data
  const experience = [
    {
      id: 1,
      title: "AI/Machine Learning Developer",
      company: "Freelance Consultant",
      location: "Remote · Worldwide",
      date: "2021 - Present",
      type: "Freelance Expert",
      icon: FiCode,
      color: "from-primary-600 to-blue-600",
      bgColor: "from-primary-500/20 to-blue-500/20",
      skills: ["Python", "PyTorch", "Scikit-learn", "TensorFlow"],
      achievements: [
        "Built proprietary ML trading algorithms with risk optimization",
        "Developed custom deep learning models for pattern recognition",
        "Created multivariate regression models for business intelligence",
        "Implemented real-time data processing and analysis systems",
        "Delivered 15+ successful AI/ML projects across industries",
        "Specialized in predictive analytics and optimization algorithms",
      ],
      technologies: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "React",
      ],
    },
    {
      id: 2,
      title: "Full Stack ML Developer",
      company: "Various International Clients",
      location: "Remote Contracts",
      date: "2022 - 2024",
      type: "Contract Specialist",
      icon: FiCode,
      color: "from-green-600 to-teal-600",
      bgColor: "from-green-500/20 to-teal-500/20",
      skills: ["MLOps", "Deployment", "APIs", "Cloud Integration"],
      achievements: [
        "End-to-end ML pipeline development and deployment",
        "REST API development for model serving",
        "Cloud integration (AWS, Azure, GCP)",
        "Automated model training and evaluation systems",
        "Real-time prediction services",
        "Model monitoring and maintenance solutions",
      ],
      technologies: ["FastAPI", "Docker", "AWS", "PostgreSQL", "Redis"],
    },
  ];

  const stats = [
    {
      value: "10+",
      label: "Certifications",
      icon: FiAward,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "3+",
      label: "Years Experience",
      icon: FiBriefcase,
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "15+",
      label: "Projects Delivered",
      icon: FiCode,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "7+",
      label: "IBM Certificates",
      icon: SiIbm,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <QualificationHero isVisible={isVisible} />

      <QualificationStats isVisible={isVisible} stats={stats} />

      <QualificationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <QualificationGrid
        activeTab={activeTab}
        education={education}
        experience={experience}
        isVisible={isVisible}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        timelineRef={timelineRef}
      />

      <QualificationModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <QualificationCTA />
    </div>
  );
};

export default Qualifications;
