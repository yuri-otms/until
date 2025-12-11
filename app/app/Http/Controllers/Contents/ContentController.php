<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;
use App\Models\Category;
use App\Models\Post;

class ContentController extends Controller
{
    public function show(Content $content): Response
    {
        $table = $content->type . 's';

        $categories = Category::with([$table => function ($q) {
            $q->where('status', 'published')
                ->orderBy('sort_order');
        }])
                        ->where('content_id', $content->id)
                        ->whereHas($table, function ($q) {
                            $q->where('status', 'published');
                        })
                        ->orderBy('sort_order')
                        ->get();

        return Inertia::render('contents/contents/show-' . $content->type, [
            'content' => $content,
            'categories' => $categories,
        ]);
    }
}
