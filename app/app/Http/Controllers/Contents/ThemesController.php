<?php

namespace App\Http\Controllers\Contents;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contents\ThemeStoreRequest;
use App\Http\Requests\Contents\ThemeUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Theme;

class ThemesController extends Controller
{
    //
    public function index(): Response
    {
        return Inertia::render('themes/index', [
            'themes' => Theme::orderBy('sort_order')
                        ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('themes/create', []);
    }

    public function store(ThemeStoreRequest $request): RedirectResponse
    {
        Theme::create($request->all());
        return to_route('themes.index');
    }

    public function  edit(Theme $theme): Response
    {
        return Inertia::render('themes/edit', [
            'theme' => $theme,
        ]);
    }

    public function update(ThemeUpdateRequest $request, Theme $theme): RedirectResponse
    {
        $theme->update($request->validated());
        return to_route('themes.index');
    }

    public function destroy(Theme $theme): RedirectResponse
    {
        $theme->delete();
        return to_route('themes.index');
    }

    public function reorder(Theme $theme, Request $request): void
    {
        $theme->reorder($request->input('oldIndex'), $request->input('newIndex'), 'react');
    }
}
