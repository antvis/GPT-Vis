'use client';

import * as Primitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface SelectOption {
  label: ReactNode;
  value: string;
}
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Choose an option',
  disabled,
  className,
  'aria-label': label,
}: SelectProps) {
  return (
    <Primitive.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Primitive.Trigger
        className={cn('site-select-trigger', className)}
        aria-label={label ?? placeholder}
      >
        <Primitive.Value placeholder={placeholder} />
        <Primitive.Icon>
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </Primitive.Icon>
      </Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          className="site-select-content"
          position="popper"
          sideOffset={6}
          collisionPadding={12}
        >
          <Primitive.ScrollUpButton className="site-select-scroll">
            <ChevronUp className="size-4" />
          </Primitive.ScrollUpButton>
          <Primitive.Viewport className="site-select-viewport">
            {options.map((option) => (
              <Primitive.Item className="site-select-item" key={option.value} value={option.value}>
                <Primitive.ItemText>{option.label}</Primitive.ItemText>
                <Primitive.ItemIndicator>
                  <Check className="size-3.5" aria-hidden="true" />
                </Primitive.ItemIndicator>
              </Primitive.Item>
            ))}
          </Primitive.Viewport>
          <Primitive.ScrollDownButton className="site-select-scroll">
            <ChevronDown className="size-4" />
          </Primitive.ScrollDownButton>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
