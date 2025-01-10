import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import PersonalInfoStep from './Components/PersonalInfoStep';
import LearningObjectivesStep from './Components/LearningObjectivesStep';
import EducationStep from './Components/EducationStep';
import WorkExperienceStep from './Components/WorkExperienceStep';
import HonorsAwardsStep from './Components/HonorsAwardsStep';
import CreativeWorksStep from './Components/CreativeWorksStep';
import LifelongLearningStep from './Components/LifelongLearningStep';
import EssayStep from './Components/EssayStep';
import { validateStep } from '@/Utils/formValidations';
import axios from 'axios';

const STEPS = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Learning Objectives' },
    { number: 3, title: 'Education' },
    { number: 4, title: 'Work Experience' },
    { number: 5, title: 'Honors & Awards' },
    { number: 6, title: 'Creative Works' },
    { number: 7, title: 'Lifelong Learning' },
    { number: 8, title: 'Essay' }
];

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Personal Info
        firstName: '',
        lastName: '',
        email: '',
        
        // Step 2 - Learning Objectives
        firstPriority: '',
        secondPriority: '',
        thirdPriority: '',
        goalStatement: '',
        timeCommitment: '',
        overseasPlan: '',
        costPayment: '',
        otherCostPayment: '',
        completionTimeline: '',

        // Step 3 - Education
        elementarySchool: '',
        elementaryAddress: '',
        elementaryDateFrom: '',
        elementaryDateTo: '',
        highSchools: [{
            name: '',
            address: '',
            type: '',
            dateFrom: '',
            dateTo: ''
        }],
        hasPEPT: false,
        peptYear: '',
        peptGrade: '',
        postSecondary: [{
            program: '',
            institution: '',
            schoolYear: ''
        }],
        nonFormalEducation: [{
            title: '',
            organization: '',
            date: '',
            certificate: '',
            participation: ''
        }],
        certifications: [{
            title: '',
            agency: '',
            dateCertified: '',
            rating: ''
        }],
        workExperiences: [{
            designation: '',
            dateFrom: '',
            dateTo: '',
            companyName: '',
            companyAddress: '',
            employmentStatus: '',
            supervisorName: '',
            reasonForLeaving: '',
            responsibilities: '',
            references: ['', '', '']
        }],
        academicAwards: [{
            title: '',
            organization: '',
            dateAwarded: ''
        }],
        communityAwards: [{
            title: '',
            organization: '',
            dateAwarded: ''
        }],
        workAwards: [{
            title: '',
            organization: '',
            dateAwarded: ''
        }],
        creativeWorks: [{
            title: '',
            description: '',
            significance: '',
            dateCompleted: '',
            corroboratingBody: ''
        }],
        hobbies: [{ description: '' }],
        specialSkills: [{ description: '' }],
        workActivities: [{ description: '' }],
        volunteerActivities: [{ description: '' }],
        travels: [{ description: '' }],
        essay: '',
        birthCertificate: null,
        marriageCertificate: null,
        legalDocument: null,
        document: null
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [savedStatus, setSavedStatus] = useState({
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        // ... other steps
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleArrayFieldChange = (arrayName, index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (arrayName, emptyItem) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], emptyItem]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const handleNext = async () => {
        const stepData = getStepData(currentStep);
        
        setLoading(true);
        try {
            // Add proper headers for FormData
            const config = {
                headers: {
                    'Content-Type': currentStep === 1 ? 'multipart/form-data' : 'application/json',
                },
            };

            const response = await axios.post(
                `/application/step/${currentStep}`, 
                stepData,
                config
            );
            
            if (currentStep === 1 && response.data.data?.applicant_id) {
                setFormData(prev => ({
                    ...prev,
                    applicant_id: response.data.data.applicant_id
                }));
            }

            setSavedStatus(prev => ({
                ...prev,
                [`step${currentStep}`]: true
            }));

            setCurrentStep(prev => prev + 1);
            setErrors({});
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get relevant data for each step
    const getStepData = (step) => {
        switch (step) {
            case 1: // Personal Info
                // Create FormData object for file upload
                const formDataObj = new FormData();
                formDataObj.append('firstName', formData.firstName);
                formDataObj.append('middleName', formData.middleName);
                formDataObj.append('lastName', formData.lastName);
                formDataObj.append('suffix', formData.suffix);
                formDataObj.append('birthDate', formData.birthDate);
                formDataObj.append('placeOfBirth', formData.birthPlace);
                formDataObj.append('civilStatus', formData.civilStatus);
                formDataObj.append('sex', formData.sex);
                formDataObj.append('religion', formData.religion);
                formDataObj.append('languages', formData.languages);
                
                // Only append document if it exists and is a file
                if (formData.document instanceof File) {
                    formDataObj.append('document', formData.document);
                }
                
                if (formData.applicant_id) {
                    formDataObj.append('applicant_id', formData.applicant_id);
                }
                
                return formDataObj;

            case 2: // Learning Objectives
                return {
                    applicant_id: formData.applicant_id,
                    firstPriority: formData.firstPriority,
                    secondPriority: formData.secondPriority,
                    thirdPriority: formData.thirdPriority,
                    goalStatement: formData.goalStatement,
                    timeCommitment: formData.timeCommitment,
                    overseasPlan: formData.overseasPlan,
                    costPayment: formData.costPayment,
                    otherCostPayment: formData.otherCostPayment,
                    completionTimeline: formData.completionTimeline
                };

            case 3: // Work Experience
                return {
                    applicant_id: formData.applicant_id,
                    workExperiences: formData.workExperiences.filter(exp => 
                        exp.designation || exp.companyName
                    )
                };

            case 4: // Awards
                return {
                    applicant_id: formData.applicant_id,
                    academicAwards: formData.academicAwards.filter(award => 
                        award.title || award.organization
                    ),
                    communityAwards: formData.communityAwards.filter(award => 
                        award.title || award.organization
                    ),
                    workAwards: formData.workAwards.filter(award => 
                        award.title || award.organization
                    )
                };

            // Add other steps as needed...
            
            default:
                return {};
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep < STEPS.length) {
            handleNext();
        } else {
            try {
                await axios.post('/application/finalize', {
                    applicant_id: formData.applicant_id
                });
                // Handle successful submission
            } catch (error) {
                // Handle error
            }
        }
    };

    // Add auto-save functionality
    useEffect(() => {
        const autoSave = async () => {
            if (formData.applicant_id && !loading) {
                try {
                    await axios.post(`/api/application/step/${currentStep}`, formData);
                    setSavedStatus(prev => ({
                        ...prev,
                        [`step${currentStep}`]: true
                    }));
                } catch (error) {
                    console.error('Auto-save failed:', error);
                }
            }
        };

        const timeoutId = setTimeout(autoSave, 30000); // Auto-save every 30 seconds
        return () => clearTimeout(timeoutId);
    }, [formData, currentStep]);

    // Load saved application
    const loadSavedApplication = async (applicantId) => {
        try {
            const response = await axios.get(`/application/${applicantId}`);
            setFormData(prev => ({
                ...prev,
                ...response.data.data
            }));
        } catch (error) {
            console.error('Failed to load application:', error);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoStep 
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                />;
            case 2:
                return <LearningObjectivesStep 
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                />;
            case 3:
                return <EducationStep 
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange}
                    handleArrayFieldChange={handleArrayFieldChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                />;
            case 4:
                return <WorkExperienceStep 
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange}
                    handleArrayFieldChange={handleArrayFieldChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                />;
            case 5:
                return <HonorsAwardsStep 
                    formData={formData} 
                    errors={errors} 
                    handleArrayFieldChange={handleArrayFieldChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                />;
            case 6:
                return <CreativeWorksStep 
                    formData={formData} 
                    errors={errors} 
                    handleArrayFieldChange={handleArrayFieldChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                />;
            case 7:
                return <LifelongLearningStep 
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange}
                    handleArrayFieldChange={handleArrayFieldChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                />;
            case 8:
                return <EssayStep 
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange}
                />;
            default:
                return null;
        }
    };

    return (
        <>
            <Head title="ETEEAP Admission Form" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-6 text-xl font-semibold leading-tight text-gray-800">
                                ETEEAP Admission Form
                            </h2>
                            
                            {/* Updated Progress Bar */}
                            <div className="mb-8">
                                <div className="flex flex-wrap justify-between gap-2">
                                    {STEPS.map((step) => (
                                        <div
                                            key={step.number}
                                            className="flex flex-col items-center space-y-2"
                                        >
                                            <div
                                                className={`
                                                    flex h-8 w-8 items-center justify-center rounded-full 
                                                    ${step.number <= currentStep
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-gray-200 text-gray-600'
                                                    }
                                                `}
                                            >
                                                {step.number}
                                            </div>
                                            <span 
                                                className={`
                                                    text-xs text-center whitespace-nowrap
                                                    ${step.number <= currentStep
                                                        ? 'text-indigo-600 font-medium'
                                                        : 'text-gray-500'
                                                    }
                                                `}
                                            >
                                                {step.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {/* Progress Line */}
                                <div className="mt-4 hidden md:block">
                                    <div className="relative">
                                        <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200"></div>
                                        <div 
                                            className="absolute left-0 top-1/2 h-0.5 bg-indigo-600 transition-all duration-300"
                                            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {renderStep()}

                                <div className="mt-6 flex justify-between">
                                    {currentStep > 1 && (
                                        <SecondaryButton
                                            type="button"
                                            onClick={handlePrevious}
                                        >
                                            Previous
                                        </SecondaryButton>
                                    )}
                                    
                                    <div className="ml-auto">
                                        {currentStep < STEPS.length ? (
                                            <PrimaryButton
                                                type="button"
                                                onClick={handleNext}
                                            >
                                                Next
                                            </PrimaryButton>
                                        ) : (
                                            <PrimaryButton type="submit">
                                                Submit
                                            </PrimaryButton>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
