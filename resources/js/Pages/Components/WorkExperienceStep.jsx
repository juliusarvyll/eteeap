import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';

export default function WorkExperienceStep({
    formData,
    errors,
    handleArrayFieldChange,
    addArrayItem,
    removeArrayItem
}) {
    // Initialize workExperiences if it's empty
    if (!formData.workExperiences || formData.workExperiences.length === 0) {
        addArrayItem('workExperiences', {
            designation: '',
            companyName: '',
            companyAddress: '',
            dateFrom: '',
            dateTo: '',
            employmentStatus: '',
            supervisorName: '',
            reasonForLeaving: '',
            responsibilities: '',
            references: ['', '', ''],
            documents: null
        });
    }

    const handleFileChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            // You can add file size validation here if needed
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('File size should not exceed 2MB');
                e.target.value = '';
                return;
            }
            handleArrayFieldChange('workExperiences', index, 'documents', file);
        }
    };

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

            {formData.workExperiences?.map((experience, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('workExperiences', index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel value="Designation/Position" required />
                            <TextInput
                                name="designation"
                                value={experience.designation}
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'designation', e.target.value)}
                                className={`mt-1 block w-full ${errors[`workExperiences.${index}.designation`] ? 'border-red-500' : ''}`}
                            />
                            <InputError message={errors[`workExperiences.${index}.designation`]} />
                        </div>

                        <div>
                            <InputLabel value="Company Name" required />
                            <TextInput
                                name="companyName"
                                value={experience.companyName}
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'companyName', e.target.value)}
                                className={`mt-1 block w-full ${errors[`workExperiences.${index}.companyName`] ? 'border-red-500' : ''}`}
                            />
                            <InputError message={errors[`workExperiences.${index}.companyName`]} />
                        </div>
                    </div>

                    <div>
                        <InputLabel value="Company Address" required />
                        <TextInput
                            name="companyAddress"
                            value={experience.companyAddress}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'companyAddress', e.target.value)}
                            className={`mt-1 block w-full ${errors[`workExperiences.${index}.companyAddress`] ? 'border-red-500' : ''}`}
                        />
                        <InputError message={errors[`workExperiences.${index}.companyAddress`]} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel value="Start Date" required />
                            <TextInput
                                type="date"
                                name="dateFrom"
                                value={experience.dateFrom}
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'dateFrom', e.target.value)}
                                className={`mt-1 block w-full ${errors[`workExperiences.${index}.dateFrom`] ? 'border-red-500' : ''}`}
                            />
                            <InputError message={errors[`workExperiences.${index}.dateFrom`]} />
                        </div>

                        <div>
                            <InputLabel value="End Date" required />
                            <TextInput
                                type="date"
                                name="dateTo"
                                value={experience.dateTo}
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'dateTo', e.target.value)}
                                className={`mt-1 block w-full ${errors[`workExperiences.${index}.dateTo`] ? 'border-red-500' : ''}`}
                            />
                            <InputError message={errors[`workExperiences.${index}.dateTo`]} />
                        </div>
                    </div>

                    <div>
                        <InputLabel value="Employment Status" required />
                        <TextInput
                            name="employmentStatus"
                            value={experience.employmentStatus}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'employmentStatus', e.target.value)}
                            className={`mt-1 block w-full ${errors[`workExperiences.${index}.employmentStatus`] ? 'border-red-500' : ''}`}
                        />
                        <InputError message={errors[`workExperiences.${index}.employmentStatus`]} />
                    </div>

                    <div>
                        <InputLabel value="Supervisor Name" required />
                        <TextInput
                            name="supervisorName"
                            value={experience.supervisorName}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'supervisorName', e.target.value)}
                            className={`mt-1 block w-full ${errors[`workExperiences.${index}.supervisorName`] ? 'border-red-500' : ''}`}
                        />
                        <InputError message={errors[`workExperiences.${index}.supervisorName`]} />
                    </div>

                    <div>
                        <InputLabel value="Reason for Leaving" required />
                        <TextArea
                            name="reasonForLeaving"
                            value={experience.reasonForLeaving}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'reasonForLeaving', e.target.value)}
                            className={`mt-1 block w-full ${errors[`workExperiences.${index}.reasonForLeaving`] ? 'border-red-500' : ''}`}
                        />
                        <InputError message={errors[`workExperiences.${index}.reasonForLeaving`]} />
                    </div>

                    <div>
                        <InputLabel value="Responsibilities" required />
                        <TextArea
                            name="responsibilities"
                            value={experience.responsibilities}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'responsibilities', e.target.value)}
                            className={`mt-1 block w-full ${errors[`workExperiences.${index}.responsibilities`] ? 'border-red-500' : ''}`}
                        />
                        <InputError message={errors[`workExperiences.${index}.responsibilities`]} />
                    </div>

                    <div>
                        <InputLabel value="References (3 persons)" required />
                        {[0, 1, 2].map((refIndex) => (
                            <TextInput
                                key={refIndex}
                                name={`references.${refIndex}`}
                                value={experience.references[refIndex] || ''}
                                onChange={(e) => {
                                    const newRefs = [...experience.references];
                                    newRefs[refIndex] = e.target.value;
                                    handleArrayFieldChange('workExperiences', index, 'references', newRefs);
                                }}
                                className="mt-1 block w-full"
                                placeholder={`Reference Person ${refIndex + 1}`}
                            />
                        ))}
                        <InputError message={errors[`workExperiences.${index}.references`]} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel value="Supporting Documents" />
                        <input
                            type="file"
                            name={`workExperiences[${index}].documents`}
                            onChange={(e) => handleFileChange(index, e)}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className={`block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100
                                ${errors[`workExperiences.${index}.documents`] ? 'border-red-500' : ''}`}
                        />
                        <p className="text-xs text-gray-500">
                            Upload certificates, recommendation letters, etc. (PDF, JPG, PNG format, max 2MB)
                        </p>
                        {errors[`workExperiences.${index}.documents`] && (
                            <InputError 
                                message={errors[`workExperiences.${index}.documents`]} 
                                className="mt-1" 
                            />
                        )}
                        {experience.documents && typeof experience.documents === 'string' && (
                            <div className="mt-2">
                                <span className="text-sm text-gray-600">
                                    Current file: {experience.documents.split('/').pop()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <PrimaryButton
                type="button"
                onClick={() => addArrayItem('workExperiences', {
                    designation: '',
                    companyName: '',
                    companyAddress: '',
                    dateFrom: '',
                    dateTo: '',
                    employmentStatus: '',
                    supervisorName: '',
                    reasonForLeaving: '',
                    responsibilities: '',
                    references: ['', '', ''],
                    documents: null
                })}
            >
                Add Work Experience
            </PrimaryButton>
        </div>
    );
}
