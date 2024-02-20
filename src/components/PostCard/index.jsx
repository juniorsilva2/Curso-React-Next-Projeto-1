import './styles.css';

export const PostCard = (props) => {
  const {title, body, photo} = props;

  return (
    <div className='post'>
      <img src={photo} alt={title} />
      <div className='post-content'>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  )
}