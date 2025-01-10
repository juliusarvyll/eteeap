import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';

export default function WorkExperienceStep({ 
    formData, 
    errors, 
    handleInputChange,
    handleArrayFieldChange,
    addArrayItem,
    removeArrayItem 
}) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold mb-4">III. PAID WORK AND OTHER EXPERIENCES</h2>
                <p className="text-sm text-gray-600 mb-6">
                    This section will describe the relevant work experiences you have and indicate the type of learning 
                    obtained in the course of your employment. Please list your experiences in chronological order. 
                    Include concurrently held positions such as consultant, and part-time employment as well.
                </p>
            </div>

            {formData.workExperiences.map((experience, index) => (
                <div key={index} className="border p-6 rounded-lg space-y-6">
                    {/* 1.1 Post/Designation */}
                    <div>
                        <InputLabel 
                            value={`1.1 Post / Designation ${index + 1}`} 
                            className="font-semibold"
                        />
                        <TextInput
                            value={experience.designation}
                            className="mt-1 block w-full"
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'designation', e.target.value)}
                        />
                        <InputError message={errors[`workExperiences.${index}.designation`]} className="mt-2" />
                    </div>

                    {/* 1.2 Inclusive Date of Employment */}
                    <div>
                        <InputLabel 
                            value="1.2 Inclusive Date of Employment" 
                            className="font-semibold"
                        />
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <InputLabel value="From" className="text-sm" />
                                <TextInput
                                    type="date"
                                    value={experience.dateFrom}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('workExperiences', index, 'dateFrom', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="To" className="text-sm" />
                                <TextInput
                                    type="date"
                                    value={experience.dateTo}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('workExperiences', index, 'dateTo', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 1.3 Company Details */}
                    <div>
                        <InputLabel 
                            value="1.3 Name and Address of Company" 
                            className="font-semibold"
                        />
                        <div className="space-y-4 mt-2">
                            <TextInput
                                value={experience.companyName}
                                className="block w-full"
                                placeholder="Company Name"
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'companyName', e.target.value)}
                            />
                            <TextArea
                                value={experience.companyAddress}
                                className="block w-full"
                                placeholder="Company Address"
                                rows={2}
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'companyAddress', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 1.4 Employment Status */}
                    <div>
                        <InputLabel 
                            value="1.4 Terms / Status of Employment" 
                            className="font-semibold"
                        />
                        <TextInput
                            value={experience.employmentStatus}
                            className="mt-1 block w-full"
                            placeholder="e.g., Full-time, Part-time, Contract"
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'employmentStatus', e.target.value)}
                        />
                    </div>

                    {/* 1.5 Supervisor */}
                    <div>
                        <InputLabel 
                            value="1.5 Name and Designation of Immediate Supervisor" 
                            className="font-semibold"
                        />
                        <TextInput
                            value={experience.supervisorName}
                            className="mt-1 block w-full"
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'supervisorName', e.target.value)}
                        />
                    </div>

                    {/* 1.6 Reason for Leaving */}
                    <div>
                        <InputLabel 
                            value="1.6 Reason(s) for Moving on to Next Job" 
                            className="font-semibold"
                        />
                        <TextArea
                            value={experience.reasonForLeaving}
                            className="mt-1 block w-full"
                            rows={2}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'reasonForLeaving', e.target.value)}
                        />
                    </div>

                    {/* 1.7 Functions and Responsibilities */}
                    <div>
                        <InputLabel 
                            value="1.7 Describe actual functions and responsibilities in position occupied" 
                            className="font-semibold"
                        />
                        <TextArea
                            value={experience.responsibilities}
                            className="mt-1 block w-full"
                            rows={4}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'responsibilities', e.target.value)}
                        />
                    </div>

                    {/* 1.8 Self-Employment References */}
                    <div>
                        <InputLabel 
                            value="1.8 In case of self-employment, name three (3) reference persons" 
                            className="font-semibold"
                        />
                        {experience.references.map((ref, refIndex) => (
                            <div key={refIndex} className="mt-2">
                                <TextInput
                                    value={ref}
                                    className="block w-full"
                                    placeholder={`Reference Person ${refIndex + 1}`}
                                    onChange={(e) => {
                                        const newRefs = [...experience.references];
                                        newRefs[refIndex] = e.target.value;
                                        handleArrayFieldChange('workExperiences', index, 'references', newRefs);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Remove Button */}
                    {formData.workExperiences.length > 1 && (
                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={() => removeArrayItem('workExperiences', index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove Work Experience
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* Add Button */}
            <div>
                <PrimaryButton
                    type="button"
                    onClick={() => addArrayItem('workExperiences', {
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
                    })}
                >
                    Add Another Work Experience
                </PrimaryButton>
            </div>
        </div>
    );
} 