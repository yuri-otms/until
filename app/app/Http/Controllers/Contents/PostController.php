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

        return Inertia::render('contents/posts/show', [
            'content' => $content,
            'category' => $post->category,
            'post' => $post,
            'previous' => $post->previousWithUrl(),
            'next' => $post->nextWithUrl()
        ]);
    }
}
