<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Contents\HomeController;
use App\Http\Controllers\Contents\ContentController;
use App\Http\Controllers\Contents\PostController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/contents/{content:slug}', [ContentController::class, 'show'])->name('contents.show');

Route::get('/contents/{content:slug}/{post}', [PostController::class, 'show'])->name('posts.show');

Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('welcome');

require __DIR__.'/settings.php';
