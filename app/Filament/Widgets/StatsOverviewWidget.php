<?php

namespace App\Filament\Widgets;

use App\Models\PersonalInfo;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Applicants', PersonalInfo::count())
                ->description('All registered applicants')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'),

            Stat::make('Pending Applications', PersonalInfo::where('status', 'pending')->count())
                ->description('Awaiting review')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),

            Stat::make('Completed Profiles', $this->getCompletedProfilesCount())
                ->description('With complete documentation')
                ->descriptionIcon('heroicon-m-document-check')
                ->color('success'),

            Stat::make('Total Work Experiences', $this->getTotalWorkExperiencesCount())
                ->description('Registered work experiences')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('info'),

            Stat::make('Total Awards', $this->getTotalAwardsCount())
                ->description('Combined awards count')
                ->descriptionIcon('heroicon-m-trophy')
                ->color('success'),

            Stat::make('Creative Works', PersonalInfo::has('creativeWorks')->count())
                ->description('Applicants with creative works')
                ->descriptionIcon('heroicon-m-paint-brush')
                ->color('primary'),
        ];
    }

    private function getCompletedProfilesCount(): int
    {
        return PersonalInfo::whereNotNull('document')
            ->whereNotNull('email')
            ->whereNotNull('phoneNumber')
            ->count();
    }

    private function getTotalWorkExperiencesCount(): int
    {
        return PersonalInfo::withCount('workExperiences')
            ->get()
            ->sum('work_experiences_count');
    }

    private function getTotalAwardsCount(): int
    {
        $academicAwards = PersonalInfo::withCount('academicAwards')->get()->sum('academic_awards_count');
        $communityAwards = PersonalInfo::withCount('communityAwards')->get()->sum('community_awards_count');
        $workAwards = PersonalInfo::withCount('workAwards')->get()->sum('work_awards_count');

        return $academicAwards + $communityAwards + $workAwards;
    }
}
