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
use App\Enums\ContentType;
use App\Enums\PostStatus;

class ContentController extends Controller
{
    //
    public function index(Request $request): Response
    {
        $themes = Theme::orderBy('sort_order')
                        ->get();
        $theme = $this->getTheme($themes, $request);


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
            'contentTypeOptions' => ContentType::keyLabelList(),
        ]);
    }

    public function create(Request $request): Response
    {
        $themes = Theme::orderBy('sort_order')
                        ->get();
        $theme = $this->getTheme($themes, $request);
        return Inertia::render('admin/contents/create', [
            'themes' => $themes,
            'theme' => $theme,
            'contentTypeOptions' => ContentType::keyLabelList(),
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function store(ContentStoreRequest $request): RedirectResponse
    {
        $content = $request->all();
        $themeId = $content['theme_id'];
        $theme = Theme::find($themeId);
        Content::create($content);
        return to_route('admin.contents.index', [
            'theme_id' => $theme->id,
        ]);
    }

    public function edit(Content $content): Response
    {
        $themes = Theme::orderBy('sort_order')
                        ->get();
        return Inertia::render('admin/contents/edit', [
            'content' => $content,
            'themes' => $themes,
            'contentTypeOptions' => ContentType::keyLabelList(),
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function update(ContentUpdateRequest $request, Content $content): RedirectResponse
    {
        $content->update($request->validated());
        return to_route('admin.contents.index', [
            'theme_id' => $content->theme_id,
        ]);
    }

    public function destroy(Content $content): void
    {
        $content->delete();
    }

    public function reorder(Content $content, Request $request): void
    {
        $content->reorder($request->input('oldIndex'), $request->input('newIndex'), 'react');
    }

    protected function getTheme($themes, Request $request)
    {
        $initialThemeId = $themes->first()->id ?? null;
        $themeId = $request->input('theme_id', $initialThemeId);
        return Theme::find($themeId);
    }
}
