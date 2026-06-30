'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Modal, Field, TextInput, TextArea, SelectInput, ModalActions } from './modal';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Generic create-record modal                                          */
/* Builds a form from a field schema and reports values back via onSubmit */
/* ------------------------------------------------------------------ */
export type FieldDef =
  | {
      key: string;
      label: string;
      type: 'text' | 'email' | 'number' | 'url' | 'tel' | 'textarea';
      placeholder?: string;
      required?: boolean;
      defaultValue?: string;
      autoFocus?: boolean;
      hint?: string;
      span?: 1 | 2;
    }
  | {
      key: string;
      label: string;
      type: 'select';
      options: { value: string; label: string }[];
      defaultValue?: string;
      required?: boolean;
      hint?: string;
      span?: 1 | 2;
    };

export interface CreateRecordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  fields: FieldDef[];
  submitLabel?: string;
  successTitle: string;
  successDescription: (values: Record<string, string>) => string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CreateRecordModal({
  open,
  onOpenChange,
  title,
  description,
  icon,
  fields,
  submitLabel = 'Save',
  successTitle,
  successDescription,
  size = 'lg',
}: CreateRecordModalProps) {
  const { toast } = useToast();
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      const initial: Record<string, string> = {};
      for (const f of fields) {
        initial[f.key] = f.defaultValue ?? '';
      }
      setValues(initial);
      setSaving(false);
    }
  }, [open, fields]);

  function setField(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function handleSave() {
    const missing = fields.filter((f) => f.required && !values[f.key]?.trim());
    if (missing.length > 0) {
      toast({
        title: 'Required fields missing',
        description: `${missing.map((m) => m.label).join(', ')} ${missing.length === 1 ? 'is' : 'are'} required.`,
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onOpenChange(false);
      toast({
        title: successTitle,
        description: successDescription(values),
      });
    }, 600);
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      icon={icon}
      size={size}
      footer={
        <ModalActions
          onCancel={() => onOpenChange(false)}
          onConfirm={handleSave}
          confirmLabel={submitLabel}
          loading={saving}
        />
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const span = f.span === 2 ? 'sm:col-span-2' : '';
          return (
            <Field
              key={f.key}
              label={f.label}
              required={f.required}
              hint={f.hint}
              className={span}
            >
              {f.type === 'textarea' ? (
                <TextArea
                  value={values[f.key] ?? ''}
                  onChange={(v) => setField(f.key, v)}
                  placeholder={f.placeholder}
                />
              ) : f.type === 'select' ? (
                <SelectInput
                  value={values[f.key] ?? f.defaultValue ?? ''}
                  onChange={(v) => setField(f.key, v)}
                  options={f.options}
                />
              ) : (
                <TextInput
                  value={values[f.key] ?? ''}
                  onChange={(v) => setField(f.key, v)}
                  type={f.type}
                  placeholder={f.placeholder}
                  autoFocus={f.autoFocus}
                />
              )}
            </Field>
          );
        })}
      </div>
    </Modal>
  );
}
