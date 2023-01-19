
import {
  forwardRef, MouseEvent, useCallback,
} from 'react';
import { clsx } from "clsx"


import styles from './button.module.css';
import { Spinner } from "../spinner";

export type ButtonProps = {
  /**
   * Set the style of the button.
   * When `disabled` this property is overwritten.
   */
  variant?: 'primary' | 'secondary' | 'flat';
  /**
   * Set the size of the button.
   */
  size?: 'regular' | 'small' | 'big';
  /**
  /**
   * Set disabled state. The button is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Pass the HTML attribute `type` to the button.
   * If not specified, the type is always 'button' when rendered as `<button>.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * Set the loading state and show a spinner.
   */
  loading?: boolean;
  /**
   * Callback function to be called when the button is pressed.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

  children?: React.ReactNode,

  as?: React.ElementType;
}

export const Button = forwardRef<React.ElementRef<'button'>, ButtonProps>((
  {
    variant = 'primary',
    size = "regular",
    children,
    disabled,
    onClick,
    loading,
    type = "button",
    as: Wrapper = 'button',
    ...otherProps
  }, forwardedRef,
) => {
  const handleClick = useCallback(
    () => (event: any) => {
      if (!disabled && onClick) onClick(event);
      if (disabled) event.preventDefault();
    },
    [disabled, onClick],
  );

  return (
    <Wrapper
      ref={forwardedRef}
      type={Wrapper === 'button' ? type : undefined}
      className={clsx(styles.button, styles[variant], styles[size], loading && styles.loading)}
      aria-disabled={disabled}
      aria-busy={loading}
      aria-live={loading ? 'polite' : undefined}
      onClick={handleClick()}
      {...otherProps}
    >
      <span className={styles.contentArea}>{children}</span>
      {loading && (
        <span className={styles.spinnerArea}>
          <Spinner size="1.5em" />
        </span>
      )}
    </Wrapper>
  );
});