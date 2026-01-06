import { Form, Head } from "@inertiajs/react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useMemo, useState } from "react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OTP_MAX_LENGTH } from "@/hooks/use-two-factor-auth";
import AuthLayout from "@/layouts/auth-layout";
import { store } from "@/routes/two-factor/login";

const otpSlotKeys = Array.from(
  { length: OTP_MAX_LENGTH },
  (_, index) => `otp-slot-${index + 1}`
);

interface AuthFormContainerProps {
  showRecoveryInput: boolean;
  code: string;
  onCodeChange: (value: string) => void;
  onToggleRecovery: (clearErrors: () => void) => void;
  toggleText: string;
}

interface AuthFormContentProps extends AuthFormContainerProps {
  errors: Record<string, string | undefined>;
  processing: boolean;
  clearErrors: () => void;
}

const Show = () => {
  const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const authConfigContent = useMemo<{
    title: string;
    description: string;
    toggleText: string;
  }>(() => {
    if (showRecoveryInput) {
      return {
        description:
          "Please confirm access to your account by entering one of your emergency recovery codes.",
        title: "Recovery Code",
        toggleText: "login using an authentication code",
      };
    }

    return {
      description:
        "Enter the authentication code provided by your authenticator application.",
      title: "Authentication Code",
      toggleText: "login using a recovery code",
    };
  }, [showRecoveryInput]);

  const toggleRecoveryMode = (clearErrors: () => void): void => {
    setShowRecoveryInput((value) => !value);
    clearErrors();
    setCode("");
  };

  return (
    <AuthLayout
      title={authConfigContent.title}
      description={authConfigContent.description}
    >
      <Head title="Two-Factor Authentication" />
      <AuthFormContainer
        showRecoveryInput={showRecoveryInput}
        code={code}
        onCodeChange={setCode}
        onToggleRecovery={toggleRecoveryMode}
        toggleText={authConfigContent.toggleText}
      />
    </AuthLayout>
  );
};
export default Show;

const AuthFormContainer = ({
  showRecoveryInput,
  code,
  onCodeChange,
  onToggleRecovery,
  toggleText,
}: AuthFormContainerProps) => (
  <div className="space-y-6">
    <Form
      {...store.form()}
      className="space-y-4"
      resetOnError
      resetOnSuccess={!showRecoveryInput}
    >
      {({ errors, processing, clearErrors }) => (
        <AuthFormContent
          showRecoveryInput={showRecoveryInput}
          code={code}
          onCodeChange={onCodeChange}
          onToggleRecovery={onToggleRecovery}
          toggleText={toggleText}
          errors={errors}
          processing={processing}
          clearErrors={clearErrors}
        />
      )}
    </Form>
  </div>
);

const AuthFormContent = ({
  showRecoveryInput,
  code,
  onCodeChange,
  onToggleRecovery,
  toggleText,
  errors,
  processing,
  clearErrors,
}: AuthFormContentProps) => {
  const handleToggle = () => onToggleRecovery(clearErrors);

  return (
    <div className="space-y-4">
      <AuthFields
        showRecoveryInput={showRecoveryInput}
        code={code}
        onCodeChange={onCodeChange}
        errors={errors}
        processing={processing}
      />
      <SubmitButton processing={processing} />
      <RecoveryToggle toggleText={toggleText} onToggle={handleToggle} />
    </div>
  );
};

const AuthFields = ({
  showRecoveryInput,
  code,
  onCodeChange,
  errors,
  processing,
}: {
  showRecoveryInput: boolean;
  code: string;
  onCodeChange: (value: string) => void;
  errors: Record<string, string | undefined>;
  processing: boolean;
}) =>
  showRecoveryInput ? (
    <RecoveryCodeField error={errors.recovery_code} />
  ) : (
    <AuthenticationCodeField
      code={code}
      onCodeChange={onCodeChange}
      error={errors.code}
      processing={processing}
    />
  );

const RecoveryCodeField = ({ error }: { error?: string }) => (
  <div className="space-y-3">
    <Input
      name="recovery_code"
      type="text"
      placeholder="Enter recovery code"
      autoFocus
      required
    />
    <InputError message={error} />
  </div>
);

const AuthenticationCodeField = ({
  code,
  onCodeChange,
  error,
  processing,
}: {
  code: string;
  onCodeChange: (value: string) => void;
  error?: string;
  processing: boolean;
}) => (
  <div className="flex flex-col items-center justify-center space-y-3 text-center">
    <OtpInput code={code} onCodeChange={onCodeChange} processing={processing} />
    <InputError message={error} />
  </div>
);

const OtpInput = ({
  code,
  onCodeChange,
  processing,
}: {
  code: string;
  onCodeChange: (value: string) => void;
  processing: boolean;
}) => (
  <InputOTP
    name="code"
    maxLength={OTP_MAX_LENGTH}
    value={code}
    onChange={onCodeChange}
    disabled={processing}
    pattern={REGEXP_ONLY_DIGITS}
  >
    <OtpSlots />
  </InputOTP>
);

const OtpSlots = () => (
  <InputOTPGroup>
    {otpSlotKeys.map((slotKey, index) => (
      <InputOTPSlot key={slotKey} index={index} />
    ))}
  </InputOTPGroup>
);

const SubmitButton = ({ processing }: { processing: boolean }) => (
  <Button type="submit" className="w-full" disabled={processing}>
    Continue
  </Button>
);

const RecoveryToggle = ({
  toggleText,
  onToggle,
}: {
  toggleText: string;
  onToggle: () => void;
}) => (
  <div className="text-center text-sm text-muted-foreground">
    <span className="mr-1">or you can</span>
    <button
      type="button"
      className="cursor-pointer text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
      onClick={onToggle}
    >
      {toggleText}
    </button>
  </div>
);
