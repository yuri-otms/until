<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Theme extends Model
{
    use HasSortOrder;

    protected $fillable = [
        'name',
        'sort_order'
    ];

    public function contents()
    {
        return $this->hasMany(Content::class);
    }
}
