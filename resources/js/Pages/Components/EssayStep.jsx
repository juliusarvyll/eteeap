import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';

export default function EssayStep({ 
    formData, 
    errors, 
    handleInputChange 
}) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold mb-4">VII. PERSONAL ESSAY</h2>
                <p className="text-sm text-gray-600 mb-2">
                    Please write an essay on the following topic, in the language you are most comfortable with, 
                    not to exceed two pages of short size bond paper:
                </p>
                <p className="text-base font-medium text-gray-800 mb-6 italic">
                    "If you finish your degree, how will this contribute to your personal development, 
                    to the development of your community, your work place, society and country?"
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <InputLabel 
                        htmlFor="essay" 
                        value="Your Essay" 
                        className="font-semibold"
                    />
                    <div className="mt-2">
                        <TextArea
                            id="essay"
                            name="essay"
                            value={formData.essay}
                            className="mt-1 block w-full"
                            rows={15}
                            placeholder="Write your essay here..."
                            onChange={handleInputChange}
                        />
                        <InputError message={errors.essay} className="mt-2" />
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    <p>Tips for writing your essay:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                        <li>Be clear and concise in your writing</li>
                        <li>Structure your essay with an introduction, body paragraphs, and conclusion</li>
                        <li>Address all aspects of the topic: personal, community, workplace, society, and country</li>
                        <li>Use specific examples to support your points</li>
                        <li>Proofread your essay before submitting</li>
                    </ul>
                </div>

                <div className="text-sm text-gray-500">
                    <p className="font-medium">Consider addressing these points:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                        <li>Personal growth and career advancement</li>
                        <li>Impact on your family and immediate community</li>
                        <li>Contributions to your workplace and industry</li>
                        <li>Broader societal impact</li>
                        <li>National development and progress</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 