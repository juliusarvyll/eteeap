<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PersonalInfoResource\Pages;
use App\Filament\Resources\PersonalInfoResource\RelationManagers;
use App\Models\PersonalInfo;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\RepeatableEntry;
use Joaopaulolndev\FilamentPdfViewer\Infolists\Components\PdfViewerEntry;
use Illuminate\Support\Facades\Storage;
use Filament\Actions\Action;
use Barryvdh\DomPDF\Facade\Pdf;

class PersonalInfoResource extends Resource
{
    protected static ?string $model = PersonalInfo::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Applicant';

    protected static ?string $modelLabel = 'Applicant Information';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('firstName')
                    ->required()
                    ->label('First Name'),
                Forms\Components\TextInput::make('middleName')
                    ->label('Middle Name'),
                Forms\Components\TextInput::make('lastName')
                    ->required()
                    ->label('Last Name'),
                Forms\Components\TextInput::make('suffix')
                    ->label('Suffix'),
                Forms\Components\DatePicker::make('birthDate')
                    ->required()
                    ->label('Birth Date')
                    ->format('Y-m-d'),
                Forms\Components\TextInput::make('placeOfBirth')
                    ->label('Place of Birth'),
                Forms\Components\Select::make('civilStatus')
                    ->options([
                        'single' => 'Single',
                        'married' => 'Married',
                        'divorced' => 'Divorced',
                        'widowed' => 'Widowed',
                    ])
                    ->label('Civil Status'),
                Forms\Components\FileUpload::make('document')
                    ->label('Document'),
                Forms\Components\Select::make('sex')
                    ->options([
                        'male' => 'Male',
                        'female' => 'Female',
                    ])
                    ->label('Sex'),
                Forms\Components\TextInput::make('religion')
                    ->label('Religion'),
                Forms\Components\TextInput::make('languages')
                    ->label('Languages'),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Personal Information')
                    ->schema([
                        TextEntry::make('firstName')
                            ->label('First Name'),
                        TextEntry::make('middleName')
                            ->label('Middle Name'),
                        TextEntry::make('lastName')
                            ->label('Last Name'),
                        TextEntry::make('suffix')
                            ->label('Suffix'),
                        TextEntry::make('birthDate')
                            ->label('Birth Date')
                            ->date('Y-m-d'),
                        TextEntry::make('placeOfBirth')
                            ->label('Place of Birth'),
                        TextEntry::make('civilStatus')
                            ->label('Civil Status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'single' => 'info',
                                'married' => 'success',
                                'divorced' => 'danger',
                                'widowed' => 'warning',
                                default => 'gray',
                            }),
                        TextEntry::make('document')
                            ->label('Document')
                            ->visible(fn ($record) => filled($record->document))
                            ->badge()
                            ->color('success')
                            ->formatStateUsing(fn () => 'Document Uploaded'),

                        TextEntry::make('sex')
                            ->label('Sex')
                            ->badge(),
                        TextEntry::make('religion')
                            ->label('Religion'),
                        TextEntry::make('languages')
                            ->label('Languages'),
                        TextEntry::make('status')
                            ->label('Application Status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'approved' => 'success',
                                'rejected' => 'danger',
                                default => 'gray',
                            }),
                    ])->columns(2),

                Section::make('Learning Objectives')
                    ->schema([
                        TextEntry::make('learningObjective.firstPriority')
                            ->label('First Priority'),
                        TextEntry::make('learningObjective.secondPriority')
                            ->label('Second Priority'),
                        TextEntry::make('learningObjective.thirdPriority')
                            ->label('Third Priority'),
                        TextEntry::make('learningObjective.goalStatement')
                            ->label('Goal Statement')
                            ->markdown(),
                        TextEntry::make('learningObjective.timeCommitment')
                            ->label('Time Commitment'),
                        TextEntry::make('learningObjective.overseasPlan')
                            ->label('Overseas Plan'),
                        TextEntry::make('learningObjective.costPayment')
                            ->label('Cost Payment'),
                        TextEntry::make('learningObjective.completionTimeline')
                            ->label('Completion Timeline'),
                    ])->columns(2),

                Section::make('Education')
                    ->schema([
                        // Elementary Education
                        TextEntry::make('elementaryEducation.school_name')
                            ->label('Elementary School'),
                        TextEntry::make('elementaryEducation.address')
                            ->label('School Address'),
                        TextEntry::make('elementaryEducation.date_from')
                            ->label('From')
                            ->date(),
                        TextEntry::make('elementaryEducation.date_to')
                            ->label('To')
                            ->date(),
                        TextEntry::make('elementaryEducation.has_diploma')
                            ->label('Has Diploma')
                            ->badge(),

                        // High School Education
                        RepeatableEntry::make('highSchoolEducation')
                            ->schema([
                                TextEntry::make('school_name')
                                    ->label('School Name'),
                                TextEntry::make('address')
                                    ->label('Address'),
                                TextEntry::make('school_type')
                                    ->label('School Type'),
                                TextEntry::make('date_from')
                                    ->label('From')
                                    ->date(),
                                TextEntry::make('date_to')
                                    ->label('To')
                                    ->date(),
                            ])->columns(2),

                        // Post Secondary Education
                        RepeatableEntry::make('postSecondaryEducation')
                            ->schema([
                                TextEntry::make('program')
                                    ->label('Program'),
                                TextEntry::make('institution')
                                    ->label('Institution'),
                                TextEntry::make('school_year')
                                    ->label('School Year'),
                            ])->columns(3),

                        // Non-Formal Education
                        RepeatableEntry::make('nonFormalEducation')
                            ->schema([
                                TextEntry::make('title')
                                    ->label('Title'),
                                TextEntry::make('organization')
                                    ->label('Organization'),
                                TextEntry::make('date_from')
                                    ->label('Date')
                                    ->date(),
                                TextEntry::make('certificate')
                                    ->label('Certificate'),
                                TextEntry::make('participation')
                                    ->label('Participation'),
                            ])->columns(2),

                        // Certifications
                        RepeatableEntry::make('certifications')
                            ->schema([
                                TextEntry::make('title')
                                    ->label('Title'),
                                TextEntry::make('agency')
                                    ->label('Agency'),
                                TextEntry::make('date_certified')
                                    ->label('Date Certified')
                                    ->date(),
                                TextEntry::make('rating')
                                    ->label('Rating'),
                            ])->columns(2),
                    ]),

                Section::make('Work Experience')
                    ->schema([
                        RepeatableEntry::make('workExperiences')
                            ->schema([
                                TextEntry::make('designation')
                                    ->label('Designation'),
                                TextEntry::make('companyName')
                                    ->label('Company Name'),
                                TextEntry::make('companyAddress')
                                    ->label('Company Address'),
                                TextEntry::make('dateFrom')
                                    ->label('From')
                                    ->date(),
                                TextEntry::make('dateTo')
                                    ->label('To')
                                    ->date(),
                                TextEntry::make('employmentStatus')
                                    ->label('Employment Status'),
                                TextEntry::make('supervisorName')
                                    ->label('Supervisor'),
                                TextEntry::make('reasonForLeaving')
                                    ->label('Reason for Leaving'),
                                TextEntry::make('responsibilities')
                                    ->label('Responsibilities')
                                    ->markdown(),
                                TextEntry::make('references')
                                    ->label('References')
                                    ->listWithLineBreaks(),
                            ])->columns(2),
                    ]),

                Section::make('Awards and Recognition')
                    ->schema([
                        // Academic Awards
                        RepeatableEntry::make('academicAwards')
                            ->schema([
                                TextEntry::make('title')
                                    ->label('Title'),
                                TextEntry::make('organization')
                                    ->label('Organization'),
                                TextEntry::make('dateAwarded')
                                    ->label('Date Awarded')
                                    ->date(),
                            ])->columns(3),

                        // Community Awards
                        RepeatableEntry::make('communityAwards')
                            ->schema([
                                TextEntry::make('title')
                                    ->label('Title'),
                                TextEntry::make('organization')
                                    ->label('Organization'),
                                TextEntry::make('dateAwarded')
                                    ->label('Date Awarded')
                                    ->date(),
                            ])->columns(3),

                        // Work Awards
                        RepeatableEntry::make('workAwards')
                            ->schema([
                                TextEntry::make('title')
                                    ->label('Title'),
                                TextEntry::make('organization')
                                    ->label('Organization'),
                                TextEntry::make('dateAwarded')
                                    ->label('Date Awarded')
                                    ->date(),
                            ])->columns(3),
                    ]),

                Section::make('Creative Works')
                    ->schema([
                        RepeatableEntry::make('creativeWorks')
                            ->schema([
                                TextEntry::make('title')
                                    ->label('Title'),
                                TextEntry::make('description')
                                    ->label('Description')
                                    ->markdown(),
                                TextEntry::make('significance')
                                    ->label('Significance')
                                    ->markdown(),
                                TextEntry::make('date_completed')
                                    ->label('Date Completed')
                                    ->date(),
                                TextEntry::make('corroborating_body')
                                    ->label('Corroborating Body'),
                            ])->columns(2),
                    ]),

                Section::make('Lifelong Learning')
                    ->schema([
                        RepeatableEntry::make('lifelongLearning')
                            ->schema([
                                TextEntry::make('type')
                                    ->label('Type')
                                    ->badge()
                                    ->color(fn (string $state): string => match ($state) {
                                        'hobby' => 'info',
                                        'skill' => 'success',
                                        'work' => 'warning',
                                        'volunteer' => 'primary',
                                        'travel' => 'danger',
                                        default => 'gray',
                                    }),
                                TextEntry::make('description')
                                    ->label('Description')
                                    ->markdown(),
                            ])->columns(2),
                    ]),

                Section::make('Essay')
                    ->schema([
                        TextEntry::make('essay.content')
                            ->label('Content')
                            ->markdown(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('applicant_id')
                    ->label('Application ID')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('firstName')
                    ->label('First Name')
                    ->searchable(),
                
                Tables\Columns\TextColumn::make('lastName')
                    ->label('Last Name')
                    ->searchable(),
                
                
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        default => 'gray',
                    })
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->searchable();
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPersonalInfos::route('/'),
            'create' => Pages\CreatePersonalInfo::route('/create'),
            'view' => Pages\ViewPersonalInfo::route('/{record}'),
            'edit' => Pages\EditPersonalInfo::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'pending')->count();
    }
}
