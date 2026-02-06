<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Theme;
use App\Models\Content;
use App\Models\Post;

class HomeController extends Controller
{
    public function index(): Response
    {
        $themes = Theme::with([
            'contents' => function ($query) {
                $query
                    ->where('status', 'published')
                    ->where('is_listed', true)
                    ->orderBy('sort_order');
            }
        ])
                ->where('status', 'published')
                ->orderBy('sort_order')
                ->get();

        // 最新記事4件を取得（公開済み、公開日が現在以前のもののみ）
        $recentPosts = Post::with('content')
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->take(4)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'published_at' => $post->published_at,
                    'content_name' => $post->content->display_name ?? $post->content->name,
                    'url' => $post->url ?? route('posts.show', [
                        'content' => $post->content->slug,
                        'post' => $post->id
                    ]),
                ];
            });

        return Inertia::render('contents/home/index', [
            'contentGroups' => $themes,
            'recentPosts' => $recentPosts,
        ]);
    }
}
