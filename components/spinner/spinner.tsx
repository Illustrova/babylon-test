import styles from './spinner.module.css';

export type SpinnerProps = {
  size: string;
}


export const Spinner = ({ size }: SpinnerProps) => <div style={{width: size, height: size}}> <span className={styles.loader}></span></div>;
