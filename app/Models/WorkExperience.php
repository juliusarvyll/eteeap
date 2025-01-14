<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkExperience extends Model
{
    protected $fillable = [
        'applicant_id',
        'designation',
        'dateFrom',
        'dateTo',
        'companyName',
        'companyAddress',
        'employmentStatus',
        'supervisorName',
        'reasonForLeaving',
        'responsibilities',
        'references'
    ];

    protected $casts = [
        'references' => 'array',
        'dateFrom' => 'date',
        'dateTo' => 'date'
    ];

    public function personalInfo(): BelongsTo
    {
        return $this->belongsTo(PersonalInfo::class, 'applicant_id', 'applicant_id');
    }
} 