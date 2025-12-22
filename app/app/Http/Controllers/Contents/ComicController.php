<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\Content;
use App\Models\Comic;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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

        $files = Storage::disk('public')->files('images/comics');

        $number = str_pad($comic->id, 3, '0', STR_PAD_LEFT);
        // 003 で始まるファイルだけに絞る

        $images = array_filter($files, function ($file) use ($number) {
            return Str::contains(basename($file), $number);
        });
        $images = array_values($images);

        return Inertia::render('contents/comics/show', [
            'content' => $content,
            'category' => $comic->category,
            'post' => $comic,
            'images' => $images,
            'previous' => $comic->previousWithUrl(),
            'next' => $comic->nextWithUrl(),
        ]);
    }
}
