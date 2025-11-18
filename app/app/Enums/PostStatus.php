<?php

namespace App\Enums;

enum PostStatus: string
{
    case DRAFT = 'draft';
    case PUBLISHED = 'published';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match($this) {
            self::DRAFT => '下書き',
            self::PUBLISHED => '公開',
        };
    }

    public static function keyLabelList(): array
    {
        return array_map(fn($case) => [
            'key' => $case->value,
            'label' => $case->label(),
        ], self::cases());
    }
}
