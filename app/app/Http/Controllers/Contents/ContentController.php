<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;
use App\Models\Post;

class ContentController extends Controller
{
    public function show(Content $content): Response
    {
        return Inertia::render('contents/contents/show', [
            'content' => $content,
        ]);
    }
}
