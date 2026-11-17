import type { ReactNode } from "react";

interface Props {
  id: string;
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  /** Checkbox renders its own inline label. */
  hideLabel?: boolean;
  children: ReactNode;
}

export function FieldShell({ id, label, required, helpText, error, hideLabel, children }: Props) {
  return (
    <div className={`field${error ? " field--error" : ""}`}>
      {!hideLabel && (
        <label className="field__label" htmlFor={id}>
          {label}
          {required && <span className="field__req" aria-hidden="true"> *</span>}
        </label>
      )}
      {children}
      {helpText && !error && <p className="field__help" id={`${id}-help`}>{helpText}</p>}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, helpText?: string, error?: string): string | undefined =>
  error ? `${id}-error` : helpText ? `${id}-help` : undefined;
