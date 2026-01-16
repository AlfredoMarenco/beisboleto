<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TeamController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/teams/{id}', [TeamController::class, 'show'])->name('teams.show');
Route::get('/api/teams', [TeamController::class, 'indexApi'])->name('api.teams');
