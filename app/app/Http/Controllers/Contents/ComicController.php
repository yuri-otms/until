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

        // メタ情報を準備
        $appName = config('app.name');
        $metaTitle = $comic->title . ' - ' . $appName;
        // Markdownを除去してプレーンテキストの最初の60文字を取得
        $plainBody = strip_tags(preg_replace('/[#*`\[\]()]/', '', $comic->body));
        $metaDescription = mb_substr($plainBody, 0, 60);

        return Inertia::render('contents/comics/show', [
            'content' => $content,
            'category' => $comic->category,
            'post' => $comic,
            'images' => $images,
            'previous' => $comic->previousWithUrl(),
            'next' => $comic->nextWithUrl(),
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'metaType' => 'article',
        ]);
    }
}
