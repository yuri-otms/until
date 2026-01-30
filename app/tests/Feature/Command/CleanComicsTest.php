<?php

namespace Tests\Feature\Command;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Database\Seeders\HikiSeeder;

class CleanComicsTest extends TestCase
{
    use RefreshDatabase;
    protected string $seeder = HikiSeeder::class;
    /**
     * A basic feature test example.
     */
    public function test_clean_images_command(): void
    {
        Storage::fake('public');

        Storage::disk('public')->put('images/comics/001.png', 'dummy');
        Storage::disk('public')->put('images/comics/001_1.png', 'dummy');

        $this->artisan('comics:clean')
                ->assertExitCode(0);
        $this->assertFalse(Storage::disk('public')->exists('images/comics/001.png'));

        $this->assertTrue(Storage::disk('public')->exists('images/comics/001_1.png'));
    }
}
