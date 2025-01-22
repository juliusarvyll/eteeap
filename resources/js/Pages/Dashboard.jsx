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
import ConfirmationStep from './Components/ConfirmationStep';
import axios from 'axios';

const STEPS = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Learning Objectives' },
    { number: 3, title: 'Education' },
    { number: 4, title: 'Work Experience' },
    { number: 5, title: 'Honors & Awards' },
    { number: 6, title: 'Creative Works' },
    { number: 7, title: 'Lifelong Learning' },
    { number: 8, title: 'Essay' },
    { number: 9, title: 'Confirmation' }
];

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Personal Info
        firstName: '',
        lastName: '',
        email: '',
        middleName: '',
        suffix: '',
        birthDate: '',
        placeOfBirth: '',  
        civilStatus: '',
        sex: '',
        religion: '',
        languages: '',
        document: null,
        status: '',
        address: '',
        zipCode: '',
        contactNumber: '',
        nationality: '',
        
        
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
        hasElementaryDiploma: false,
        elementaryDiplomaFile: null,
        
        secondaryEducationType: 'regular',
        hasPEPT: false,
        peptYear: '',
        peptGrade: '',
        
        highSchools: [{
            name: '',
            address: '',
            type: '',
            dateFrom: '',
            dateTo: ''
        }],
        
        hasPostSecondaryDiploma: false,
        postSecondaryDiplomaFile: null,
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
            institution: '',
            dateReceived: '',
            description: '',
            document: null
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
        applicant_id: '',
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

        // Clear PEPT fields when hasPEPT is false
        if (name === 'hasPEPT' && !checked) {
            setFormData(prev => ({
                ...prev,
                peptYear: '',
                peptGrade: ''
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
                    'Content-Type': (currentStep === 1 || currentStep === 3 || currentStep === 4 || currentStep === 5) 
                        ? 'multipart/form-data' 
                        : 'application/json',
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
                formDataObj.append('placeOfBirth', formData.placeOfBirth);
                formDataObj.append('civilStatus', formData.civilStatus);
                formDataObj.append('sex', formData.sex);
                formDataObj.append('religion', formData.religion);
                formDataObj.append('languages', formData.languages);
                // Add missing required fields
                formDataObj.append('address', formData.address);
                formDataObj.append('zipCode', formData.zipCode);
                formDataObj.append('contactNumber', formData.contactNumber);
                formDataObj.append('nationality', formData.nationality);
                
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

            case 3: // Education
                const educationFormData = new FormData();
                
                // Convert boolean values to '1' or '0' strings for PHP
                educationFormData.append('hasElementaryDiploma', formData.hasElementaryDiploma ? '1' : '0');
                educationFormData.append('hasPEPT', formData.hasPEPT ? '1' : '0');
                educationFormData.append('hasPostSecondaryDiploma', formData.hasPostSecondaryDiploma ? '1' : '0');
                
                // Append basic fields
                educationFormData.append('applicant_id', formData.applicant_id);
                
                // Elementary
                educationFormData.append('elementarySchool', formData.elementarySchool);
                educationFormData.append('elementaryAddress', formData.elementaryAddress);
                educationFormData.append('elementaryDateFrom', formData.elementaryDateFrom);
                educationFormData.append('elementaryDateTo', formData.elementaryDateTo);
                
                // Append elementary diploma file if exists
                if (formData.elementaryDiplomaFile instanceof File) {
                    educationFormData.append('elementaryDiplomaFile', formData.elementaryDiplomaFile);
                }

                // Secondary Education Type
                educationFormData.append('secondaryEducationType', formData.secondaryEducationType);
                
                if (formData.hasPEPT) {
                    // PEPT
                    educationFormData.append('peptYear', formData.peptYear);
                    educationFormData.append('peptGrade', formData.peptGrade);
                } else {
                    // High Schools
                    formData.highSchools.forEach((school, index) => {
                        educationFormData.append(`highSchools[${index}][name]`, school.name);
                        educationFormData.append(`highSchools[${index}][address]`, school.address);
                        educationFormData.append(`highSchools[${index}][type]`, school.type);
                        educationFormData.append(`highSchools[${index}][dateFrom]`, school.dateFrom);
                        educationFormData.append(`highSchools[${index}][dateTo]`, school.dateTo);
                    });
                }

                // Post Secondary
                if (formData.hasPostSecondaryDiploma) {
                    educationFormData.append('postSecondaryDiplomaFile', formData.postSecondaryDiplomaFile);
                }
                
                formData.postSecondary.forEach((edu, index) => {
                    educationFormData.append(`postSecondary[${index}][program]`, edu.program);
                    educationFormData.append(`postSecondary[${index}][institution]`, edu.institution);
                    educationFormData.append(`postSecondary[${index}][schoolYear]`, edu.schoolYear);
                });

                // Non-Formal Education
                formData.nonFormalEducation.forEach((edu, index) => {
                    educationFormData.append(`nonFormalEducation[${index}][title]`, edu.title);
                    educationFormData.append(`nonFormalEducation[${index}][organization]`, edu.organization);
                    educationFormData.append(`nonFormalEducation[${index}][date]`, edu.date);
                    educationFormData.append(`nonFormalEducation[${index}][certificate]`, edu.certificate);
                    educationFormData.append(`nonFormalEducation[${index}][participation]`, edu.participation);
                });

                // Certifications
                formData.certifications.forEach((cert, index) => {
                    educationFormData.append(`certifications[${index}][title]`, cert.title);
                    educationFormData.append(`certifications[${index}][agency]`, cert.agency);
                    educationFormData.append(`certifications[${index}][dateCertified]`, cert.dateCertified);
                    educationFormData.append(`certifications[${index}][rating]`, cert.rating);
                });

                return educationFormData;

            case 4: // Work Experience
                const workExperienceFormData = new FormData();
                workExperienceFormData.append('applicant_id', formData.applicant_id);
                
                // Append each work experience as a separate entry
                formData.workExperiences.forEach((exp, index) => {
                    if (exp.designation || exp.companyName) {
                        workExperienceFormData.append(`workExperiences[${index}][designation]`, exp.designation);
                        workExperienceFormData.append(`workExperiences[${index}][dateFrom]`, exp.dateFrom);
                        workExperienceFormData.append(`workExperiences[${index}][dateTo]`, exp.dateTo);
                        workExperienceFormData.append(`workExperiences[${index}][companyName]`, exp.companyName);
                        workExperienceFormData.append(`workExperiences[${index}][companyAddress]`, exp.companyAddress);
                        workExperienceFormData.append(`workExperiences[${index}][employmentStatus]`, exp.employmentStatus);
                        workExperienceFormData.append(`workExperiences[${index}][supervisorName]`, exp.supervisorName);
                        workExperienceFormData.append(`workExperiences[${index}][reasonForLeaving]`, exp.reasonForLeaving);
                        workExperienceFormData.append(`workExperiences[${index}][responsibilities]`, exp.responsibilities);
                        
                        // Handle references array
                        exp.references.forEach((ref, refIndex) => {
                            workExperienceFormData.append(`workExperiences[${index}][references][${refIndex}]`, ref);
                        });
                        
                        // Handle document file if it exists
                        if (exp.documents instanceof File) {
                            workExperienceFormData.append(`workExperiences[${index}][documents]`, exp.documents);
                        }
                    }
                });

                return workExperienceFormData;

            case 5: // Awards
                const awardsFormData = new FormData();
                awardsFormData.append('applicant_id', formData.applicant_id);

                // Academic Awards
                formData.academicAwards.forEach((award, index) => {
                    if (award.title || award.institution) {
                        awardsFormData.append(`academicAwards[${index}][title]`, award.title);
                        awardsFormData.append(`academicAwards[${index}][institution]`, award.institution);
                        awardsFormData.append(`academicAwards[${index}][dateReceived]`, award.dateReceived);
                        awardsFormData.append(`academicAwards[${index}][description]`, award.description);
                        
                        // Handle document file if exists
                        if (award.document instanceof File) {
                            awardsFormData.append(`academicAwards[${index}][document]`, award.document);
                        }
                    }
                });

                // Community Awards
                formData.communityAwards.forEach((award, index) => {
                    if (award.title || award.organization) {
                        awardsFormData.append(`communityAwards[${index}][title]`, award.title);
                        awardsFormData.append(`communityAwards[${index}][organization]`, award.organization);
                        awardsFormData.append(`communityAwards[${index}][dateAwarded]`, award.dateAwarded);
                    }
                });

                // Work Awards
                formData.workAwards.forEach((award, index) => {
                    if (award.title || award.organization) {
                        awardsFormData.append(`workAwards[${index}][title]`, award.title);
                        awardsFormData.append(`workAwards[${index}][organization]`, award.organization);
                        awardsFormData.append(`workAwards[${index}][dateAwarded]`, award.dateAwarded);
                    }
                });

                return awardsFormData;

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
            case 9:
                return <ConfirmationStep formData={formData} />;
            default:
                return {};
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep < STEPS.length - 1) {
            handleNext();
        } else {
            setLoading(true);
            try {
                const response = await axios.post('/application/finalize', {
                    applicant_id: formData.applicant_id,
                    status: 'pending'
                });
                
                setFormData(prev => ({
                    ...prev,
                    status: 'pending'
                }));
                
                setCurrentStep(STEPS.length);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setErrors({
                    submit: 'Failed to submit application. Please try again.'
                });
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

    // Make sure applicant_id is set when the component loads
    useEffect(() => {
        // You might get this from props or an API call
        setFormData(prevState => ({
            ...prevState,
            applicant_id: 'APP-2025-00003' // Or however you get this value
        }));
    }, []);

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
            case 9:
                return <ConfirmationStep formData={formData} />;
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
