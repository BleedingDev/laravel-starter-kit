import { Form, Head } from "@inertiajs/react";

import UserController from "@/actions/App/Http/Controllers/UserController";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import AuthLayout from "@/layouts/auth-layout";
import { login } from "@/routes";

interface RegisterFieldsProps {
  errors: Record<string, string | undefined>;
  processing: boolean;
}

const Register = () => (
  <AuthLayout
    title="Create an account"
    description="Enter your details below to create your account"
  >
    <Head title="Register" />
    <Form
      {...UserController.store.form()}
      resetOnSuccess={["password", "password_confirmation"]}
      disableWhileProcessing
      className="flex flex-col gap-6"
    >
      {({ processing, errors }) => (
        <RegisterFields errors={errors} processing={processing} />
      )}
    </Form>
  </AuthLayout>
);
export default Register;

const RegisterFields = ({ errors, processing }: RegisterFieldsProps) => (
  <>
    <div className="grid gap-6">
      <RegisterField
        id="name"
        label="Name"
        type="text"
        autoComplete="name"
        name="name"
        placeholder="Full name"
        autoFocus
        errorMessage={errors.name}
        errorClassName="mt-2"
      />
      <RegisterField
        id="email"
        label="Email address"
        type="email"
        autoComplete="email"
        name="email"
        placeholder="email@example.com"
        errorMessage={errors.email}
      />
      <RegisterField
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        name="password"
        placeholder="Password"
        errorMessage={errors.password}
      />
      <RegisterField
        id="password_confirmation"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        name="password_confirmation"
        placeholder="Confirm password"
        errorMessage={errors.password_confirmation}
      />
      <RegisterSubmitButton processing={processing} />
    </div>
    <RegisterFooter />
  </>
);

interface RegisterFieldProps {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  name: string;
  placeholder: string;
  autoFocus?: boolean;
  errorMessage?: string;
  errorClassName?: string;
}

const RegisterField = ({
  id,
  label,
  type,
  autoComplete,
  name,
  placeholder,
  autoFocus,
  errorMessage,
  errorClassName,
}: RegisterFieldProps) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      required
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      name={name}
      placeholder={placeholder}
    />
    <InputError message={errorMessage} className={errorClassName} />
  </div>
);

const RegisterSubmitButton = ({ processing }: { processing: boolean }) => (
  <Button
    type="submit"
    className="mt-2 w-full"
    data-test="register-user-button"
  >
    {processing && <Spinner />}
    Create account
  </Button>
);

const RegisterFooter = () => (
  <div className="text-center text-sm text-muted-foreground">
    Already have an account? <TextLink href={login()}>Log in</TextLink>
  </div>
);
