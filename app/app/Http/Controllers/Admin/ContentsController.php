<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ContentStoreRequest;
use App\Http\Requests\Admin\ContentUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;
use App\Models\Theme;

class ContentsController extends Controller
{
    //
    public function index(Request $request): Response
    {
        $themes = Theme::orderBy('sort_order')
                        ->get();

        $initialThemeId = $themes->first()->id ?? null;
        $themeId = $request->input('theme_id', $initialThemeId);
        $theme = Theme::find($themeId);

        $contents = [];
        if ($theme) {
            $contents = Content::where('theme_id', $theme->id)
                        ->orderBy('sort_order')
                        ->get();
        }
        return Inertia::render('admin/contents/index', [
            'themes' => $themes,
            'contents' => $contents,
            'theme' => $theme,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/contents/create', [
            'themes' => Theme::orderBy('sort_order')
                        ->get(),
        ]);
    }

    public function store(ContentStoreRequest $request): RedirectResponse
    {
        Content::create($request->all());
        return to_route('contents.index');
    }

    public function edit(Content $content): Response
    {
        return Inertia::render('admin/contents/edit', [
            'content' => $content,
            'themes' => Theme::orderBy('sort_order')
                        ->get(),
        ]);
    }

    public function update(ContentUpdateRequest $request, Content $content): RedirectResponse
    {
        $content->update($request->validated());
        return to_route('contents.index');
    }

    public function destroy(Content $content): void
    {
        $content->delete();
    }

    public function reorder(Content $content, Request $request): void
    {
        $content->reorder($request->input('oldIndex'), $request->input('newIndex'), 'react');
    }
}
