<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\PostStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contents', function (Blueprint $table) {
            $table->boolean('is_listed')->default(true)->after('type');
            $table->enum('status', PostStatus::values())->default(PostStatus::PUBLISHED->value)->after('is_listed');
            $table->boolean('has_categories')->default(true)->after('status');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->change();
        Schema::table('comics', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->change();
        });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contents', function (Blueprint $table) {
            $table->dropColumn(['is_listed', 'status', 'has_categories']);
        });


        Schema::table('posts', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable(false)->change();
        });
        Schema::table('comics', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable(false)->change();
        });
    }
};
