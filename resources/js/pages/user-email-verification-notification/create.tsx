import { Form, Head } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

import UserEmailVerificationNotificationController from "@/actions/App/Http/Controllers/UserEmailVerificationNotificationController";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";
import { logout } from "@/routes";

interface VerifyEmailProps {
  status?: string;
}

const VerifyEmail = ({ status }: VerifyEmailProps) => (
  <AuthLayout
    title="Verify email"
    description="Please verify your email address by clicking on the link we just emailed to you."
  >
    <Head title="Email verification" />
    <VerifyEmailBody status={status} />
  </AuthLayout>
);
export default VerifyEmail;

const VerifyEmailBody = ({ status }: VerifyEmailProps) => (
  <div className="space-y-6">
    <VerificationStatus status={status} />
    <ResendForm />
  </div>
);

const VerificationStatus = ({ status }: VerifyEmailProps) =>
  status === "verification-link-sent" ? (
    <div className="mb-4 text-center text-sm font-medium text-green-600">
      A new verification link has been sent to the email address you provided
      during registration.
    </div>
  ) : null;

const ResendForm = () => (
  <Form
    {...UserEmailVerificationNotificationController.store.form()}
    className="space-y-6 text-center"
  >
    {({ processing }) => <ResendFormContent processing={processing} />}
  </Form>
);

const ResendFormContent = ({ processing }: { processing: boolean }) => (
  <>
    <ResendButton processing={processing} />
    <LogoutLink />
  </>
);

const ResendButton = ({ processing }: { processing: boolean }) => (
  <Button disabled={processing} variant="secondary">
    <ResendButtonContent processing={processing} />
  </Button>
);

const ResendButtonContent = ({ processing }: { processing: boolean }) => (
  <span className="inline-flex items-center gap-2">
    {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
    <span>Resend verification email</span>
  </span>
);

const LogoutLink = () => (
  <TextLink href={logout()} className="mx-auto block text-sm">
    Log out
  </TextLink>
);
