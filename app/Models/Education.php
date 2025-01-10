<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'applicant_id',
        // Elementary
        'elementary_school',
        'elementary_address',
        'elementary_date_from',
        'elementary_date_to',
        'has_elementary_diploma',
        'elementary_diploma_file',
        // High School
        'has_high_school_diploma',
        'high_school_diploma_file',
        // PEPT
        'has_pept',
        'pept_year',
        'pept_grade',
        // Post Secondary
        'has_post_secondary_diploma',
        'post_secondary_diploma_file',
    ];

    public function applicant()
    {
        return $this->belongsTo(PersonalInfo::class, 'applicant_id', 'applicant_id');
    }

    public function highSchools()
    {
        return $this->hasMany(HighSchool::class, 'education_id');
    }

    public function postSecondaryEducation()
    {
        return $this->hasMany(PostSecondaryEducation::class, 'education_id');
    }

    public function nonFormalEducation()
    {
        return $this->hasMany(NonFormalEducation::class, 'education_id');
    }

    public function certifications()
    {
        return $this->hasMany(Certification::class, 'education_id');
    }
} 