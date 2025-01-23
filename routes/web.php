<?php

use App\Http\Controllers\MultiStepFormController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/application-form', [MultiStepFormController::class, 'index'])->name('welcome');
Route::get('/', function () {
    return Inertia::render('Welcome');
});


require __DIR__.'/auth.php';
