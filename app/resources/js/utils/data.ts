export function formatJapaneseDate(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return '';
    }
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)
}
