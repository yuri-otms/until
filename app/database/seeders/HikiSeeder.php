<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Content;
use App\Models\Category;
use App\Models\Theme;

class HikiSeeder extends Seeder
{
    public function run(): void
    {


        Theme::firstOrCreate(
            [
                'id' => 2,
                'name' => 'ひきこもりメモ',
                'slug' => 'hiki_memo',
                'description' => 'ひきこもりから不安を減らす、動き出すためのTipsなどです。'
            ]
        );

        $contents = [
            7 => [
                'name' => '動き出すヒント',
                'slug' => 'tips',
                'type' => 'post',
                'sort_order' => 1,
            ],
            8 => [
                'name' => 'ひきこもりで考えたこと',
                'display_name' => 'ひきこもりで
                考えたこと',
                'slug' => 'thought',
                'type' => 'post',
                'sort_order' => 2,
            ],
        ];

        foreach ($contents as $key => $data) {
            $data['theme_id'] = 2;
            $data['id'] = $key;
            $content = new Content();
            $content->fill($data);
            $content->saveQuietly();
        }
    }
}
