<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;
use App\Models\Category;
use App\Models\Post;

class PostsController extends Controller
{
    public function index(Request $request): Response
    {
        $contentId = $request->input('content_id', 1);
        $content = Content::find($contentId);

        $categories = Category::where('content_id', $contentId)
                        ->orderBy('sort_order')
                        ->get();
        $initialCategoryId = $categories->first()->id ?? null;
        $categoryId = $request->input('category_id', $initialCategoryId);
        $category = Category::find($categoryId);

        if ($category) {
            $posts = Post::where('category_id', $category->id)
                        ->orderBy('sort_order')
                        ->get();
        }

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
            'categories' => $categories,
            'category' => $category,
            'content' => $content,
        ]);
    }
}
