<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Contents\ContentsController;
use App\Http\Controllers\Contents\ThemesController;


Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');
});

Route::middleware(['auth'])->group(function () {
    Route::redirect('contents', '/contents/index');
    Route::get('/contents/change-theme', [ContentsController::class, 'changeTheme'])->name('contents.change-theme');

    Route::put('/themes/reorder/{theme}/', [ThemesController::class, 'reorder'])->name('themes.reorder');
    Route::put('/contents/reorder/{content}/', [ContentsController::class, 'reorder'])->name('contents.reorder');
    Route::resources([
        'contents' => ContentsController::class,
        'themes' => ThemesController::class,
    ]);

});

