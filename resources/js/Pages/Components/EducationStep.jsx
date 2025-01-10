import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EducationStep({ 
    formData, 
    errors, 
    handleInputChange,
    handleArrayFieldChange,
    addArrayItem,
    removeArrayItem
}) {
    return (
        <div className="space-y-8">
            {/* A. Formal Education */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold">A. Formal Education</h2>

                {/* 1. Elementary */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">1. Elementary</h3>
                    
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">1.1 What is the name and address of the elementary school you attended?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="elementarySchool" value="Name of School" />
                                <TextInput
                                    id="elementarySchool"
                                    name="elementarySchool"
                                    value={formData.elementarySchool}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                />
                                <InputError message={errors.elementarySchool} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="elementaryAddress" value="Address" />
                                <TextInput
                                    id="elementaryAddress"
                                    name="elementaryAddress"
                                    value={formData.elementaryAddress}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                />
                                <InputError message={errors.elementaryAddress} className="mt-2" />
                            </div>
                        </div>

                        <p className="text-sm text-gray-600">1.2 What are the inclusive dates of attendance in elementary school?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="elementaryDateFrom" value="From" />
                                <TextInput
                                    id="elementaryDateFrom"
                                    name="elementaryDateFrom"
                                    type="date"
                                    value={formData.elementaryDateFrom}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                />
                                <InputError message={errors.elementaryDateFrom} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="elementaryDateTo" value="To" />
                                <TextInput
                                    id="elementaryDateTo"
                                    name="elementaryDateTo"
                                    type="date"
                                    value={formData.elementaryDateTo}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                />
                                <InputError message={errors.elementaryDateTo} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">1.3 Do you have your elementary school diploma?</p>
                            <div className="mt-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="hasElementaryDiploma"
                                        checked={formData.hasElementaryDiploma}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Yes
                                </label>
                            </div>
                            {formData.hasElementaryDiploma && (
                                <div className="mt-4">
                                    <InputLabel htmlFor="elementaryDiplomaFile" value="Upload Elementary Diploma" />
                                    <input
                                        type="file"
                                        id="elementaryDiplomaFile"
                                        name="elementaryDiplomaFile"
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                                    />
                                    <InputError message={errors.elementaryDiplomaFile} className="mt-2" />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 2. High School */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">2. High School</h3>
                    
                    <div>
                        <p className="text-sm text-gray-600">2.1 Do you have your high school diploma?</p>
                        <div className="mt-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasHighSchoolDiploma"
                                    checked={formData.hasHighSchoolDiploma}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Yes
                            </label>
                        </div>
                        {formData.hasHighSchoolDiploma && (
                            <div className="mt-4">
                                <InputLabel htmlFor="highSchoolDiplomaFile" value="Upload High School Diploma" />
                                <input
                                    type="file"
                                    id="highSchoolDiplomaFile"
                                    name="highSchoolDiplomaFile"
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                />
                                <InputError message={errors.highSchoolDiplomaFile} className="mt-2" />
                            </div>
                        )}
                    </div>
                    
                    <p className="text-sm text-gray-600">2.2 List all high schools you attended, their addresses, and the type of school:</p>
                    
                    {formData.highSchools.map((school, index) => (
                        <div key={index} className="border p-4 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Name of School" />
                                    <TextInput
                                        value={school.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleArrayFieldChange('highSchools', index, 'name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Address" />
                                    <TextInput
                                        value={school.address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleArrayFieldChange('highSchools', index, 'address', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Type of School" />
                                    <TextInput
                                        value={school.type}
                                        className="mt-1 block w-full"
                                        placeholder="e.g., Middle School, Junior High, Senior High"
                                        onChange={(e) => handleArrayFieldChange('highSchools', index, 'type', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel value="From" />
                                        <TextInput
                                            type="date"
                                            value={school.dateFrom}
                                            className="mt-1 block w-full"
                                            onChange={(e) => handleArrayFieldChange('highSchools', index, 'dateFrom', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="To" />
                                        <TextInput
                                            type="date"
                                            value={school.dateTo}
                                            className="mt-1 block w-full"
                                            onChange={(e) => handleArrayFieldChange('highSchools', index, 'dateTo', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {formData.highSchools.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('highSchools', index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove School
                                </button>
                            )}
                        </div>
                    ))}
                    <PrimaryButton
                        type="button"
                        onClick={() => addArrayItem('highSchools', {
                            name: '',
                            address: '',
                            type: '',
                            dateFrom: '',
                            dateTo: ''
                        })}
                    >
                        Add Another School
                    </PrimaryButton>
                </section>

                {/* 3. PEPT */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">3. Philippine Educational Placement Test (PEPT) Equivalency</h3>
                    
                    <div>
                        <p className="text-sm text-gray-600">3.1 Did you obtain a high school diploma through PEPT?</p>
                        <label className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="hasPEPT"
                                checked={formData.hasPEPT}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Yes
                        </label>
                    </div>

                    {formData.hasPEPT && (
                        <>
                            <div>
                                <p className="text-sm text-gray-600">3.2 When was your PEPT certification issued?</p>
                                <div className="mt-2">
                                    <InputLabel htmlFor="peptYear" value="Year" />
                                    <TextInput
                                        id="peptYear"
                                        name="peptYear"
                                        type="number"
                                        value={formData.peptYear}
                                        className="mt-1 block w-full"
                                        onChange={handleInputChange}
                                    />
                                    <InputError message={errors.peptYear} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">3.3 What was your placement grade or year level?</p>
                                <div className="mt-2">
                                    <InputLabel htmlFor="peptGrade" value="Grade/Year" />
                                    <TextInput
                                        id="peptGrade"
                                        name="peptGrade"
                                        value={formData.peptGrade}
                                        className="mt-1 block w-full"
                                        onChange={handleInputChange}
                                    />
                                    <InputError message={errors.peptGrade} className="mt-2" />
                                </div>
                            </div>
                        </>
                    )}
                </section>

                {/* 4. Post-Secondary */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">4. Post-Secondary Formal Education</h3>
                    
                    <div>
                        <p className="text-sm text-gray-600">4.1 Do you have any post-secondary diplomas or degrees?</p>
                        <div className="mt-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasPostSecondaryDiploma"
                                    checked={formData.hasPostSecondaryDiploma}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Yes
                            </label>
                        </div>
                    </div>
                    {formData.hasPostSecondaryDiploma && (
                        <div className="mt-4">
                            <InputLabel htmlFor="postSecondaryDiplomaFile" value="Upload Post-Secondary Diploma(s)" />
                            <input
                                type="file"
                                id="postSecondaryDiplomaFile"
                                name="postSecondaryDiplomaFile"
                                onChange={handleInputChange}
                                multiple
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                            <p className="mt-1 text-sm text-gray-500">You can select multiple files if you have more than one diploma</p>
                            <InputError message={errors.postSecondaryDiplomaFile} className="mt-2" />
                        </div>
                    )}

                    <p className="text-sm text-gray-600">4.2 Provide details about any post-secondary courses or degree programs:</p>

                    {formData.postSecondary.map((education, index) => (
                        <div key={index} className="border p-4 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Course/Degree Program Enrolled" />
                                    <TextInput
                                        value={education.program}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleArrayFieldChange('postSecondary', index, 'program', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Name of Institution" />
                                    <TextInput
                                        value={education.institution}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleArrayFieldChange('postSecondary', index, 'institution', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <InputLabel value="School Year(s)" />
                                    <TextInput
                                        value={education.schoolYear}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleArrayFieldChange('postSecondary', index, 'schoolYear', e.target.value)}
                                    />
                                </div>
                            </div>
                            {formData.postSecondary.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('postSecondary', index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove Entry
                                </button>
                            )}
                        </div>
                    ))}
                    <PrimaryButton
                        type="button"
                        onClick={() => addArrayItem('postSecondary', {
                            program: '',
                            institution: '',
                            schoolYear: ''
                        })}
                    >
                        Add Another Entry
                    </PrimaryButton>
                </section>
            </div>

            {/* B. Non-Formal Education */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold">B. Non-Formal Education</h2>
                <p className="text-sm text-gray-600">
                    Non-formal education refers to short-term, structured training programs for specific purposes 
                    such as skills development or values orientation.
                </p>

                {formData.nonFormalEducation.map((training, index) => (
                    <div key={index} className="border p-4 rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Title of Training Program" />
                                <TextInput
                                    value={training.title}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('nonFormalEducation', index, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Sponsoring Organization" />
                                <TextInput
                                    value={training.organization}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('nonFormalEducation', index, 'organization', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Date" />
                                <TextInput
                                    type="date"
                                    value={training.date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('nonFormalEducation', index, 'date', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Title of Certificate Obtained" />
                                <TextInput
                                    value={training.certificate}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('nonFormalEducation', index, 'certificate', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Nature of Participation" />
                                <TextInput
                                    value={training.participation}
                                    className="mt-1 block w-full"
                                    placeholder="e.g., Trainer, Participant, Facilitator"
                                    onChange={(e) => handleArrayFieldChange('nonFormalEducation', index, 'participation', e.target.value)}
                                />
                            </div>
                        </div>
                        {formData.nonFormalEducation.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('nonFormalEducation', index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove Entry
                            </button>
                        )}
                    </div>
                ))}
                <PrimaryButton
                    type="button"
                    onClick={() => addArrayItem('nonFormalEducation', {
                        title: '',
                        organization: '',
                        date: '',
                        certificate: '',
                        participation: ''
                    })}
                >
                    Add Another Training Program
                </PrimaryButton>
            </div>

            {/* C. Other Certification Examinations */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold">C. Other Certification Examinations</h2>
                <p className="text-sm text-gray-600">
                    Provide detailed information about certification exams taken for vocational or other skills.
                </p>

                {formData.certifications.map((cert, index) => (
                    <div key={index} className="border p-4 rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Title of Certification Examination" />
                                <TextInput
                                    value={cert.title}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('certifications', index, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Name and Address of Certifying Agency" />
                                <TextInput
                                    value={cert.agency}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('certifications', index, 'agency', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Date Certified" />
                                <TextInput
                                    type="date"
                                    value={cert.dateCertified}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('certifications', index, 'dateCertified', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Rating" />
                                <TextInput
                                    value={cert.rating}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleArrayFieldChange('certifications', index, 'rating', e.target.value)}
                                />
                            </div>
                        </div>
                        {formData.certifications.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('certifications', index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove Entry
                            </button>
                        )}
                    </div>
                ))}
                <PrimaryButton
                    type="button"
                    onClick={() => addArrayItem('certifications', {
                        title: '',
                        agency: '',
                        dateCertified: '',
                        rating: ''
                    })}
                >
                    Add Another Certification
                </PrimaryButton>
            </div>
        </div>
    );
} 