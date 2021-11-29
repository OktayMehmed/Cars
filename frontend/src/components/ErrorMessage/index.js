import './styles.css';

const ErrorMessage = ({children}) => {
  return (
    <span className='error-message'>
      {children}
    </span>
  )
}
export default ErrorMessage
