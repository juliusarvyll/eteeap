<?php

use App\Http\Controllers\MultiStepFormController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [MultiStepFormController::class, 'index'])->name('dashboard');


require __DIR__.'/auth.php';
