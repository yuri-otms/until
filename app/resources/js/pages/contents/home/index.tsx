import {
    HomeCard,
    HomeCardHeader,
    HomeCardTitle,
    HomeCardDescription,
    HomeCardContent
} from '@/components/ui/home-card';
import { ContentButton } from '@/components/ui/content-button';
import { PostButton } from '@/components/ui/post-button';
import ContentLayout from '@/layouts/content-layout'
import { type ContentGroup, type Post } from '@/types';

export default function Index({
    contentGroups,
    recentPosts = []
}: {
    contentGroups : ContentGroup[];
    recentPosts?: Post[];
   }) {
    return (
        <ContentLayout>
            <div className="mt-6 mb-5">
                <p className="mb-4">80歳になる2065年まで40年続けるサイトです。</p>
            </div>

            {/* 最新記事セクション */}
            {recentPosts.length > 0 && (
                <HomeCard>
                    <HomeCardHeader>
                        <HomeCardTitle>最新記事</HomeCardTitle>
                    </HomeCardHeader>
                    <HomeCardContent>
                        {recentPosts.map((post) => (
                            <PostButton
                                key={post.id}
                                href={post.url}
                                title={post.title}
                                publishedAt={post.published_at || ''}
                                contentName={post.content_name}
                            />
                        ))}
                    </HomeCardContent>
                </HomeCard>
            )}

            {contentGroups.map((themeRow) =>
                <HomeCard key={themeRow.id}>
                    <HomeCardHeader>
                        <HomeCardTitle>{themeRow.name}</HomeCardTitle>
                        <HomeCardDescription>
                            {themeRow.description}
                        </HomeCardDescription>
                    </HomeCardHeader>
                    <HomeCardContent>
                        {themeRow.contents.map((contentRow) =>
                            <ContentButton key={contentRow.id}
                                href={ contentRow.url ?? '/contents/' + contentRow.slug}>
                            {contentRow.display_name || contentRow.name}
                            </ContentButton>
                        )}
                    </HomeCardContent>
                </HomeCard>
            )}
        </ContentLayout>
    );
}
