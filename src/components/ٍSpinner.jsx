import { memo } from 'react';

import {
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

const Spinner = () => {
    return (
        <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
            <Item variant="muted">
                <ItemMedia>
                    <Spinner />
                </ItemMedia>
            </Item>
        </div>
    );
};

export default memo(Spinner);
