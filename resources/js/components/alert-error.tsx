import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertError = ({
  errors,
  title,
}: {
  errors: string[];
  title?: string;
}) => (
  <Alert variant="destructive">
    <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
    <AlertTitle>{title || "Something went wrong."}</AlertTitle>
    <AlertDescription>
      <ul className="list-inside list-disc text-sm">
        {[...new Set(errors)].map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </AlertDescription>
  </Alert>
);
export default AlertError;
