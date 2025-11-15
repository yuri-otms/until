<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Content extends Model
{
    use HasSortOrder;
    protected static ?string $sortScope = 'theme_id';

    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'theme_id'
    ];

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
