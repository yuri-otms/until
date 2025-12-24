<?php

namespace Tests\Feature\Command;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Post;
use App\Models\Category;
use App\Console\Commands\ImportHikimemoTips;
use App\Console\Commands\ImportLegacyHtml;
use Database\Seeders\HikiSeeder;

class ImportLegacyHtmlTest extends TestCase
{
    use RefreshDatabase;
    protected string $seeder = HikiSeeder::class;

    public function test_html_files_are_imported_as_posts()
    {
        $this->artisan('import:legacy-html')
                ->assertExitCode(0);

        $this->assertDatabaseHas('categories', [
            'name' => '少し動いてみる',
            'content_id' => 7,
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('categories', [
            'name' => '人に会ってみる',
            'content_id' => 7,
            'sort_order' => 2,
        ]);

        $this->assertDatabaseHas('posts', [
            'title' => 'ひきこもりからの最初の一歩',
            'category_id' => 3,
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('posts', [
            'title' => '一人で少し出かける',
            'category_id' => 1,
            'sort_order' => 3,
        ]);

        $this->assertDatabaseHas('posts', [
            'title' => '友人関係の維持',
            'category_id' => 4,
            'sort_order' => 2,
        ]);
    }
}
