<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function show(Content $content, Post $post): Response
    {
        if ($post->status == 'draft') {
            abort(404);
        }
        return Inertia::render('contents/posts/show', [
            'content' => $content,
            'post' => $post,
        ]);
    }
}
