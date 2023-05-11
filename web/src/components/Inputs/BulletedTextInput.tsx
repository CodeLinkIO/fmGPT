import TextArea from '@components/core/TextArea';
import { BULLET_POINT, LINE_TEXT_BULLET } from '@constants/character';
import React, { FC, useEffect, useRef, useState } from 'react';

type ModeTextInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
};

const BulletedTextInput: FC<ModeTextInputProps> = ({
  value,
  onChange,
  label = '',
  className = '',
}) => {
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    if (newValue.length < value.length) {
      onChange(newValue);
      return;
    }

    const bulletedValue = newValue
      .split('\n')
      .map((lineText) => {
        if (lineText[0] === BULLET_POINT) {
          return lineText;
        }

        return `${LINE_TEXT_BULLET}${lineText}`;
      })
      .join('\n');
    onChange(bulletedValue);
    const selectionStart = event.currentTarget.selectionStart;
    if (selectionStart === 1 || bulletedValue[selectionStart - 1] === '\n') {
      setCursor(selectionStart + LINE_TEXT_BULLET.length);
    } else {
      setCursor(selectionStart);
    }
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [inputRef, cursor]);

  return (
    <TextArea
      rows={6}
      label={label}
      inputRef={inputRef}
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
};

export default BulletedTextInput;
