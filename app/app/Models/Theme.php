<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Theme extends Model
{
    use HasFactory;
    use HasSortOrder;
    protected static ?string $sortScope = '';

    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'status',
        'description',
    ];

    public function contents()
    {
        return $this->hasMany(Content::class);
    }
}
