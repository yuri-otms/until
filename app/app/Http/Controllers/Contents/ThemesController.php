<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contents\ContentRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Theme;

class ThemesController extends Controller
{
    //
    public function index(): Response
    {
        return Inertia::render('themes/index', [
            'themes' => Theme::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('themes/create', []);
    }

    public function store(Request $request): RedirectResponse
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

    public function update(Request $request, Theme $theme): RedirectResponse
    {
        $theme->update($request->validated());
        return to_route('themes.index');
    }

    public function destroy(Theme $theme): RedirectResponse
    {
        $theme->delete();
        return to_route('themes.index');
    }
}
