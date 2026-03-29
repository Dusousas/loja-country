"use client";

import type { MouseEvent, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: ReactNode;
  pendingLabel: string;
  className?: string;
  confirmMessage?: string;
};

export default function SubmitButton({
  children,
  pendingLabel,
  className,
  confirmMessage,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!confirmMessage || pending) {
      return;
    }

    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={handleClick}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
