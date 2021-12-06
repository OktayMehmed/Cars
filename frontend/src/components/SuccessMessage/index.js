import './styles.css';

const SuccessMessage = ({children}) => {
  return (
    <span className='success-message'>
      {children}
    </span>
  )
}
export default SuccessMessage
