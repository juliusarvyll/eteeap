<?php

namespace App\Http\Controllers;

use App\Models\PersonalInfo;
use App\Models\LearningObjective;
use App\Models\WorkExperience;
use App\Models\AcademicAward;
use App\Models\CommunityAward;
use App\Models\WorkAward;
use App\Models\Education;
use App\Models\HighSchool;
use App\Models\PostSecondaryEducation;
use App\Models\NonFormalEducation;
use App\Models\Certification;
use App\Models\CreativeWork;
use App\Models\LifelongLearning;
use App\Models\Essay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewApplicationSubmitted;
use App\Models\User;

class ApplicationController extends Controller
{
    private function generateApplicantId()
    {
        $year = date('Y');
        $lastApplication = PersonalInfo::where('applicant_id', 'like', "APP-$year-%")
            ->orderBy('applicant_id', 'desc')
            ->first();

        if ($lastApplication) {
            $lastNumber = intval(substr($lastApplication->applicant_id, -5));
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return sprintf("APP-%s-%05d", $year, $newNumber);
    }

    public function saveStep(Request $request, $step)
    {
        DB::beginTransaction();
        try {
            switch ($step) {
                case 1: // Personal Info
                    $validatedData = $request->validate([
                        'firstName' => 'required|string|max:255',
                        'middleName' => 'nullable|string|max:255',
                        'lastName' => 'required|string|max:255',
                        'address' => 'required|string',
                        'zipCode' => 'required|string|max:20',
                        'contactNumber' => 'required|string|max:50',
                        'birthDate' => 'required|date',
                        'placeOfBirth' => 'required|string|max:255',
                        'civilStatus' => 'required|string|in:Single,Married,Separated,Widow,Divorced',
                        'document' => $request->hasFile('document') ? 'required|file|mimes:pdf,jpg,jpeg,png|max:2048' : 'nullable',
                        'sex' => 'required|string|in:Male,Female',
                        'nationality' => 'required|string|max:255',
                        'languages' => 'required|string|max:255'
                    ]);

                    if ($request->hasFile('document')) {
                        $path = $request->file('document')->store('documents', 'public');
                        $validatedData['document'] = $path;
                    }

                    $personalInfo = PersonalInfo::updateOrCreate(
                        ['applicant_id' => $request->applicant_id ?? $this->generateApplicantId()],
                        $validatedData
                    );

                    $response = ['applicant_id' => $personalInfo->applicant_id];
                    break;

                case 2: // Learning Objectives
                    $validatedData = $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        'firstPriority' => 'required|string',
                        'secondPriority' => 'nullable|string',
                        'thirdPriority' => 'nullable|string',
                        'goalStatement' => 'required|string',
                        'timeCommitment' => 'required|string',
                        'overseasPlan' => 'nullable|string',
                        'costPayment' => 'required|string',
                        'otherCostPayment' => 'nullable|string',
                        'completionTimeline' => 'required|string'
                    ]);

                    LearningObjective::updateOrCreate(
                        ['applicant_id' => $request->applicant_id],
                        $validatedData
                    );
                    break;

                case 3: // Education
                    $validatedData = $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        
                        // Elementary
                        'elementarySchool' => 'required|string',
                        'elementaryAddress' => 'required|string',
                        'elementaryDateFrom' => 'required|date',
                        'elementaryDateTo' => 'required|date|after:elementaryDateFrom',
                        'hasElementaryDiploma' => 'boolean',
                        'elementaryDiplomaFile' => $request->hasFile('elementaryDiplomaFile') ? 'file|mimes:pdf,jpg,jpeg,png|max:2048' : 'nullable',

                        // Secondary Education
                        'hasPEPT' => 'boolean',
                        
                        // PEPT fields only required when hasPEPT is true
                        'peptYear' => 'required_if:hasPEPT,1|nullable|integer',
                        'peptGrade' => 'required_if:hasPEPT,1|nullable|string',

                        // High School fields only required when hasPEPT is false
                        'highSchools' => 'required_if:hasPEPT,0|array',
                        'highSchools.*.name' => 'required_if:hasPEPT,0|string',
                        'highSchools.*.address' => 'required_if:hasPEPT,0|string',
                        'highSchools.*.type' => 'required_if:hasPEPT,0|string',
                        'highSchools.*.dateFrom' => 'required_if:hasPEPT,0|date',
                        'highSchools.*.dateTo' => 'required_if:hasPEPT,0|date|after:highSchools.*.dateFrom',

                        // Post Secondary
                        'hasPostSecondaryDiploma' => 'boolean',
                        'postSecondaryDiplomaFile' => $request->hasFile('postSecondaryDiplomaFile') ? 'file|mimes:pdf,jpg,jpeg,png|max:2048' : 'nullable',
                        'postSecondary' => 'present|array',
                        'postSecondary.*.program' => 'required_with:postSecondary|string',
                        'postSecondary.*.institution' => 'required_with:postSecondary|string',
                        'postSecondary.*.schoolYear' => 'required_with:postSecondary|string',

                        // Non-Formal Education
                        'nonFormalEducation' => 'present|array',
                        'nonFormalEducation.*.title' => 'required_with:nonFormalEducation|string',
                        'nonFormalEducation.*.organization' => 'required_with:nonFormalEducation|string',
                        'nonFormalEducation.*.date' => 'required_with:nonFormalEducation|date',
                        'nonFormalEducation.*.certificate' => 'required_with:nonFormalEducation|string',
                        'nonFormalEducation.*.participation' => 'required_with:nonFormalEducation|string',

                        // Certifications
                        'certifications' => 'present|array',
                        'certifications.*.title' => 'required_with:certifications|string',
                        'certifications.*.agency' => 'required_with:certifications|string',
                        'certifications.*.dateCertified' => 'required_with:certifications|date',
                        'certifications.*.rating' => 'required_with:certifications|string',
                    ]);

