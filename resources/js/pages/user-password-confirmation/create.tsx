import { Form, Head } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { store } from "@/routes/password/confirm";

interface ConfirmationFieldsProps {
  errors: Record<string, string | undefined>;
  processing: boolean;
}

const Create = () => (
  <AuthLayout
    title="Confirm your password"
    description="This is a secure area of the application. Please confirm your password before continuing."
  >
    <Head title="Confirm password" />
    <ConfirmationForm />
  </AuthLayout>
);
export default Create;

const ConfirmationForm = () => (
  <Form {...store.form()} resetOnSuccess={["password"]}>
    {({ processing, errors }) => (
      <ConfirmationFields errors={errors} processing={processing} />
    )}
  </Form>
);

const ConfirmationFields = ({
  errors,
  processing,
}: ConfirmationFieldsProps) => (
  <div className="space-y-6">
    <PasswordField error={errors.password} />
    <ConfirmButtonRow processing={processing} />
  </div>
);

const PasswordField = ({ error }: { error?: string }) => (
  <div className="grid gap-2">
    <Label htmlFor="password">Password</Label>
    <Input
      id="password"
      type="password"
      name="password"
      placeholder="Password"
      autoComplete="current-password"
      autoFocus
    />
    <InputError message={error} />
  </div>
);

const ConfirmButtonRow = ({ processing }: { processing: boolean }) => (
  <div className="flex items-center">
    <ConfirmButton processing={processing} />
  </div>
);

const ConfirmButton = ({ processing }: { processing: boolean }) => (
  <Button
    className="w-full"
    disabled={processing}
    data-test="confirm-password-button"
  >
    <ConfirmButtonContent processing={processing} />
  </Button>
);

const ConfirmButtonContent = ({ processing }: { processing: boolean }) => (
  <span className="inline-flex items-center gap-2">
    {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
    <span>Confirm password</span>
  </span>
);
