<?php

namespace App\Trait;
use Illuminate\Database\Eloquent\Model;

trait HasSortOrder
{
    protected static function bootHasSortOrder()
    {
        static::creating(function (Model $model) {
            $model->sort_order = 1;
        });
    }

    // TODO: 新規作成時、同グループのsort_orderを全て+1する
    // TODO: 削除時、同グループのsort_orderを全て-1する


}