                    // Convert string boolean values to actual booleans
                    $validatedData['hasElementaryDiploma'] = filter_var($request->input('hasElementaryDiploma'), FILTER_VALIDATE_BOOLEAN);
                    $validatedData['hasPEPT'] = filter_var($request->input('hasPEPT'), FILTER_VALIDATE_BOOLEAN);
                    $validatedData['hasPostSecondaryDiploma'] = filter_var($request->input('hasPostSecondaryDiploma'), FILTER_VALIDATE_BOOLEAN);

                    // Handle file uploads with proper error handling
                    $files = [];
                    $fileFields = [
                        'elementaryDiplomaFile',
                        'postSecondaryDiplomaFile'
                    ];

                    foreach ($fileFields as $fileField) {
                        if ($request->hasFile($fileField)) {
                            try {
                                $file = $request->file($fileField);
                                $path = $file->store('diplomas', 'public');
                                $files[$fileField] = $path;
                            } catch (\Exception $e) {
                                \Log::error("Failed to upload {$fileField}: " . $e->getMessage());
                                throw new \Exception("Failed to upload {$fileField}");
                            }
                        }
                    }

                    // Delete existing education records for this applicant
                    Education::where('applicant_id', $request->applicant_id)->delete();

                    // Save Elementary
                    Education::create([
                        'applicant_id' => $request->applicant_id,
                        'type' => 'elementary',
                        'school_name' => $validatedData['elementarySchool'],
                        'address' => $validatedData['elementaryAddress'],
                        'date_from' => $validatedData['elementaryDateFrom'],
                        'date_to' => $validatedData['elementaryDateTo'],
                        'has_diploma' => $validatedData['hasElementaryDiploma'],
                        'diploma_file' => $files['elementaryDiplomaFile'] ?? null,
                    ]);

                    // Save High Schools
                    foreach ($validatedData['highSchools'] as $school) {
                        Education::create([
                            'applicant_id' => $request->applicant_id,
                            'type' => 'high_school',
                            'school_name' => $school['name'],
                            'address' => $school['address'],
                            'school_type' => $school['type'],
                            'date_from' => $school['dateFrom'],
                            'date_to' => $school['dateTo'],
                            'has_diploma' => true,
                            'diploma_file' => null,
                        ]);
                    }

                    // Save Post Secondary
                    if (!empty($validatedData['postSecondary'])) {
                        foreach ($validatedData['postSecondary'] as $postSecondary) {
                            Education::create([
                                'applicant_id' => $request->applicant_id,
                                'type' => 'post_secondary',
                                'program' => $postSecondary['program'],
                                'institution' => $postSecondary['institution'],
                                'school_year' => $postSecondary['schoolYear'],
                                'has_diploma' => $validatedData['hasPostSecondaryDiploma'],
                                'diploma_file' => $files['postSecondaryDiplomaFile'] ?? null,
                            ]);
                        }
                    }

