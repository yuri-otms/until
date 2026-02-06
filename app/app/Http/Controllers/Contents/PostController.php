<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\Content;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    use AuthorizesRequests;

    public function show(Content $content, Post $post): Response
    {
        try {
            $this->authorize('view',$post);
        } catch (AuthorizationException $e) {
            abort(404);
        }

        // メタ情報を準備
        $appName = config('app.name');
        $metaTitle = $post->title . ' - ' . $appName;
        // Markdownを除去してプレーンテキストの最初の60文字を取得
        $plainBody = strip_tags(preg_replace('/[#*`\[\]()]/', '', $post->body));
        $metaDescription = mb_substr($plainBody, 0, 60);

        return Inertia::render('contents/posts/show', [
            'content' => $content,
            'category' => $post->category,
            'post' => $post,
            'previous' => $post->previousWithUrl(),
            'next' => $post->nextWithUrl(),
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'metaType' => 'article',
        ]);
    }
}
