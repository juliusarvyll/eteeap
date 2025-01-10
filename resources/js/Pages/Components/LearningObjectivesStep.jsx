import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

export default function LearningObjectivesStep({ formData, errors, handleInputChange }) {
    return (
        <div className="space-y-6">
            {/* Degree Program Preferences */}
            <div className="space-y-4">
                <InputLabel value="What degree program or field are you applying for?" />
                
                <div>
                    <InputLabel htmlFor="firstPriority" value="First Priority" className="text-sm" />
                    <TextInput
                        id="firstPriority"
                        name="firstPriority"
                        value={formData.firstPriority}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                    <InputError message={errors.firstPriority} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="secondPriority" value="Second Priority" className="text-sm" />
                    <TextInput
                        id="secondPriority"
                        name="secondPriority"
                        value={formData.secondPriority}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                    <InputError message={errors.secondPriority} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="thirdPriority" value="Third Priority" className="text-sm" />
                    <TextInput
                        id="thirdPriority"
                        name="thirdPriority"
                        value={formData.thirdPriority}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                    <InputError message={errors.thirdPriority} className="mt-2" />
                </div>
            </div>

            {/* Personal Goal Statement */}
            <div>
                <InputLabel htmlFor="goalStatement" value="What are your goals, objectives, or purposes for applying for this degree?" />
                <TextArea
                    id="goalStatement"
                    name="goalStatement"
                    value={formData.goalStatement}
                    className="mt-1 block w-full"
                    rows={4}
                    onChange={handleInputChange}
                />
                <InputError message={errors.goalStatement} className="mt-2" />
            </div>

            {/* Time Commitment */}
            <div>
                <InputLabel htmlFor="timeCommitment" value="How much time do you plan to devote to personal learning activities to complete the program requirements?" />
                <TextArea
                    id="timeCommitment"
                    name="timeCommitment"
                    value={formData.timeCommitment}
                    className="mt-1 block w-full"
                    rows={3}
                    placeholder="Be specific"
                    onChange={handleInputChange}
                />
                <InputError message={errors.timeCommitment} className="mt-2" />
            </div>

            {/* Overseas Applicant Plan */}
            <div>
                <InputLabel htmlFor="overseasPlan" value="If you are an overseas applicant, how do you plan to obtain accreditation/equivalency?" />
                <TextArea
                    id="overseasPlan"
                    name="overseasPlan"
                    value={formData.overseasPlan}
                    className="mt-1 block w-full"
                    rows={3}
                    placeholder="e.g., when do you plan to come to the Philippines"
                    onChange={handleInputChange}
                />
                <InputError message={errors.overseasPlan} className="mt-2" />
            </div>

            {/* Cost Payment */}
            <div>
                <InputLabel value="Who will pay for the cost of obtaining your accreditation?" />
                <div className="mt-2 space-y-2">
                    {[
                        'Self-financed',
                        'Scholarship/grant',
                        'Company/employer financing',
                        'Support from a family member',
                        'Loan',
                        'Others'
                    ].map((option) => (
                        <label key={option} className="flex items-center">
                            <input
                                type="radio"
                                name="costPayment"
                                value={option}
                                checked={formData.costPayment === option}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                    {formData.costPayment === 'Others' && (
                        <TextInput
                            id="otherCostPayment"
                            name="otherCostPayment"
                            value={formData.otherCostPayment}
                            className="mt-1 block w-full"
                            placeholder="Please specify"
                            onChange={handleInputChange}
                        />
                    )}
                </div>
                <InputError message={errors.costPayment} className="mt-2" />
            </div>

            {/* Completion Timeline */}
            <div>
                <InputLabel value="How soon do you need to complete accreditation/equivalency?" />
                <div className="mt-2 space-y-2">
                    {[
                        'Less than 1 year',
                        '1 year',
                        '2 years',
                        '3 years',
                        '4 years',
                        'More than 5 years'
                    ].map((timeline) => (
                        <label key={timeline} className="flex items-center">
                            <input
                                type="radio"
                                name="completionTimeline"
                                value={timeline}
                                checked={formData.completionTimeline === timeline}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            {timeline}
                        </label>
                    ))}
                </div>
                <InputError message={errors.completionTimeline} className="mt-2" />
            </div>
        </div>
    );
} 