<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Applicant Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            background: #f3f4f6;
            padding: 5px;
        }
        .field {
            margin-bottom: 5px;
        }
        .label {
            font-weight: bold;
        }
        .subsection {
            margin-left: 20px;
            margin-bottom: 15px;
            border-left: 2px solid #e5e7eb;
            padding-left: 10px;
        }
    </style>
</head>
<body>
    <h1>Applicant Information</h1>

    <div class="section">
        <div class="section-title">Personal Information</div>
        <div class="field">
            <span class="label">Name:</span>
            {{ $record->firstName }} {{ $record->middleName }} {{ $record->lastName }} {{ $record->suffix }}
        </div>
        <div class="field">
            <span class="label">Birth Date:</span>
            {{ $record->birthDate }}
        </div>
        <div class="field">
            <span class="label">Place of Birth:</span>
            {{ $record->placeOfBirth }}
        </div>
        <div class="field">
            <span class="label">Civil Status:</span>
            {{ ucfirst($record->civilStatus) }}
        </div>
        <div class="field">
            <span class="label">Sex:</span>
            {{ ucfirst($record->sex) }}
        </div>
        <div class="field">
            <span class="label">Religion:</span>
            {{ $record->religion }}
        </div>
        <div class="field">
            <span class="label">Languages:</span>
            {{ is_array($record->languages) ? implode(', ', $record->languages) : $record->languages }}
        </div>
        <div class="field">
            <span class="label">Application Status:</span>
            {{ ucfirst($record->status) }}
        </div>
        @if($record->document)
        <div class="field">
            <span class="label">Supporting Document:</span>
            {{ Storage::url($record->document) }}
        </div>
        @endif
    </div>

    @if($record->learningObjective)
    <div class="section">
        <div class="section-title">Learning Objectives</div>
        <div class="field">
            <span class="label">First Priority:</span>
            {{ is_array($record->learningObjective->firstPriority) ? implode(', ', $record->learningObjective->firstPriority) : $record->learningObjective->firstPriority }}
        </div>
        <div class="field">
            <span class="label">Second Priority:</span>
            {{ is_array($record->learningObjective->secondPriority) ? implode(', ', $record->learningObjective->secondPriority) : $record->learningObjective->secondPriority }}
        </div>
        <div class="field">
            <span class="label">Third Priority:</span>
            {{ is_array($record->learningObjective->thirdPriority) ? implode(', ', $record->learningObjective->thirdPriority) : $record->learningObjective->thirdPriority }}
        </div>
        <div class="field">
            <span class="label">Goal Statement:</span>
            {{ is_array($record->learningObjective->goalStatement) ? implode(', ', $record->learningObjective->goalStatement) : $record->learningObjective->goalStatement }}
        </div>
        <div class="field">
            <span class="label">Time Commitment:</span>
            {{ is_array($record->learningObjective->timeCommitment) ? implode(', ', $record->learningObjective->timeCommitment) : $record->learningObjective->timeCommitment }}
        </div>
        <div class="field">
            <span class="label">Overseas Plan:</span>
            {{ is_array($record->learningObjective->overseasPlan) ? implode(', ', $record->learningObjective->overseasPlan) : $record->learningObjective->overseasPlan }}
        </div>
        <div class="field">
            <span class="label">Cost Payment:</span>
            {{ is_array($record->learningObjective->costPayment) ? implode(', ', $record->learningObjective->costPayment) : $record->learningObjective->costPayment }}
        </div>
        <div class="field">
            <span class="label">Completion Timeline:</span>
            {{ is_array($record->learningObjective->completionTimeline) ? implode(', ', $record->learningObjective->completionTimeline) : $record->learningObjective->completionTimeline }}
        </div>
    </div>
    @endif

    <div class="section">
        <div class="section-title">Education</div>

        @if($record->elementaryEducation)
        <div class="subsection">
            <div class="field">
                <span class="label">Elementary School:</span>
                {{ $record->elementaryEducation['school_name'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Address:</span>
                {{ $record->elementaryEducation['address'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Period:</span>
                {{ $record->elementaryEducation['date_from'] ?? '' }} - {{ $record->elementaryEducation['date_to'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Has Diploma:</span>
                {{ isset($record->elementaryEducation['has_diploma']) && $record->elementaryEducation['has_diploma'] ? 'Yes' : 'No' }}
            </div>
            @if($record->elementaryEducation['diploma_file'])
            <div class="field">
                <span class="label">Elementary Diploma:</span>
                {{ Storage::url($record->elementaryEducation['diploma_file']) }}
            </div>
            @endif
        </div>
        @endif

        @if($record->highSchoolEducation && count($record->highSchoolEducation))
        <div class="subsection">
            <div class="field"><span class="label">High School Education</span></div>
            @foreach($record->highSchoolEducation as $highSchool)
            <div class="field">
                <span class="label">School Name:</span>
                {{ $highSchool['school_name'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Address:</span>
                {{ $highSchool['address'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">School Type:</span>
                {{ $highSchool['school_type'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Period:</span>
                {{ $highSchool['date_from'] ?? '' }} - {{ $highSchool['date_to'] ?? '' }}
            </div>
            @if($highSchool['diploma_file'])
            <div class="field">
                <span class="label">High School Diploma:</span>
                {{ Storage::url($highSchool['diploma_file']) }}
            </div>
            @endif
            @endforeach
        </div>
        @endif

        @if($record->postSecondaryEducation && count($record->postSecondaryEducation))
        <div class="subsection">
            <div class="field"><span class="label">Post Secondary Education</span></div>
            @foreach($record->postSecondaryEducation as $postSecondary)
            <div class="field">
                <span class="label">Program:</span>
                {{ $postSecondary['program'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Institution:</span>
                {{ $postSecondary['institution'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">School Year:</span>
                {{ $postSecondary['school_year'] ?? '' }}
            </div>
            @if($postSecondary['diploma_file'])
            <div class="field">
                <span class="label">Post Secondary Diploma:</span>
                {{ Storage::url($postSecondary['diploma_file']) }}
            </div>
            @endif
            @endforeach
        </div>
        @endif

        @if($record->nonFormalEducation && count($record->nonFormalEducation))
        <div class="subsection">
            <div class="field"><span class="label">Non-Formal Education</span></div>
            @foreach($record->nonFormalEducation as $nonFormal)
            <div class="field">
                <span class="label">Title:</span>
                {{ $nonFormal['title'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Organization:</span>
                {{ $nonFormal['organization'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Date:</span>
                {{ $nonFormal['date_from'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Certificate:</span>
                {{ $nonFormal['certificate'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Participation:</span>
                {{ $nonFormal['participation'] ?? '' }}
            </div>
            @endforeach
        </div>
        @endif

        @if($record->certifications && count($record->certifications))
        <div class="subsection">
            <div class="field"><span class="label">Certifications</span></div>
            @foreach($record->certifications as $certification)
            <div class="field">
                <span class="label">Title:</span>
                {{ $certification['title'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Agency:</span>
                {{ $certification['agency'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Date Certified:</span>
                {{ $certification['date_certified'] ?? '' }}
            </div>
            <div class="field">
                <span class="label">Rating:</span>
                {{ $certification['rating'] ?? '' }}
            </div>
            @endforeach
        </div>
        @endif
    </div>

    @if($record->workExperiences && count($record->workExperiences))
    <div class="section">
        <div class="section-title">Work Experience</div>
        @foreach($record->workExperiences as $work)
        <div class="subsection">
            <div class="field">
                <span class="label">Position:</span>
                {{ $work->designation }} at {{ $work->companyName }}
            </div>
            <div class="field">
                <span class="label">Company Address:</span>
                {{ $work->companyAddress }}
            </div>
            <div class="field">
                <span class="label">Period:</span>
                {{ $work->dateFrom }} - {{ $work->dateTo }}
            </div>
            <div class="field">
                <span class="label">Employment Status:</span>
                {{ $work->employmentStatus }}
            </div>
            <div class="field">
                <span class="label">Supervisor:</span>
                {{ $work->supervisorName }}
            </div>
            <div class="field">
                <span class="label">Reason for Leaving:</span>
                {{ $work->reasonForLeaving }}
            </div>
            <div class="field">
                <span class="label">Responsibilities:</span>
                {{ is_array($work->responsibilities) ? implode(', ', $work->responsibilities) : $work->responsibilities }}
            </div>
            <div class="field">
                <span class="label">References:</span>
                {{ is_array($work->references) ? implode(', ', $work->references) : $work->references }}
            </div>
        </div>
        @endforeach
    </div>
    @endif

    @if($record->academicAwards || $record->communityAwards || $record->workAwards)
    <div class="section">
        <div class="section-title">Awards and Recognition</div>

        @if($record->academicAwards && count($record->academicAwards))
        <div class="subsection">
            <div class="field"><span class="label">Academic Awards</span></div>
            @foreach($record->academicAwards as $award)
            <div class="field">
                <span class="label">Title:</span>
                {{ $award->title }}
            </div>
            <div class="field">
                <span class="label">Organization:</span>
                {{ $award->organization }}
            </div>
            <div class="field">
                <span class="label">Date Awarded:</span>
                {{ $award->dateAwarded }}
            </div>
            @endforeach
        </div>
        @endif

        @if($record->communityAwards && count($record->communityAwards))
        <div class="subsection">
            <div class="field"><span class="label">Community Awards</span></div>
            @foreach($record->communityAwards as $award)
            <div class="field">
                <span class="label">Title:</span>
                {{ $award->title }}
            </div>
            <div class="field">
                <span class="label">Organization:</span>
                {{ $award->organization }}
            </div>
            <div class="field">
                <span class="label">Date Awarded:</span>
                {{ $award->dateAwarded }}
            </div>
            @endforeach
        </div>
        @endif

        @if($record->workAwards && count($record->workAwards))
        <div class="subsection">
            <div class="field"><span class="label">Work Awards</span></div>
            @foreach($record->workAwards as $award)
            <div class="field">
                <span class="label">Title:</span>
                {{ $award->title }}
            </div>
            <div class="field">
                <span class="label">Organization:</span>
                {{ $award->organization }}
            </div>
            <div class="field">
                <span class="label">Date Awarded:</span>
                {{ $award->dateAwarded }}
            </div>
            @endforeach
        </div>
        @endif
    </div>
    @endif
</body>
</html>
