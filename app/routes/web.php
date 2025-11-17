<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Contents\HomeController;
use App\Http\Controllers\Contents\ContentController;
use App\Http\Controllers\Contents\PostController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/content/{content:slug}', [ContentController::class, 'show'])->name('content.show');

Route::get('/content/{content:slug}/{post}', [PostController::class, 'show'])->name('post.show');

Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('welcome');

require __DIR__.'/settings.php';
