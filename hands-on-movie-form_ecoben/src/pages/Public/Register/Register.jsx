import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    contactNo: '',
    email: '',
    password: ''
  });
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [debounceState, setDebounceState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const userInputDebounce = useDebounce(formData, 2000);
  const navigate = useNavigate();

  const refs = {
    firstName: useRef(),
    middleName: useRef(),
    lastName: useRef(),
    contactNo: useRef(),
    email: useRef(),
    password: useRef()
  };

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setDebounceState(false);
    setIsFieldsDirty(true);
    setModalMessage('');
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.firstName) errors.push('First Name is required.');
    if (!formData.lastName) errors.push('Last Name is required.');
    if (!formData.contactNo) errors.push('Contact Number is required.');
    if (!formData.email) errors.push('Email is required.');
    if (!formData.password) errors.push('Password is required.');
    if (formData.password.length < 6) errors.push('Password must be at least 6 characters long.');

    return errors;
  };

  const handleRegister = async () => {
    setStatus('loading');
    setModalMessage('');

    try {
      const response = await axios.post('/admin/register', formData, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
      setModalMessage('User successfully created!');
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      if (errorMessage.includes('Duplicate entry')) {
        setModalMessage('Email already registered.');
      } else {
        setModalMessage(errorMessage);
      }
    } finally {
      setStatus('idle');
      setModalOpen(true);
    }
  };

  const handleSubmit = () => {
    if (status === 'loading') return;

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setModalMessage(validationErrors.join(' '));
      setModalOpen(true);
      return;
    }

    handleRegister();
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            {['firstName', 'middleName', 'lastName', 'contactNo', 'email', 'password'].map((field, index) => (
              <div key={index} className='form-group'>
                <label>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                </label>
                <input
                  type={field === 'password' && !isShowPassword ? 'password' : 'text'}
                  name={field}
                  ref={refs[field]}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
                {debounceState && isFieldsDirty && formData[field] === '' && (
                  <span className='errors'>This field is required</span>
                )}
              </div>
            ))}

            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='submit-container'>
              <button type='button' disabled={status === 'loading'} onClick={handleSubmit}>
                {status === 'idle' ? 'Register' : 'Loading...'}
              </button>
            </div>

            <div className='login-container'>
              <a href='/'>
                <small>Back to Login</small>
              </a>
            </div>
          </div>
        </form>

        {modalOpen && (
          <div className='modal-overlay'>
            <div className='modal-content'>
              <h4>{modalMessage}</h4>
              <span className='close-modal' onClick={() => setModalOpen(false)}>×</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: relative; /* Added to position the close button */
        }

        .close-modal {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          font-size: 20px; /* Adjust size for visibility */
        }
      `}</style>
    </div>
  );
}

export default Register;
