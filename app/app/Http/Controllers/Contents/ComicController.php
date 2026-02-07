<?php

namespace App\Http\Controllers\Contents;

use App\Models\Content;
use App\Models\Comic;
use Inertia\Response;

class ComicController extends BaseArticleController
{
    public function show(Content $content, Comic $comic): Response
    {
        return $this->showArticle($content, $comic);
    }
}
