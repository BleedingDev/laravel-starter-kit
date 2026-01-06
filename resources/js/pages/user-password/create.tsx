import { Form, Head } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useCallback } from "react";

import UserPasswordController from "@/actions/App/Http/Controllers/UserPasswordController";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

interface ResetPasswordProps {
  token: string;
  email: string;
}

const ResetPassword = ({ token, email }: ResetPasswordProps) => {
  const transformData = useCallback(
    (data: Record<string, unknown>) => ({ ...data, email, token }),
    [email, token]
  );

  return (
    <AuthLayout
      title="Reset password"
      description="Please enter your new password below"
    >
      <Head title="Reset password" />

      <Form
        {...UserPasswordController.store.form()}
        transform={transformData}
        resetOnSuccess={["password", "password_confirmation"]}
      >
        {({ processing, errors }) => (
          <ResetPasswordFields
            email={email}
            errors={errors}
            processing={processing}
          />
        )}
      </Form>
    </AuthLayout>
  );
};
export default ResetPassword;

const ResetPasswordFields = ({
  email,
  errors,
  processing,
}: {
  email: string;
  errors: Record<string, string | undefined>;
  processing: boolean;
}) => (
  <div className="grid gap-6">
    <EmailField email={email} error={errors.email} />
    <PasswordField error={errors.password} />
    <PasswordConfirmationField error={errors.password_confirmation} />
    <ResetButton processing={processing} />
  </div>
);

const EmailField = ({ email, error }: { email: string; error?: string }) => (
  <div className="grid gap-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      name="email"
      autoComplete="email"
      value={email}
      className="mt-1 block w-full"
      readOnly
    />
    <InputError message={error} className="mt-2" />
  </div>
);

const PasswordField = ({ error }: { error?: string }) => (
  <div className="grid gap-2">
    <Label htmlFor="password">Password</Label>
    <Input
      id="password"
      type="password"
      name="password"
      autoComplete="new-password"
      className="mt-1 block w-full"
      autoFocus
      placeholder="Password"
    />
    <InputError message={error} />
  </div>
);

const PasswordConfirmationField = ({ error }: { error?: string }) => (
  <div className="grid gap-2">
    <Label htmlFor="password_confirmation">Confirm password</Label>
    <Input
      id="password_confirmation"
      type="password"
      name="password_confirmation"
      autoComplete="new-password"
      className="mt-1 block w-full"
      placeholder="Confirm password"
    />
    <InputError message={error} className="mt-2" />
  </div>
);

const ResetButton = ({ processing }: { processing: boolean }) => (
  <Button
    type="submit"
    className="mt-4 w-full"
    disabled={processing}
    data-test="reset-password-button"
  >
    {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
    Reset password
  </Button>
);
