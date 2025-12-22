import { Icon } from '@/components/icon';
import { House, LucideIcon } from 'lucide-react';

const dashbordIcon: LucideIcon = House;

export default function AppLogoIcon() {
    return (
        <Icon
            iconNode={dashbordIcon}
            className="h-5 w-5"
        />
    );
}
