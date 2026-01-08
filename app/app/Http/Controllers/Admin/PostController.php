<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostStoreRequest;
use App\Http\Requests\Admin\PostUpdateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use App\Enums\PostStatus;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $content = $this->getContent($request);
        $categories = Category::getCategoriesByContent($content->id);
        $category = $this->getCategory($categories, $request);
        if ($category) {
            $posts = Post::where('category_id', $category->id)
                        ->orderBy('sort_order')
                        ->get();
        } elseif (!$content->has_categories) {
            $posts = Post::where('content_id', $content->id)
                        ->orderBy('sort_order')
                        ->get();
        } else {
            return dd('カテゴリーが登録されていません');
        }

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
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

        return Inertia::render('admin/posts/create', [
            'category' => $category,
            'categories' => $categories,
            'content' => $content,
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function store(PostStoreRequest $request): RedirectResponse
    {
        $post = $request->all();
        $categoryId = $post['category_id'];
        $contentId = $post['content_id'];
        $content = Content::find($contentId);
        $post['content_id'] = $content->id;
        Post::create($post);
        return to_route('admin.posts.index',[
            'content'=> $content->slug,
            'category_id' => $categoryId,
        ]);
    }

    public function edit(Post $post): Response
    {
        $content = Content::find($post->content_id);
        $categories = Category::getCategoriesByContent($content->id);
        return Inertia::render('admin/posts/edit', [
            'content' => $content,
            'categories' => $categories,
            'post' => $post,
            'postStatusOptions' => PostStatus::keyLabelList(),
        ]);
    }

    public function update(PostUpdateRequest $request, Post $post): RedirectResponse
    {
        $post->update($request->validated());
        return to_route('admin.posts.index', [
            'content'=> $post->content->slug,
            'category_id' => $post->category_id,
        ]);
    }

    public function destroy(Post $post): void
    {
        $post->delete();
    }

    public function reorder(Post $post, Request $request): void
    {
        $post->reorder($request->input('oldIndex'), $request->input('newIndex'), 'react');
    }

    protected function getContent(Request $request)
    {
        $contentSlug = $request->input('content', 1);
        return Content::where('slug', $contentSlug)->first();
    }

    protected function getCategory($categories, Request $request)
    {
        $content = Content::where('slug', $request->input('content'))
                    ->get()
                    ->first();
        if ($content->has_categories) {
            $initialCategoryId = $categories->first()->id ?? null;
            $categoryId = $request->input('category_id', $initialCategoryId);
            $category = Category::find($categoryId);
        } else {
            $category = null;
        }
        return $category;
    }

}
