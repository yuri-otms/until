interface YouTubeCardProps {
    videoId: string;
}

export default function YouTubeCard({ videoId }: YouTubeCardProps) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return (
        <div className="my-4">
            <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-black group"
            >
                <div className="relative aspect-video">
                    <img
                        src={thumbnailUrl}
                        alt="YouTube video thumbnail"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    {/* YouTube再生ボタンのオーバーレイ */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                            <svg
                                className="w-10 h-10 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}
