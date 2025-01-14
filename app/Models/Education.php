<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'applicant_id',
        'type', // 'elementary', 'high_school', 'post_secondary', 'non_formal', 'certification'
        
        // Elementary & Common Fields
        'school_name',
        'address',
        'date_from',
        'date_to',
        'has_diploma',
        'diploma_file',
        
        // High School Specific
        'school_type', // For high school types
        
        // PEPT Specific
        'pept_year',
        'pept_grade',
        
        // Post Secondary Specific
        'program',
        'institution',
        'school_year',
        
        // Non-Formal Specific
        'title',
        'organization',
        'certificate',
        'participation',
        
        // Certification Specific
        'agency',
        'date_certified',
        'rating'
    ];

    public function applicant()
    {
        return $this->belongsTo(PersonalInfo::class, 'applicant_id', 'applicant_id');
    }
} 