<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Category extends Model
{
    use HasSortOrder;
    protected static ?string $sortScope = 'content_id';

    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'content_id'
    ];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }
}
