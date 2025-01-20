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
                            <InputLabel value="Position/Title" required />
                            <TextInput
                                name="position"
                                value={experience.position}
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'position', e.target.value)}
                                className={`mt-1 block w-full ${errors[`workExperiences.${index}.position`] ? 'border-red-500' : ''}`}
                            />
                            {errors[`workExperiences.${index}.position`] && (
                                <InputError message={errors[`workExperiences.${index}.position`]} className="mt-2" />
                            )}
                        </div>

                        <div>
                            <InputLabel value="Company/Organization" required />
                            <TextInput
                                name="company"
                                value={experience.company}
                                onChange={(e) => handleArrayFieldChange('workExperiences', index, 'company', e.target.value)}
                                className={`mt-1 block w-full ${errors[`workExperiences.${index}.company`] ? 'border-red-500' : ''}`}
                            />
                            {errors[`workExperiences.${index}.company`] && (
                                <InputError message={errors[`workExperiences.${index}.company`]} className="mt-2" />
                            )}
                        </div>
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
                            {errors[`workExperiences.${index}.dateFrom`] && (
                                <InputError message={errors[`workExperiences.${index}.dateFrom`]} className="mt-2" />
                            )}
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
                            {errors[`workExperiences.${index}.dateTo`] && (
                                <InputError message={errors[`workExperiences.${index}.dateTo`]} className="mt-2" />
                            )}
                        </div>
                    </div>

                    <div>
                        <InputLabel value="Job Description" required />
                        <TextArea
                            name="description"
                            value={experience.description}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'description', e.target.value)}
                            className={`mt-1 block w-full ${errors[`workExperiences.${index}.description`] ? 'border-red-500' : ''}`}
                            rows={4}
                        />
                        {errors[`workExperiences.${index}.description`] && (
                            <InputError message={errors[`workExperiences.${index}.description`]} className="mt-2" />
                        )}
                    </div>

                    <div>
                        <InputLabel value="Supporting Documents" />
                        <input
                            type="file"
                            name="documents"
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'documents', e.target.files[0])}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className={`mt-1 block w-full ${errors[`workExperiences.${index}.documents`] ? 'border-red-500' : ''}`}
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload certificates, recommendation letters, etc. (PDF, JPG, PNG max 2MB)</p>
                        {errors[`workExperiences.${index}.documents`] && (
                            <InputError message={errors[`workExperiences.${index}.documents`]} className="mt-2" />
                        )}
                    </div>
                </div>
            ))}

            <PrimaryButton
                type="button"
                onClick={() => addArrayItem('workExperiences', {
                    position: '',
                    company: '',
                    dateFrom: '',
                    dateTo: '',
                    description: '',
                    documents: null
                })}
            >
                Add Work Experience
            </PrimaryButton>
        </div>
    );
}
