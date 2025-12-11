<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\Content;
use App\Models\Comic;
use Inertia\Inertia;
use Inertia\Response;

class ComicController extends Controller
{
    use AuthorizesRequests;

    public function show(Content $content, Comic $comic): Response
    {
        try {
            $this->authorize('view', $comic);
        } catch (AuthorizationException $e) {
            abort(404);
        }

        return Inertia::render('contents/comics/show', [
            'content' => $content,
            'post' => $comic,
        ]);
    }
}
