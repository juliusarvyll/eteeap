<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use App\Models\PersonalInfo;

class NewApplicationSubmitted extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public PersonalInfo $application)
    {
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'New application submitted',
            'applicant_id' => $this->application->applicant_id,
            'applicant_name' => $this->application->fullName,
        ];
    }
}
