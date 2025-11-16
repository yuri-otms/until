<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Theme;
use App\Models\Content;
use App\Models\Category;
use App\Models\Post;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Theme::firstOrCreate(
            [
                'id' => 1,
                'name' => 'テーマ1',
                'slug' => 'theme1',
                'description' => 'テーマ1の説明文です'
            ]
        );
        Content::firstOrCreate(
            [
                'id' => 1,
                'name' => 'コンテンツ1',
                'slug' => 'content1',
                'theme_id' => 1,
            ]
        );
        Category::firstOrCreate(
            [
                'id' => 1,
                'name' => 'カテゴリー1',
                'slug' => 'Category1',
                'content_id' => 1,
            ]
        );


    }
}
