<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;
use App\Trait\HasPrevNextNavigation;

class Comic extends Model
{
    use HasFactory;
    use HasSortOrder;

    public function sortScope(): string
    {
        if ($this->content->has_categories) {
            return 'category_id';
        } else {
            return 'content_id';
        }
    }

    protected static ?string $url = '';

    use HasPrevNextNavigation;

    protected function routeName(): string
    {
        return 'comics.show';
    }

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
        'id',
    ];

    protected $casts = [
        'published_at' => 'datetime:Y-m-d H:i',
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}
