<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ContentsController;
use App\Http\Controllers\Admin\ThemesController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\PostsController;

Route::prefix('admin')->group(function () {

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/', function () {
            return Inertia::render('admin/dashboard');
        })->name('dashboard');
    });

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
            return Inertia::render('admin/settings/appearance');
        })->name('appearance.edit');

        Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
            ->name('two-factor.show');

        // 管理画面
        Route::get('/contents/change-theme', [ContentsController::class, 'changeTheme'])->name('contents.change-theme');

        Route::put('/themes/reorder/{theme}/', [ThemesController::class, 'reorder'])->name('themes.reorder');
        Route::put('/contents/reorder/{content}/', [ContentsController::class, 'reorder'])->name('contents.reorder');
        Route::put('/categoriess/reorder/{category}/', [CategoriesController::class, 'reorder'])->name('categories.reorder');
        Route::resources([
            'themes' => ThemesController::class,
            'contents' => ContentsController::class,
            'categories' => CategoriesController::class,
            'posts' => PostsController::class,
        ]);
    });
});
