# until
1985年生まれの運営者が最低でも80歳になる2065年までは続けるサイトです。

#　技術スタック
- Laravel 12
- TypeScript
- React

# 公開時必要な作業

```
php artisan migrate --seed
```

Seederも適用する

```
php artisan import:legacy-comics
```
DBのcomics_yuru(旧サイトのコミックエッセイのテーブル)を、本CMSにデータ移行する

