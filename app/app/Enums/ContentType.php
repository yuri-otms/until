<?php

namespace App\Enums;

enum ContentType: string
{
    case POST = 'post';
    case COMIC = 'comic';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match($this) {
            self::POST => '記事',
            self::COMIC => '漫画',
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
