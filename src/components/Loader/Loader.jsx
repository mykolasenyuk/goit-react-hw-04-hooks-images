import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import s from './LoaderSpiner.module.css';

export default function LoaderSpiner() {
  return (
    <div className={s.Loader}>
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={120}
        width={120}
        timeout={3000}
      />
    </div>
  );
}
