import Form from "next/form";

import { Input } from "./ui/input";

export function AuthForm({
  action,
  children,
  defaultEmail = "",
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <Input
        autoComplete="email"
        autoFocus
        className="bg-muted text-md md:text-sm"
        defaultValue={defaultEmail}
        id="email"
        name="email"
        placeholder="Email Address"
        required
        type="email"
      />

      <Input
        className="bg-muted text-md md:text-sm"
        id="password"
        name="password"
        placeholder="Password"
        required
        type="password"
      />

      {children}
    </Form>
  );
}
