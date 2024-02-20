import './styles.css';

export const PostButton = ({ text, onClick, disabled }) => {
  return (
    <button
    className='postButton'
    disabled={disabled}
    onClick={onClick}
    >
      {text}
    </button>
  )
}