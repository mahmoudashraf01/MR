import { memo } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const DeleteCategoryAlert = ({ alertTitle }) => {
    return (
        <div className="grid w-full max-w-xl items-start gap-4">
            <Alert>
                <CheckCircle2Icon />
                <AlertTitle>{alertTitle}</AlertTitle>
            </Alert>
        </div>
    );
};

export default memo(DeleteCategoryAlert);