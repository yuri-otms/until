<?php

namespace App\Models;

use App\Models\Content;

class Post extends BaseArticle
{
    protected static ?string $sortScope = 'category_id';

    public function sortScope(): string
    {
        // content_id変更時のupdatingフック内では、リレーションが古い可能性があるため
        // content_idから直接取得する
        $content = Content::find($this->content_id);
        
        if ($content && $content->has_categories) {
            return 'category_id';
        } else {
            return 'content_id';
        }
    }

    protected function routeName(): string
    {
        return 'posts.show';
    }

    public function viewPath(): string
    {
        return 'contents/posts/show';
    }
}
