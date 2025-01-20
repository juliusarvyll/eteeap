<?php

namespace App\Filament\Resources\PersonalInfoResource\Pages;

use App\Filament\Resources\PersonalInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class ViewPersonalInfo extends ViewRecord
{
    protected static string $resource = PersonalInfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('export_pdf')
                ->label('Export PDF')
                ->icon('heroicon-o-document-arrow-down')
                ->action(function () {
                    $record = $this->record;

                    $pdf = Pdf::loadView('pdfs.personal-info', [
                        'record' => $record,
                    ]);

                    return response()->streamDownload(
                        fn () => print($pdf->output()),
                        'applicant-information.pdf'
                    );
                }),
            Actions\EditAction::make(),
        ];
    }
}
