<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\Content;
use App\Models\BaseArticle;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

abstract class BaseArticleController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display the specified article.
     */
    protected function showArticle(Content $content, BaseArticle $article): Response
    {
        try {
            $this->authorize('view', $article);
        } catch (AuthorizationException $e) {
            abort(404);
        }

        // メタ情報を準備
        $appName = config('app.name');
        $metaTitle = $article->title . ' - ' . $appName;
        // Markdownを除去してプレーンテキストの最初の60文字を取得
        $plainBody = strip_tags(preg_replace('/[#*`\[\]()]/', '', $article->body));
        $metaDescription = mb_substr($plainBody, 0, 60);

        $data = [
            'content' => $content,
            'category' => $article->category,
            'post' => $article,
            'previous' => $article->previousWithUrl(),
            'next' => $article->nextWithUrl(),
            'metaTitle' => $metaTitle,
            'metaDescription' => $metaDescription,
            'metaType' => 'article',
        ];

        // 画像がある場合は画像リストを追加
        if ($article->hasImages()) {
            $data['images'] = $this->getArticleImages($article);
        }

        return Inertia::render($article->viewPath(), $data);
    }

    /**
     * Get images for the article (for comics)
     */
    protected function getArticleImages(BaseArticle $article): array
    {
        $files = Storage::disk('public')->files('images/comics');
        $number = str_pad($article->id, 3, '0', STR_PAD_LEFT);
        
        $images = array_filter($files, function ($file) use ($number) {
            return Str::contains(basename($file), $number);
        });
        
        return array_values($images);
    }
}
