<?php

use App\Http\Controllers\MultiStepFormController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/dashboard', [MultiStepFormController::class, 'index'])->name('Dashboard');
Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/track-application', function () {
    return Inertia::render('TrackApplication');
})->name('track-application');

Route::get('/track-applications', [ApplicationController::class, 'trackApplication'])->name('track-applications');

Route::get('/api/track-application', [ApplicationController::class, 'trackApplication']);


require __DIR__.'/auth.php';
