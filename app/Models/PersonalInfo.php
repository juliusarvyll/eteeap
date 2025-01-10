<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PersonalInfo extends Model
{
    protected $fillable = [
        'applicant_id',
        'firstName',
        'middleName',
        'lastName',
        'suffix',
        'birthDate',
        'placeOfBirth',
        'civilStatus',
        'document',
        'sex',
        'religion',
        'languages'
    ];

    public function learningObjective(): HasOne
    {
        return $this->hasOne(LearningObjective::class, 'applicant_id', 'applicant_id');
    }

    public function workExperiences(): HasMany
    {
        return $this->hasMany(WorkExperience::class, 'applicant_id', 'applicant_id');
    }

    public function academicAwards(): HasMany
    {
        return $this->hasMany(AcademicAward::class, 'applicant_id', 'applicant_id');
    }

    public function communityAwards(): HasMany
    {
        return $this->hasMany(CommunityAward::class, 'applicant_id', 'applicant_id');
    }

    public function workAwards(): HasMany
    {
        return $this->hasMany(WorkAward::class, 'applicant_id', 'applicant_id');
    }
} 