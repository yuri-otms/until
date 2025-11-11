<?php

namespace App\Trait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

trait HasSortOrder
{
    protected static function bootHasSortOrder()
    {
        static::creating(function (Model $model) {
            $model->sort_order = 1;
            // 既存のデータのsort_order変更
            DB::table($model->getTable())
                ->increment('sort_order');
        });
    }

    // TODO: 新規作成時、同グループのsort_orderを全て+1する
    // TODO: 削除時、同グループのsort_orderを全て-1する


}
