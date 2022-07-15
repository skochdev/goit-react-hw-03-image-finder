import style from './Button.module.css';

type Props = {
  loadMoreHandler: () => void;
};

export default function Button({ loadMoreHandler }: Props) {
  return (
    <button className={style.Button} type="button" onClick={loadMoreHandler}>
      Load More
    </button>
  );
}
