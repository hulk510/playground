import { ControllerForm, NativeForm } from '@repo/playground';
import styles from './page.module.css';

export default function Page(): JSX.Element {
  return (
    <div className={styles.flex}>
      <div>
        <h2> this is native only react hook form</h2>
        <NativeForm />
      </div>
      <div>
        <h2> this is controller form</h2>
        <ControllerForm />
      </div>
    </div>
  );
}
