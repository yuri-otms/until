<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ComicStoreRequest;
use App\Http\Requests\Admin\ComicUpdateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;
use App\Models\Category;
use App\Models\Comic;
use Illuminate\Http\RedirectResponse;
use App\Enums\PostStatus;

class ComicController extends Controller
{
    public function index(Request $request): Response
    {
        $content = $this->getContent($request);
        $categories = Category::getCategoriesByContent($content->id);
        $category = $this->getCategory($categories, $request);

        if ($category) {
            $comics = Comic::where('category_id', $category->id)
                        ->orderBy('sort_order')
                        ->get();
        } else {
            return dd('カテゴリーが登録されていません');
        }

        return Inertia::render('admin/comics/index', [
            'posts' => $comics,
            'categories' => $categories,
            'category' => $category,
            'content' => $content,
        ]);
    }

    public function create(Request $request): Response
    {
        $content = $this->getContent($request);
        $categories = Category::getCategoriesByContent($content->id);
        $category = $this->getCategory($categories, $request);

        return Inertia::render('admin/comics/create', [
            'category' => $category,
            'categories' => $categories,
            'content' => $content,
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function store(ComicStoreRequest $request): RedirectResponse
    {
        $comic = $request->all();
        $categoryId = $comic['category_id'];
        $content = Category::getContentbyCategory($categoryId);
        $comic['content_id'] = $content->id;
        Comic::create($comic);
        return to_route('admin.comics.index',[
            'content'=> $content->slug,
            'category_id' => $categoryId,
        ]);
    }

    public function edit(Comic $comic): Response
    {
        $content = Content::find($comic->content_id);
        $categories = Category::getCategoriesByContent($content->id);
        return Inertia::render('admin/comics/edit', [
            'content' => $content,
            'categories' => $categories,
            'post' => $comic,
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function update(ComicUpdateRequest $request, Comic $comic): RedirectResponse
    {
        $comic->update($request->validated());
        return to_route('admin.comics.index', [
            'content'=> $comic->content->slug,
            'category_id' => $comic->category->id,
        ]);
    }

    public function destroy(Comic $comic): void
    {
        $comic->delete();
    }

    public function reorder(Comic $comic, Request $request): void
    {
        $comic->reorder($request->input('oldIndex'), $request->input('newIndex'), 'react');
    }

    protected function getContent(Request $request)
    {
        $contentSlug = $request->input('content', 1);
        return Content::where('slug', $contentSlug)->first();
    }

    protected function getCategory($categories, Request $request)
    {
        $initialCategoryId = $categories->first()->id ?? null;
        $categoryId = $request->input('category_id', $initialCategoryId);
        return Category::find($categoryId);
    }

}
