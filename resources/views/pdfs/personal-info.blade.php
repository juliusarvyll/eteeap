<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Applicant Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
        }
        .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        .section-title {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 10px;
            background: #f3f4f6;
            padding: 8px;
            border-radius: 4px;
        }
        .field {
            margin-bottom: 8px;
            display: block;
        }
        .label {
            font-weight: bold;
            color: #374151;
        }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
        }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        .badge-primary { background: #e0e7ff; color: #3730a3; }
        .badge-gray { background: #f3f4f6; color: #374151; }
        
        .grid {
            display: block;
            margin-bottom: 10px;
        }
        .grid:after {
            content: "";
            display: table;
            clear: both;
        }
        .col-6 {
            float: left;
            width: 48%;
            margin-right: 2%;
        }
        .markdown {
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center; margin-bottom: 30px;">Applicant Information</h1>
    
    <div class="section">
        <div class="section-title">Personal Information</div>
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">Name:</span> 
                    {{ $record->firstName }} {{ $record->middleName }} {{ $record->lastName }} {{ $record->suffix }}
                </div>
                <div class="field">
                    <span class="label">Birth Date:</span> 
                    {{ \Carbon\Carbon::parse($record->birthDate)->format('F d, Y') }}
                </div>
                <div class="field">
                    <span class="label">Place of Birth:</span> 
                    {{ $record->placeOfBirth }}
                </div>
                <div class="field">
                    <span class="label">Civil Status:</span> 
                    <span class="badge badge-info">{{ ucfirst($record->civilStatus) }}</span>
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">Sex:</span> 
                    <span class="badge badge-primary">{{ ucfirst($record->sex) }}</span>
                </div>
                <div class="field">
                    <span class="label">Religion:</span> 
                    {{ $record->religion }}
                </div>
                <div class="field">
                    <span class="label">Languages:</span> 
                    {{ $record->languages }}
                </div>
                <div class="field">
                    <span class="label">Status:</span> 
                    <span class="badge badge-{{ $record->status === 'approved' ? 'success' : ($record->status === 'pending' ? 'warning' : 'danger') }}">
                        {{ ucfirst($record->status) }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    @if($record->learningObjective)
    <div class="section">
        <div class="section-title">Learning Objectives</div>
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">First Priority:</span> 
                    {{ $record->learningObjective->firstPriority }}
                </div>
                <div class="field">
                    <span class="label">Second Priority:</span> 
                    {{ $record->learningObjective->secondPriority }}
                </div>
                <div class="field">
                    <span class="label">Third Priority:</span> 
                    {{ $record->learningObjective->thirdPriority }}
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">Time Commitment:</span> 
                    {{ $record->learningObjective->timeCommitment }}
                </div>
                <div class="field">
                    <span class="label">Overseas Plan:</span> 
                    {{ $record->learningObjective->overseasPlan }}
                </div>
                <div class="field">
                    <span class="label">Completion Timeline:</span> 
                    {{ $record->learningObjective->completionTimeline }}
                </div>
            </div>
        </div>
        <div class="field">
            <span class="label">Goal Statement:</span><br>
            <div class="markdown">{{ $record->learningObjective->goalStatement }}</div>
        </div>
    </div>
    @endif

    @if($record->elementaryEducation->first())
    <div class="section">
        <div class="section-title">Education</div>
        <div class="field">
            <span class="label">Elementary School:</span> 
            {{ $record->elementaryEducation->first()->school_name }}
        </div>
        <div class="field">
            <span class="label">Address:</span> 
            {{ $record->elementaryEducation->first()->address }}
        </div>
        <div class="field">
            <span class="label">Period:</span> 
            {{ \Carbon\Carbon::parse($record->elementaryEducation->first()->date_from)->format('Y') }} - 
            {{ \Carbon\Carbon::parse($record->elementaryEducation->first()->date_to)->format('Y') }}
        </div>
    </div>
    @endif

    @if($record->highSchoolEducation->count() > 0)
    <div class="section">
        <div class="section-title">High School Education</div>
        @foreach($record->highSchoolEducation as $education)
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">School Name:</span> 
                    {{ $education->school_name }}
                </div>
                <div class="field">
                    <span class="label">Address:</span> 
                    {{ $education->address }}
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">School Type:</span> 
                    {{ $education->school_type }}
                </div>
                <div class="field">
                    <span class="label">Period:</span> 
                    {{ \Carbon\Carbon::parse($education->date_from)->format('Y') }} - 
                    {{ \Carbon\Carbon::parse($education->date_to)->format('Y') }}
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @endif

    @if($record->postSecondaryEducation && count($record->postSecondaryEducation))
    <div class="section">
        <div class="section-title">Post Secondary Education</div>
        @foreach($record->postSecondaryEducation as $postSecondary)
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">Program:</span>
                    {{ $postSecondary['program'] ?? '' }}
                </div>
                <div class="field">
                    <span class="label">Institution:</span>
                    {{ $postSecondary['institution'] ?? '' }}
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">School Year:</span>
                    {{ $postSecondary['school_year'] ?? '' }}
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @endif

    @if($record->nonFormalEducation && count($record->nonFormalEducation))
    <div class="section">
        <div class="section-title">Non-Formal Education</div>
        @foreach($record->nonFormalEducation as $nonFormal)
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">Title:</span>
                    {{ $nonFormal['title'] ?? '' }}
                </div>
                <div class="field">
                    <span class="label">Organization:</span>
                    {{ $nonFormal['organization'] ?? '' }}
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">Date:</span>
                    {{ $nonFormal['date_from'] ?? '' }}
                </div>
                <div class="field">
                    <span class="label">Certificate:</span>
                    {{ $nonFormal['certificate'] ?? '' }}
                </div>
            </div>
        </div>
        <div class="field">
            <span class="label">Participation:</span>
            {{ $nonFormal['participation'] ?? '' }}
        </div>
        @endforeach
    </div>
    @endif

    @if($record->certifications && count($record->certifications))
    <div class="section">
        <div class="section-title">Certifications</div>
        @foreach($record->certifications as $certification)
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">Title:</span>
                    {{ $certification['title'] ?? '' }}
                </div>
                <div class="field">
                    <span class="label">Agency:</span>
                    {{ $certification['agency'] ?? '' }}
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">Date Certified:</span>
                    {{ $certification['date_certified'] ?? '' }}
                </div>
                <div class="field">
                    <span class="label">Rating:</span>
                    {{ $certification['rating'] ?? '' }}
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @endif

    @if($record->workExperiences->count() > 0)
    <div class="section">
        <div class="section-title">Work Experience</div>
        @foreach($record->workExperiences as $experience)
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">Designation:</span> 
                    {{ $experience->designation }}
                </div>
                <div class="field">
                    <span class="label">Company:</span> 
                    {{ $experience->companyName }}
                </div>
                <div class="field">
                    <span class="label">Period:</span> 
                    {{ \Carbon\Carbon::parse($experience->dateFrom)->format('M Y') }} - 
                    {{ \Carbon\Carbon::parse($experience->dateTo)->format('M Y') }}
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">Status:</span> 
                    {{ $experience->employmentStatus }}
                </div>
                <div class="field">
                    <span class="label">Supervisor:</span> 
                    {{ $experience->supervisorName }}
                </div>
            </div>
        </div>
        <div class="field">
            <span class="label">Responsibilities:</span><br>
            <div class="markdown">{{ $experience->responsibilities }}</div>
        </div>
        @endforeach
    </div>
    @endif

    @if($record->academicAwards || $record->communityAwards || $record->workAwards)
    <div class="section">
        <div class="section-title">Awards and Recognition</div>

        @if($record->academicAwards && count($record->academicAwards))
        <div class="section">
            <div class="section-title">Academic Awards</div>
            @foreach($record->academicAwards as $award)
            <div class="grid">
                <div class="col-6">
                    <div class="field">
                        <span class="label">Title:</span>
                        {{ $award->title }}
                    </div>
                    <div class="field">
                        <span class="label">Organization:</span>
                        {{ $award->organization }}
                    </div>
                </div>
                <div class="col-6">
                    <div class="field">
                        <span class="label">Date Awarded:</span>
                        {{ $award->dateAwarded }}
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        @endif

        @if($record->communityAwards && count($record->communityAwards))
        <div class="section">
            <div class="section-title">Community Awards</div>
            @foreach($record->communityAwards as $award)
            <div class="grid">
                <div class="col-6">
                    <div class="field">
                        <span class="label">Title:</span>
                        {{ $award->title }}
                    </div>
                    <div class="field">
                        <span class="label">Organization:</span>
                        {{ $award->organization }}
                    </div>
                </div>
                <div class="col-6">
                    <div class="field">
                        <span class="label">Date Awarded:</span>
                        {{ $award->dateAwarded }}
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        @endif

        @if($record->workAwards && count($record->workAwards))
        <div class="section">
            <div class="section-title">Work Awards</div>
            @foreach($record->workAwards as $award)
            <div class="grid">
                <div class="col-6">
                    <div class="field">
                        <span class="label">Title:</span>
                        {{ $award->title }}
                    </div>
                    <div class="field">
                        <span class="label">Organization:</span>
                        {{ $award->organization }}
                    </div>
                </div>
                <div class="col-6">
                    <div class="field">
                        <span class="label">Date Awarded:</span>
                        {{ $award->dateAwarded }}
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        @endif
    </div>
    @endif

    @if($record->creativeWorks && count($record->creativeWorks))
    <div class="section">
        <div class="section-title">Creative Works</div>
        @foreach($record->creativeWorks as $work)
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">Title:</span>
                    {{ $work->title }}
                </div>
                <div class="field">
                    <span class="label">Description:</span>
                    {{ $work->description }}
                </div>
            </div>
            <div class="col-6">
                <div class="field">
                    <span class="label">Significance:</span>
                    {{ $work->significance }}
                </div>
                <div class="field">
                    <span class="label">Date Completed:</span>
                    {{ $work->date_completed }}
                </div>
            </div>
        </div>
        <div class="field">
            <span class="label">Corroborating Body:</span>
            {{ $work->corroborating_body }}
        </div>
        @endforeach
    </div>
    @endif

    @if($record->lifelongLearning && count($record->lifelongLearning))
    <div class="section">
        <div class="section-title">Lifelong Learning</div>
        @foreach($record->lifelongLearning as $learning)
        <div class="grid">
            <div class="col-6">
                <div class="field">
                    <span class="label">Type:</span>
                    {{ ucfirst($learning->type) }}
                </div>
                <div class="field">
                    <span class="label">Description:</span>
                    {{ $learning->description }}
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @endif

    @if($record->essay)
    <div class="section">
        <div class="section-title">Essay</div>
        <div class="markdown">{{ $record->essay->content }}</div>
    </div>
    @endif

    <div class="section">
        <div class="section-title">Uploaded Documents</div>
        
        @if($record->document)
            <div class="subsection">
                <div class="field">
                    <iframe 
                        src="{{ Storage::url($record->document) }}"
                        width="100%"
                        height="600px"
                        frameborder="0"
                    ></iframe>
                </div>
            </div>
        @endif
    </div>
</body>
</html>
