import { memo } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const DeleteCategoryAlert = ({ alertTitle, alertColor, borderColor, type }) => {
    return (
        <div className={`grid w-full max-w-xl bg-[${alertColor}] rounded-md border border-[${borderColor}] items-start gap-4`}>
            <Alert className="border-0 bg-transparent">
                {type === 'error' ? (
                    <AlertCircleIcon className="text-white" />
                ) : (
                    <CheckCircle2Icon className="text-white" />
                )}
                <AlertTitle>
                    <h1 className='text-white'>{alertTitle}</h1>
                </AlertTitle>
            </Alert>
        </div>
    );
};

export default memo(DeleteCategoryAlert);