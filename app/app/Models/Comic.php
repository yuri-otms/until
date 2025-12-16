<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Comic extends Model
{
    use HasFactory;
    use HasSortOrder;
    protected static ?string $sortScope = 'category_id';

    protected $fillable = [
        'title',
        'sort_order',
        'content_id',
        'category_id',
        'body',
        'status',
        'created_at',
        'updated_at',
        'id',
    ];

    protected $casts = [
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
