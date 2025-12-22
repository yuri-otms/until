<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Contents\HomeController;
use App\Http\Controllers\Contents\ContentController;
use App\Http\Controllers\Contents\PostController;
use App\Http\Controllers\Contents\ComicController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', function () {
    return Inertia::render('contents/home/about');
})->name('about');
Route::get('/profile', function () {
    return Inertia::render('contents/home/profile');
})->name('profile');
Route::get('/contact', function () {
    return Inertia::render('contents/home/contact');
})->name('contact');

Route::get('/contents/{content:slug}', [ContentController::class, 'show'])->name('contents.show');

Route::get('/contents/{content:slug}/post/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/contents/{content:slug}/comic/{comic}', [ComicController::class, 'show'])->name('comics.show');

require __DIR__.'/settings.php';
