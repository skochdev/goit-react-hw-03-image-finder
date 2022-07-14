import styles from './Loader.module.css';

import { FaReact } from 'react-icons/fa';

export default function Loader() {
  return (
    <FaReact
      className={styles.spinner}
      size={80}
      color="rgb(0, 255, 255, 0.5)"
    />
  );
}
