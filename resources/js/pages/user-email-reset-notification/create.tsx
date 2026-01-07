import { Form, Head } from "@inertiajs/react";

import UserEmailResetNotification from "@/actions/App/Http/Controllers/UserEmailResetNotification";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import AuthLayout from "@/layouts/auth-layout";
import { login } from "@/routes";

interface ForgotPasswordProps {
  status?: string;
}

interface ResetRequestFieldsProps {
  errors: Record<string, string | undefined>;
  processing: boolean;
}

const ForgotPassword = ({ status }: ForgotPasswordProps) => (
  <AuthLayout
    title="Forgot password"
    description="Enter your email to receive a password reset link"
  >
    <Head title="Forgot password" />
    <ForgotPasswordBody status={status} />
  </AuthLayout>
);
export default ForgotPassword;

const ForgotPasswordBody = ({ status }: ForgotPasswordProps) => (
  <div className="space-y-6">
    <StatusMessage status={status} />
    <ResetForm />
    <ReturnToLogin />
  </div>
);

const StatusMessage = ({ status }: ForgotPasswordProps) =>
  status ? (
    <div className="mb-4 text-center text-sm font-medium text-green-600">
      {status}
    </div>
  ) : null;

const ResetForm = () => (
  <Form {...UserEmailResetNotification.store.form()}>
    {({ processing, errors }) => (
      <ResetRequestFields errors={errors} processing={processing} />
    )}
  </Form>
);

const ResetRequestFields = ({
  errors,
  processing,
}: ResetRequestFieldsProps) => (
  <>
    <EmailField error={errors.email} />
    <SubmitButtonRow processing={processing} />
  </>
);

const EmailField = ({ error }: { error?: string }) => (
  <div className="grid gap-2">
    <Label htmlFor="email">Email address</Label>
    <Input
      id="email"
      type="email"
      name="email"
      autoComplete="off"
      autoFocus
      placeholder="email@example.com"
    />
    <InputError message={error} />
  </div>
);

const SubmitButtonRow = ({ processing }: { processing: boolean }) => (
  <div className="my-6 flex items-center justify-start">
    <SubmitButton processing={processing} />
  </div>
);

const SubmitButton = ({ processing }: { processing: boolean }) => (
  <Button
    className="w-full"
    disabled={processing}
    data-test="email-password-reset-link-button"
  >
    <SubmitButtonContent processing={processing} />
  </Button>
);

const SubmitButtonContent = ({ processing }: { processing: boolean }) => (
  <span className="inline-flex items-center gap-2">
    {processing ? <Spinner /> : null}
    <span>Email password reset link</span>
  </span>
);

const ReturnToLogin = () => (
  <div className="space-x-1 text-center text-sm text-muted-foreground">
    <span>Or, return to</span>
    <TextLink href={login()}>log in</TextLink>
  </div>
);
