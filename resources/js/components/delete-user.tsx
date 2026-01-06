import { Form } from "@inertiajs/react";
import { useRef, type RefObject } from "react";

import UserController from "@/actions/App/Http/Controllers/UserController";
import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeleteUserFormProps {
  passwordInput: RefObject<HTMLInputElement | null>;
}

const DeleteUserPasswordField = ({
  passwordInput,
  error,
}: {
  passwordInput: RefObject<HTMLInputElement | null>;
  error?: string;
}) => (
  <div className="grid gap-2">
    <Label htmlFor="password" className="sr-only">
      Password
    </Label>
    <Input
      id="password"
      type="password"
      name="password"
      ref={passwordInput}
      placeholder="Password"
      autoComplete="current-password"
    />
    <InputError message={error} />
  </div>
);

const DeleteUserActions = ({
  processing,
  onCancel,
}: {
  onCancel: () => void;
  processing: boolean;
}) => (
  <DialogFooter className="gap-2">
    <DialogClose asChild>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </DialogClose>

    <Button variant="destructive" disabled={processing} asChild>
      <button type="submit" data-test="confirm-delete-user-button">
        Delete account
      </button>
    </Button>
  </DialogFooter>
);

const DeleteUserForm = ({ passwordInput }: DeleteUserFormProps) => (
  <Form
    {...UserController.destroy.form()}
    options={{
      preserveScroll: true,
    }}
    onError={() => passwordInput.current?.focus()}
    resetOnSuccess
    className="space-y-6"
  >
    {({ resetAndClearErrors, processing, errors }) => (
      <>
        <DeleteUserPasswordField
          passwordInput={passwordInput}
          error={errors.password}
        />
        <DeleteUserActions
          processing={processing}
          onCancel={resetAndClearErrors}
        />
      </>
    )}
  </Form>
);

const DeleteUserDialog = ({
  passwordInput,
}: {
  passwordInput: RefObject<HTMLInputElement | null>;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="destructive" data-test="delete-user-button">
        Delete account
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
      <DialogDescription>
        Once your account is deleted, all of its resources and data will also be
        permanently deleted. Please enter your password to confirm you would
        like to permanently delete your account.
      </DialogDescription>
      <DeleteUserForm passwordInput={passwordInput} />
    </DialogContent>
  </Dialog>
);

const DeleteUser = () => {
  const passwordInput = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Delete account"
        description="Delete your account and all of its resources"
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">
            Please proceed with caution, this cannot be undone.
          </p>
        </div>

        <DeleteUserDialog passwordInput={passwordInput} />
      </div>
    </div>
  );
};
export default DeleteUser;
