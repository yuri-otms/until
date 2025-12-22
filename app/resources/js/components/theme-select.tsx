import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { type Category, type Theme, type Content, type onThemeChange } from "@/types"

export function ThemeSelect({
    themes,
    activeTheme,
    onThemeChange
} : {
    themes: Theme[] | Content[] | Category[];
    activeTheme: string;
    onThemeChange: onThemeChange;
}) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onThemeChange(e.target.value);
    };

    return (
        <div className="py-2">
                <NativeSelect
                handleChange={handleChange}
                value={activeTheme}
                >
                    {themes.map((row) =>
                        <NativeSelectOption
                        key={row.id}
                        value={row.id}
                        >{row.name}
                        </NativeSelectOption>
                    )};d
                </NativeSelect>
        </div>
    );
}

