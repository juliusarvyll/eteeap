import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function PersonalInfoStep({ formData, errors, handleInputChange }) {
    // Helper function to handle file changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleInputChange({
            target: {
                name: e.target.name,
                value: file
            }
        });
    };

    // Function to render required document based on civil status
    const renderRequiredDocument = () => {
        switch (formData.civilStatus) {
            case 'Single':
                return (
                    <div className="space-y-2">
                        <InputLabel htmlFor="document" value="Birth Certificate (PSA)" />
                        <input
                            type="file"
                            id="document"
                            name="document"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-gray-500">Upload PSA Birth Certificate (PDF, JPG, PNG format)</p>
                        <InputError message={errors.document} className="mt-1" />
                    </div>
                );
            case 'Married':
                return (
                    <div className="space-y-2">
                        <InputLabel htmlFor="document" value="Marriage Certificate (PSA)" />
                        <input
                            type="file"
                            id="document"
                            name="document"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-gray-500">Upload PSA Marriage Certificate (PDF, JPG, PNG format)</p>
                        <InputError message={errors.document} className="mt-1" />
                    </div>
                );
            case 'Separated':
                return (
                    <div className="space-y-2">
                        <InputLabel htmlFor="document" value="Legal Separation Document" />
                        <input
                            type="file"
                            id="document"
                            name="document"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-gray-500">Upload Legal Separation Document (PDF, JPG, PNG format)</p>
                        <InputError message={errors.document} className="mt-1" />
                    </div>
                );
            case 'Widow':
                return (
                    <div className="space-y-2">
                        <InputLabel htmlFor="document" value="Death Certificate of Spouse (PSA)" />
                        <input
                            type="file"
                            id="document"
                            name="document"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-gray-500">Upload Death Certificate of Spouse (PDF, JPG, PNG format)</p>
                        <InputError message={errors.document} className="mt-1" />
                    </div>
                );
            case 'Divorced':
                return (
                    <div className="space-y-2">
                        <InputLabel htmlFor="document" value="Divorce Papers" />
                        <input
                            type="file"
                            id="document"
                            name="document"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-gray-500">Upload Divorce Papers (PDF, JPG, PNG format)</p>
                        <InputError message={errors.document} className="mt-1" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Full Name Section */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <InputLabel htmlFor="lastName" value="Last Name" />
                    <TextInput
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                    <InputError message={errors.lastName} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="firstName" value="First Name" />
                    <TextInput
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                    <InputError message={errors.firstName} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="middleName" value="Middle Name" />
                    <TextInput
                        id="middleName"
                        name="middleName"
                        value={formData.middleName}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                    <InputError message={errors.middleName} className="mt-2" />
                </div>
            </div>

            {/* Address */}
            <div>
                <InputLabel htmlFor="address" value="Complete Address" />
                <TextInput
                    id="address"
                    name="address"
                    value={formData.address}
                    className="mt-1 block w-full"
                    placeholder="Building number/name, street name, district, city, province"
                    onChange={handleInputChange}
                />
                <InputError message={errors.address} className="mt-2" />
            </div>

            {/* ZIP Code */}
            <div>
                <InputLabel htmlFor="zipCode" value="ZIP Code" />
                <TextInput
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    className="mt-1 block w-full"
                    onChange={handleInputChange}
                />
                <InputError message={errors.zipCode} className="mt-2" />
            </div>

            {/* Contact Number */}
            <div>
                <InputLabel htmlFor="contactNumber" value="Telephone/Mobile Number(s)" />
                <TextInput
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    className="mt-1 block w-full"
                    placeholder="Include area code for areas outside Metro Manila"
                    onChange={handleInputChange}
                />
                <InputError message={errors.contactNumber} className="mt-2" />
            </div>

            {/* Birth Date */}
            <div>
                <InputLabel htmlFor="birthDate" value="Birth Date" />
                <TextInput
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    className="mt-1 block w-full"
                    onChange={handleInputChange}
                />
                <InputError message={errors.birthDate} className="mt-2" />
            </div>

            {/* Place of Birth */}
            <div>
                <InputLabel htmlFor="birthPlace" value="Place of Birth" />
                <TextInput
                    id="birthPlace"
                    name="birthPlace"
                    value={formData.birthPlace}
                    className="mt-1 block w-full"
                    placeholder="City/Municipality and Province"
                    onChange={handleInputChange}
                />
                <InputError message={errors.birthPlace} className="mt-2" />
            </div>

            {/* Civil Status with Required Document */}
            <div className="space-y-4">
                <div>
                    <InputLabel value="Civil Status" />
                    <div className="mt-2 space-y-2">
                        {['Single', 'Married', 'Separated', 'Widow', 'Divorced'].map((status) => (
                            <label key={status} className="flex items-center">
                                <input
                                    type="radio"
                                    name="civilStatus"
                                    value={status}
                                    checked={formData.civilStatus === status}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                {status}
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.civilStatus} className="mt-2" />
                </div>

                {/* Required Document Section */}
                {formData.civilStatus && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">Required Document</h3>
                        {renderRequiredDocument()}
                    </div>
                )}
            </div>

            {/* Sex */}
            <div>
                <InputLabel value="Sex" />
                <div className="mt-2 space-y-2">
                    {['Male', 'Female'].map((sex) => (
                        <label key={sex} className="flex items-center">
                            <input
                                type="radio"
                                name="sex"
                                value={sex}
                                checked={formData.sex === sex}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            {sex}
                        </label>
                    ))}
                </div>
                <InputError message={errors.sex} className="mt-2" />
            </div>

            {/* Nationality */}
            <div>
                <InputLabel value="Nationality" />
                <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="nationality"
                            value="Filipino"
                            checked={formData.nationality === 'Filipino'}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Filipino
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="nationality"
                            value="Others"
                            checked={formData.nationality === 'Others'}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Others
                    </label>
                    {formData.nationality === 'Others' && (
                        <TextInput
                            id="otherNationality"
                            name="otherNationality"
                            value={formData.otherNationality}
                            className="mt-1 block w-full"
                            placeholder="Please specify"
                            onChange={handleInputChange}
                        />
                    )}
                </div>
                <InputError message={errors.nationality} className="mt-2" />
            </div>

            {/* Languages */}
            <div>
                <InputLabel htmlFor="languages" value="Languages and Dialects" />
                <TextInput
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    className="mt-1 block w-full"
                    placeholder="e.g., English, Filipino, Ibanag, Ilokano, Cebuano, etc."
                    onChange={handleInputChange}
                />
                <InputError message={errors.languages} className="mt-2" />
            </div>
        </div>
    );
} 