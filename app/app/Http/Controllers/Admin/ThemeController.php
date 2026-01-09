<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ThemeStoreRequest;
use App\Http\Requests\Admin\ThemeUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Theme;
use App\Enums\PostStatus;

class ThemeController extends Controller
{
    //
    public function index(): Response
    {
        return Inertia::render('admin/themes/index', [
            'themes' => Theme::orderBy('sort_order')
                        ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/themes/create', [
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function store(ThemeStoreRequest $request): RedirectResponse
    {
        Theme::create($request->all());
        return to_route('admin.themes.index');
    }

    public function  edit(Theme $theme): Response
    {
        return Inertia::render('admin/themes/edit', [
            'theme' => $theme,
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function update(ThemeUpdateRequest $request, Theme $theme): RedirectResponse
    {
        $theme->update($request->validated());
        return to_route('admin.themes.index');
    }

    public function destroy(Theme $theme): void
    {
        $theme->delete();
    }

    public function reorder(Theme $theme, Request $request): void
    {
        $theme->reorder($request->input('oldIndex'), $request->input('newIndex'), 'react');
    }
}
