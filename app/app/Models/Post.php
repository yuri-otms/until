<?php

namespace App\Models;

class Post extends BaseArticle
{
    protected static ?string $sortScope = 'category_id';

    public function sortScope(): string
    {
        if ($this->category_id) {
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
