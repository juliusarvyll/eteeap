import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function HonorsAwardsStep({ 
    formData, 
    errors, 
    handleArrayFieldChange,
    addArrayItem,
    removeArrayItem 
}) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold mb-4">IV. HONORS, AWARDS AND CITATIONS RECEIVED</h2>
                <p className="text-sm text-gray-600 mb-6">
                    In this section, please describe all the awards you have received from schools, 
                    community and civic organizations, as well as citations for work excellence, 
                    outstanding accomplishments, community service, etc.
                </p>
            </div>

            {/* A. Academic Awards */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold">A. ACADEMIC AWARDS</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Award Conferred
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name & Address of Conferring Organization
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Awarded
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.academicAwards.map((award, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            value={award.title}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('academicAwards', index, 'title', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            value={award.organization}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('academicAwards', index, 'organization', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            type="date"
                                            value={award.dateAwarded}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('academicAwards', index, 'dateAwarded', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {formData.academicAwards.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('academicAwards', index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PrimaryButton
                    type="button"
                    onClick={() => addArrayItem('academicAwards', {
                        title: '',
                        organization: '',
                        dateAwarded: ''
                    })}
                >
                    Add Academic Award
                </PrimaryButton>
            </section>

            {/* B. Community Awards */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold">B. COMMUNITY AND CIVIC ORGANIZATION AWARD / CITATION</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Award Conferred
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name & Address of Conferring Organization
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Awarded
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.communityAwards.map((award, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            value={award.title}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('communityAwards', index, 'title', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            value={award.organization}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('communityAwards', index, 'organization', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            type="date"
                                            value={award.dateAwarded}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('communityAwards', index, 'dateAwarded', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {formData.communityAwards.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('communityAwards', index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PrimaryButton
                    type="button"
                    onClick={() => addArrayItem('communityAwards', {
                        title: '',
                        organization: '',
                        dateAwarded: ''
                    })}
                >
                    Add Community Award
                </PrimaryButton>
            </section>

            {/* C. Work Related Awards */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold">C. WORK RELATED AWARD / CITATION</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Award Conferred
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name & Address of Conferring Organization
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Awarded
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.workAwards.map((award, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            value={award.title}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('workAwards', index, 'title', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            value={award.organization}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('workAwards', index, 'organization', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <TextInput
                                            type="date"
                                            value={award.dateAwarded}
                                            className="block w-full"
                                            onChange={(e) => handleArrayFieldChange('workAwards', index, 'dateAwarded', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {formData.workAwards.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('workAwards', index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PrimaryButton
                    type="button"
                    onClick={() => addArrayItem('workAwards', {
                        title: '',
                        organization: '',
                        dateAwarded: ''
                    })}
                >
                    Add Work Award
                </PrimaryButton>
            </section>
        </div>
    );
} 