                    // Save Non-Formal Education
                    if (!empty($validatedData['nonFormalEducation'])) {
                        foreach ($validatedData['nonFormalEducation'] as $nonFormal) {
                            Education::create([
                                'applicant_id' => $request->applicant_id,
                                'type' => 'non_formal',
                                'title' => $nonFormal['title'],
                                'organization' => $nonFormal['organization'],
                                'date_from' => $nonFormal['date'],
                                'certificate' => $nonFormal['certificate'],
                                'participation' => $nonFormal['participation'],
                            ]);
                        }
                    }

                    // Save Certifications
                    if (!empty($validatedData['certifications'])) {
                        foreach ($validatedData['certifications'] as $cert) {
                            Education::create([
                                'applicant_id' => $request->applicant_id,
                                'type' => 'certification',
                                'title' => $cert['title'],
                                'agency' => $cert['agency'],
                                'date_certified' => $cert['dateCertified'],
                                'rating' => $cert['rating'],
                            ]);
                        }
                    }

                    break;

                case 4: // Work Experience
                    $validatedData = $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        'workExperiences' => 'required|array|min:1',
                        'workExperiences.*.designation' => 'required|string|max:255',
                        'workExperiences.*.dateFrom' => 'required|date',
                        'workExperiences.*.dateTo' => 'required|date|after_or_equal:workExperiences.*.dateFrom',
                        'workExperiences.*.companyName' => 'required|string|max:255',
                        'workExperiences.*.companyAddress' => 'required|string',
                        'workExperiences.*.employmentStatus' => 'required|string|max:255',
                        'workExperiences.*.supervisorName' => 'required|string|max:255',
                        'workExperiences.*.reasonForLeaving' => 'required|string',
                        'workExperiences.*.responsibilities' => 'required|string',
                        'workExperiences.*.references' => 'required|array|size:3',
                        'workExperiences.*.references.*' => 'required|string|max:255',
                        'workExperiences.*.documents' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048'
                    ]);

                    // Delete existing records first
                    WorkExperience::where('applicant_id', $request->applicant_id)->delete();

                    // Create new records
                    foreach ($request->workExperiences as $index => $experience) {
                        // Handle document upload if present
                        $documentPath = null;
                        if (isset($experience['documents']) && $request->hasFile("workExperiences.{$index}.documents")) {
                            try {
                                $documentPath = $request->file("workExperiences.{$index}.documents")
                                    ->store('work-experiences', 'public');
                            } catch (\Exception $e) {
                                \Log::error("Failed to upload work experience document: " . $e->getMessage());
                                throw new \Exception("Failed to upload document for work experience " . ($index + 1));
                            }
                        }

                        WorkExperience::create([
                            'applicant_id' => $request->applicant_id,
                            'designation' => $experience['designation'],
                            'dateFrom' => $experience['dateFrom'],
                            'dateTo' => $experience['dateTo'],
                            'companyName' => $experience['companyName'],
                            'companyAddress' => $experience['companyAddress'],
                            'employmentStatus' => $experience['employmentStatus'],
                            'supervisorName' => $experience['supervisorName'],
                            'reasonForLeaving' => $experience['reasonForLeaving'],
                            'responsibilities' => $experience['responsibilities'],
                            'references' => $experience['references'],
                            'documents' => $documentPath
                        ]);
                    }
                    break;

                case 5: // Honors and Awards
                    $validatedData = $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        
                        // Academic Awards
                        'academicAwards' => 'present|array',
                        'academicAwards.*.title' => 'required|string',
                        'academicAwards.*.institution' => 'required|string',
                        'academicAwards.*.dateReceived' => 'required|date',
                        'academicAwards.*.description' => 'required|string',
                        'academicAwards.*.document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
                        
                        // Community Awards
                        'communityAwards' => 'present|array',
                        'communityAwards.*.title' => 'required|string',
                        'communityAwards.*.organization' => 'required|string',
                        'communityAwards.*.dateAwarded' => 'required|date',
                        
                        // Work Awards
                        'workAwards' => 'present|array',
                        'workAwards.*.title' => 'required|string',
                        'workAwards.*.organization' => 'required|string',
                        'workAwards.*.dateAwarded' => 'required|date'
                    ]);

                    // Handle Academic Awards
                    if ($request->has('academicAwards')) {
                        AcademicAward::where('applicant_id', $request->applicant_id)->delete();
                        
                        foreach ($request->academicAwards as $award) {
                            // Debug log
                            \Log::info('Creating academic award with data:', [
                                'award_data' => $award,
                                'applicant_id' => $request->applicant_id
                            ]);

                            try {
                                // Create award with explicit data array
                                $awardData = [
                                    'applicant_id' => $request->applicant_id,
                                    'title' => $award['title'],
                                    'institution' => $award['institution'],
                                    'dateReceived' => $award['dateReceived'],
                                    'description' => $award['description'],
                                ];

                                // Handle document if present
                                if (isset($award['document']) && $award['document'] instanceof \Illuminate\Http\UploadedFile) {
                                    $awardData['document'] = $award['document']->store('awards', 'public');
                                }

                                // Debug log the final data being sent to create
                                \Log::info('Final award data for creation:', $awardData);

                                $createdAward = AcademicAward::create($awardData);
                                
                                // Debug log success
                                \Log::info('Successfully created award:', ['award_id' => $createdAward->id]);

                            } catch (\Exception $e) {
                                // Debug log error
                                \Log::error('Failed to create academic award:', [
                                    'error' => $e->getMessage(),
                                    'data' => $awardData ?? null
                                ]);
                                throw $e;
                            }
                        }
                    }

                    // Handle Community Awards
                    if ($request->has('communityAwards')) {
                        CommunityAward::where('applicant_id', $request->applicant_id)->delete();
                        foreach ($request->communityAwards as $award) {
                            CommunityAward::create([
                                'applicant_id' => $request->applicant_id,
                                'title' => $award['title'],
                                'organization' => $award['organization'],
                                'dateAwarded' => $award['dateAwarded']
                            ]);
                        }
                    }

                    // Handle Work Awards
                    if ($request->has('workAwards')) {
                        WorkAward::where('applicant_id', $request->applicant_id)->delete();
                        foreach ($request->workAwards as $award) {
                            WorkAward::create([
                                'applicant_id' => $request->applicant_id,
                                'title' => $award['title'],
                                'organization' => $award['organization'],
                                'dateAwarded' => $award['dateAwarded']
                            ]);
                        }
                    }
                    break;

                case 6: // Creative Works
                    $validatedData = $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        'creativeWorks' => 'required|array|min:1',
                        'creativeWorks.*.title' => 'required|string|max:255',
                        'creativeWorks.*.description' => 'required|string',
                        'creativeWorks.*.significance' => 'required|string',
                        'creativeWorks.*.dateCompleted' => 'required|date',
                        'creativeWorks.*.corroboratingBody' => 'required|string|max:255',
                    ]);

                    try {
                        // Delete existing records first
                        CreativeWork::where('applicant_id', $request->applicant_id)->delete();

                        // Create new records
                        foreach ($validatedData['creativeWorks'] as $work) {
                            CreativeWork::create([
                                'applicant_id' => $validatedData['applicant_id'],
                                'title' => $work['title'],
                                'description' => $work['description'],
                                'significance' => $work['significance'],
                                'date_completed' => $work['dateCompleted'],
                                'corroborating_body' => $work['corroboratingBody']
                            ]);
                        }

                        // Debug logging
                        \Log::info('Creative works saved successfully', [
                            'applicant_id' => $request->applicant_id,
                            'count' => count($validatedData['creativeWorks'])
                        ]);

                    } catch (\Exception $e) {
                        \Log::error('Failed to save creative works', [
                            'error' => $e->getMessage(),
                            'applicant_id' => $request->applicant_id ?? null
                        ]);
                        throw $e;
                    }
                    break;

                case 7: // Lifelong Learning
                    $validatedData = $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        'hobbies' => 'present|array',
                        'hobbies.*.description' => 'required|string',
                        'specialSkills' => 'present|array',
                        'specialSkills.*.description' => 'required|string',
                        'workActivities' => 'present|array',
                        'workActivities.*.description' => 'required|string',
                        'volunteerActivities' => 'present|array',
                        'volunteerActivities.*.description' => 'required|string',
                        'travels' => 'present|array',
                        'travels.*.description' => 'required|string'
                    ]);

                    // Ensure at least one category has entries
                    if (empty($validatedData['hobbies']) &&
                        empty($validatedData['specialSkills']) &&
                        empty($validatedData['workActivities']) &&
                        empty($validatedData['volunteerActivities']) &&
                        empty($validatedData['travels'])) {
                        return response()->json([
                            'error' => 'At least one lifelong learning experience is required'
                        ], 422);
                    }

                    // Delete existing records first
                    LifelongLearning::where('applicant_id', $request->applicant_id)->delete();

                    // Helper function to save experiences
                    $saveExperiences = function($experiences, $type) use ($request) {
                        foreach ($experiences as $experience) {
                            LifelongLearning::create([
                                'applicant_id' => $request->applicant_id,
                                'type' => $type,
                                'description' => $experience['description']
                            ]);
                        }
                    };

                    // Save all categories
                    if (!empty($validatedData['hobbies'])) {
                        $saveExperiences($validatedData['hobbies'], 'hobby');
                    }
                    if (!empty($validatedData['specialSkills'])) {
                        $saveExperiences($validatedData['specialSkills'], 'skill');
                    }
                    if (!empty($validatedData['workActivities'])) {
                        $saveExperiences($validatedData['workActivities'], 'work');
                    }
                    if (!empty($validatedData['volunteerActivities'])) {
                        $saveExperiences($validatedData['volunteerActivities'], 'volunteer');
                    }
                    if (!empty($validatedData['travels'])) {
                        $saveExperiences($validatedData['travels'], 'travel');
                    }
                    break;

                case 8: // Essay
                    $validatedData = $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        'essay' => 'required|string|min:500'
                    ]);

                    // Update or create essay
                    Essay::updateOrCreate(
                        ['applicant_id' => $request->applicant_id],
                        ['content' => $validatedData['essay']]
                    );
                    break;
            }

            DB::commit();
            return response()->json([
                'message' => 'Step saved successfully',
                'data' => $response ?? null
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            // Handle validation errors specifically
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'error' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }

            // Log the error for debugging
            \Log::error('Application save failed: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());

            return response()->json([
                'error' => 'Failed to save step',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function finalizeApplication(Request $request)
    {
        try {
            $personalInfo = PersonalInfo::with([
                'learningObjective',
                'education',
                'workExperiences',
                'creativeWorks',
                'lifelongLearning',
                'essay'
            ])->where('applicant_id', $request->applicant_id)
              ->firstOrFail();

            // Verify all required sections are completed
            if (!$personalInfo->learningObjective) {
                throw new \Exception('Learning objectives section is incomplete');
            }
            if (!$personalInfo->education()->where('type', 'elementary')->exists()) {
                throw new \Exception('Education section is incomplete - Elementary education required');
            }
            if (!$personalInfo->workExperiences()->exists()) {
                throw new \Exception('Work experience section is incomplete');
            }
            if (!$personalInfo->creativeWorks()->exists()) {
                throw new \Exception('Creative works section is incomplete');
            }
            if (!$personalInfo->lifelongLearning()->exists()) {
                throw new \Exception('Lifelong learning section is incomplete');
            }
            if (!$personalInfo->essay) {
                throw new \Exception('Essay section is incomplete');
            }

            // Update application status to pending
            $personalInfo->update(['status' => 'pending']);
            $admins = User::all();
            Notification::send($admins, new NewApplicationSubmitted($personalInfo));

            return response()->json([
                'message' => 'Application submitted successfully',
                'status' => 'pending'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to submit application',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function loadApplication($applicantId)
    {
        try {
            $personalInfo = PersonalInfo::with([
                'learningObjective',
                'education', // Just load all education records - they're differentiated by 'type'
                'academicAwards',
                'communityAwards',
                'workAwards'
            ])->where('applicant_id', $applicantId)
              ->firstOrFail();

            return response()->json([
                'data' => $personalInfo
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to load application',
                'message' => $e->getMessage()
            ], 404);
        }
    }

    public function trackApplication(Request $request)
    {
        try {
            $request->validate([
                'applicant_id' => 'required|string|exists:personal_infos,applicant_id'
            ]);

            $application = PersonalInfo::with([
                    'learningObjective',
                    'education',
                    'workExperiences',
                    'academicAwards',
                    'communityAwards',
                    'workAwards',
                    'creativeWorks',
                    'lifelongLearning',
                    'essay'
                ])
                ->where('applicant_id', $request->applicant_id)
                ->firstOrFail();

            return response()->json([
                'status' => 'success',
                'application' => [
                    'id' => $application->applicant_id,
                    'status' => $application->status,
                    'submitted_at' => $application->created_at->format('M d, Y h:i A'),
                    'personal_info' => $application,
                    'education' => $application->education,
                    'work_experience' => $application->workExperiences,
                    // Add other relationships as needed
                ]
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Application ID'
            ], 422);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Application not found'
            ], 404);

        } catch (\Exception $e) {
            \Log::error('Tracking error: '.$e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve application status'
            ], 500);
        }
    }
}
