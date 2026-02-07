<?php

namespace App\Http\Controllers\Contents;

use App\Models\Content;
use App\Models\Post;
use Inertia\Response;

class PostController extends BaseArticleController
{
    public function show(Content $content, Post $post): Response
    {
        return $this->showArticle($content, $post);
    }
}
