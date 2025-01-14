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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
                        'suffix' => 'nullable|string|max:255',
                        'birthDate' => 'required|date',
                        'placeOfBirth' => 'required|string|max:255',
                        'civilStatus' => 'required|string|in:Single,Married,Separated,Widow,Divorced',
                        'document' => $request->hasFile('document') ? 'required|file|mimes:pdf,jpg,jpeg,png|max:2048' : 'nullable',
                        'sex' => 'required|string|in:Male,Female',
                        'religion' => 'nullable|string|max:255',
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
                        'hasElementaryDiploma' => 'required|boolean',
                        'elementaryDiplomaFile' => $request->hasFile('elementaryDiplomaFile') ? 'required|file|mimes:pdf,jpg,jpeg,png|max:2048' : 'nullable',
                        
                        // High School
                        'hasHighSchoolDiploma' => 'required|boolean',
                        'highSchoolDiplomaFile' => $request->hasFile('highSchoolDiplomaFile') ? 'required|file|mimes:pdf,jpg,jpeg,png|max:2048' : 'nullable',
                        'highSchools' => 'required|array|min:1',
                        'highSchools.*.name' => 'required|string',
                        'highSchools.*.address' => 'required|string',
                        'highSchools.*.type' => 'required|string',
                        'highSchools.*.dateFrom' => 'required|date',
                        'highSchools.*.dateTo' => 'required|date|after:highSchools.*.dateFrom',
                        
                        // PEPT
                        'hasPEPT' => 'required|boolean',
                        'peptYear' => 'required_if:hasPEPT,true|nullable|integer',
                        'peptGrade' => 'required_if:hasPEPT,true|nullable|string',
                        
                        // Post Secondary
                        'hasPostSecondaryDiploma' => 'required|boolean',
                        'postSecondaryDiplomaFile' => $request->hasFile('postSecondaryDiplomaFile') ? 'required|file|mimes:pdf,jpg,jpeg,png|max:2048' : 'nullable',
                        'postSecondary' => 'array',
                        'postSecondary.*.program' => 'required|string',
                        'postSecondary.*.institution' => 'required|string',
                        'postSecondary.*.schoolYear' => 'required|string',
                        
                        // Non-Formal Education
                        'nonFormalEducation' => 'array',
                        'nonFormalEducation.*.title' => 'required|string',
                        'nonFormalEducation.*.organization' => 'required|string',
                        'nonFormalEducation.*.date' => 'required|date',
                        'nonFormalEducation.*.certificate' => 'required|string',
                        'nonFormalEducation.*.participation' => 'required|string',
                        
                        // Certifications
                        'certifications' => 'array',
                        'certifications.*.title' => 'required|string',
                        'certifications.*.agency' => 'required|string',
                        'certifications.*.dateCertified' => 'required|date',
                        'certifications.*.rating' => 'required|string',
                    ]);

                    // Handle file uploads
                    $files = [];
                    foreach (['elementaryDiplomaFile', 'highSchoolDiplomaFile', 'postSecondaryDiplomaFile'] as $fileField) {
                        if ($request->hasFile($fileField)) {
                            $files[$fileField] = $request->file($fileField)->store('diplomas', 'public');
                        }
                    }

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
                            'has_diploma' => $validatedData['hasHighSchoolDiploma'],
                            'diploma_file' => $files['highSchoolDiplomaFile'] ?? null,
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
                    ]);

                    // Delete existing records first
                    WorkExperience::where('applicant_id', $request->applicant_id)->delete();

                    // Create new records
                    foreach ($validatedData['workExperiences'] as $experience) {
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
                            'references' => $experience['references']
                        ]);
                    }
                    break;

                case 5: // Honors and Awards
                    $request->validate([
                        'applicant_id' => 'required|exists:personal_infos,applicant_id',
                        'academicAwards' => 'present|array',
                        'academicAwards.*.title' => 'required|string',
                        'academicAwards.*.organization' => 'required|string',
                        'academicAwards.*.dateAwarded' => 'required|date',
                        'communityAwards' => 'present|array',
                        'communityAwards.*.title' => 'required|string',
                        'communityAwards.*.organization' => 'required|string',
                        'communityAwards.*.dateAwarded' => 'required|date',
                        'workAwards' => 'present|array',
                        'workAwards.*.title' => 'required|string',
                        'workAwards.*.organization' => 'required|string',
                        'workAwards.*.dateAwarded' => 'required|date'
                    ]);

                    if ($request->has('academicAwards')) {
                        AcademicAward::where('applicant_id', $request->applicant_id)->delete();
                        foreach ($request->academicAwards as $award) {
                            AcademicAward::create([
                                'applicant_id' => $request->applicant_id,
                                ...$award
                            ]);
                        }
                    }

                    if ($request->has('communityAwards')) {
                        CommunityAward::where('applicant_id', $request->applicant_id)->delete();
                        foreach ($request->communityAwards as $award) {
                            CommunityAward::create([
                                'applicant_id' => $request->applicant_id,
                                ...$award
                            ]);
                        }
                    }

                    if ($request->has('workAwards')) {
                        WorkAward::where('applicant_id', $request->applicant_id)->delete();
                        foreach ($request->workAwards as $award) {
                            WorkAward::create([
                                'applicant_id' => $request->applicant_id,
                                ...$award
                            ]);
                        }
                    }
                    break;
            }

            DB::commit();
            return response()->json([
                'message' => 'Step saved successfully',
                'data' => $response ?? null
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to save step',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function finalizeApplication(Request $request)
    {
        try {
            $personalInfo = PersonalInfo::where('applicant_id', $request->applicant_id)
                ->firstOrFail();

            // Verify all required sections are completed
            if (!$personalInfo->learningObjective) {
                throw new \Exception('Learning objectives section is incomplete');
            }

            // Update application status
            $personalInfo->update(['status' => 'submitted']);

            return response()->json(['message' => 'Application submitted successfully']);

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
} 