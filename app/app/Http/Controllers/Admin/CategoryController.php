<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryStoreRequest;
use App\Http\Requests\Admin\CategoryUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $contents = Content::getContentsOrderByTheme();
        $content = $this->getContent($contents, $request);

        $categories = [];
        if ($content) {
            $categories = Category::where('content_id', $content->id)
                            ->orderBy('sort_order')
                            ->get();
        }

        return Inertia::render('admin/categories/index', [
            'contents' => $contents,
            'categories' => $categories,
            'content' => $content,
        ]);
    }

    public function create(Request $request): Response
    {
        $contents = Content::getContentsOrderByTheme();
        $content = $this->getContent($contents, $request);
        return Inertia::render('admin/categories/create', [
            'contents' => $contents,
            'content' => $content,
        ]);
    }

    public function store(CategoryStoreRequest $request): RedirectResponse
    {
        $category = $request->all();
        $contentId = $category['content_id'];
        Category::create($category);
        return to_route('admin.categories.index', [
            'content_id' => $contentId,
        ]);
    }

    public function edit(Category $category): Response
    {
        $contents = Content::getContentsOrderByTheme();

        return Inertia::render('admin/categories/edit', [
            'category' => $category,
            'contents' => $contents,
        ]);
    }

    public function update(CategoryUpdateRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());
        return to_route('admin.categories.index', [
            'content_id' => $category->content->id,
        ]);
    }

    public function destroy(Category $category): void
    {
        $category->delete();
    }

    public function reorder(Category $category, Request $request): void
    {
        $category->reorder($request->input('oldIndex'), $request->input('newIndex'), 'react');
    }

    protected function getContent($contents, Request $request)
    {
        $initialContentId = $contents->first()->id ?? null;
        $contentId = $request->input('content_id', $initialContentId);
        return Content::find($contentId);
    }

}

