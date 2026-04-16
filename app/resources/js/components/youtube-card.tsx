interface YouTubeCardProps {
    videoId: string;
    imageStyle?: 'comic' | 'post';
}

export default function YouTubeCard({ videoId, imageStyle = 'post' }: YouTubeCardProps) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="my-4">
            <div className="max-w-xl mx-auto rounded-lg overflow-hidden shadow-lg relative z-0">
                <div className="relative aspect-video">
                    <iframe
                        src={embedUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
