<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\ThemeController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ComicController;

Route::prefix(config('admin.path'))
        ->name('admin.')
        ->group(function () {

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
        Route::get('/contents/change-theme', [ContentController::class, 'changeTheme'])->name('contents.change-theme');

        Route::put('/themes/reorder/{theme}/', [ThemeController::class, 'reorder'])->name('themes.reorder');
        Route::put('/contents/reorder/{content}/', [ContentController::class, 'reorder'])->name('contents.reorder');
        Route::put('/categories/reorder/{category}/', [CategoryController::class, 'reorder'])->name('categories.reorder');
        Route::put('/posts/reorder/{post}/', [PostController::class, 'reorder'])->name('posts.reorder');
        Route::put('/comics/reorder/{comic}/', [ComicController::class, 'reorder'])->name('comics.reorder');
        Route::resources([
            'themes' => ThemeController::class,
            'contents' => ContentController::class,
            'categories' => CategoryController::class,
            'posts' => PostController::class,
            'comics' => ComicController::class,
        ]);
    });
});
