import './styles.css';

export const SearchInput = ({searchValue, onChange}) => {
  return (
    <input
    className='searchInput'
    onChange={onChange}
    value={searchValue}
    type="search"
    placeholder='Search any post'
    />
  )
}