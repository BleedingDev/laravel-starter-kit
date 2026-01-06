import type { ReactNode } from "react";

import AuthLayoutTemplate from "@/layouts/auth/auth-simple-layout";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const AuthLayout = ({
  children,
  title,
  description,
  ...props
}: AuthLayoutProps) => (
  <AuthLayoutTemplate title={title} description={description} {...props}>
    {children}
  </AuthLayoutTemplate>
);
export default AuthLayout;
