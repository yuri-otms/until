<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;
use App\Trait\HasPrevNextNavigation;

abstract class BaseArticle extends Model
{
    use HasFactory;
    use HasSortOrder;
    use HasPrevNextNavigation;

    protected $fillable = [
        'title',
        'sort_order',
        'content_id',
        'category_id',
        'body',
        'status',
        'published_at',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'published_at' => 'datetime:Y-m-d H:i',
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    /**
     * Get the route name for this article type
     */
    abstract protected function routeName(): string;

    /**
     * Get the sort scope for this article
     */
    abstract public function sortScope(): string;

    /**
     * Check if this article type has images
     */
    public function hasImages(): bool
    {
        return false;
    }

    /**
     * Get the view path for rendering this article
     */
    public function viewPath(): string
    {
        return 'contents/articles/show';
    }

    public function content()
    {
        return $this->belongsTo(Content::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
