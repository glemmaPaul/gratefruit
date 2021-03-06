import React, { useState, useEffect } from 'react'
import firebase, { firebaseErrorResponse } from '../../firebase'


function PhoneNumberSuccess(props) {
  return (
    <div>
      Success
    </div>
  )
}

export default function(props) {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [code, setCode] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      window.recaptchaVerifier = window.recaptchaVerifier || new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': console.log
      });
    })

    /**
     * Returns if a phone is valid or not
     * @param {String} phoneNumber Phone number to check
     */
    function isPhoneNumberValid(phoneNumber) {
      var pattern = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
      return pattern.test(phoneNumber)
    }

    async function onSubmitPhone(e) {
        e.preventDefault()

        if (!isPhoneNumberValid(phoneNumber)) {
          return setErrorMessage('Phone number is not valid')
        }

        setErrorMessage('')
        setLoading(true)

        try {
          const result = await firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
          setConfirmationResult(result)
        } catch(e) {
          setErrorMessage(firebaseErrorResponse(e))
        }

        setLoading(false)
    }

    async function onSubmitCode(e) {
      e.preventDefault()
      setLoading(true)

      try {
        const result = await confirmationResult.confirm(code)
        setUser(result.user)
      } catch(e) {
        setErrorMessage(firebaseErrorResponse(e))
      }

      setLoading(false)
    }

    function onResendPhoneNumber(e) {
      setCode(null)
      setConfirmationResult(null)
    }

    return (
      <div>
        {
          (confirmationResult === null) ?
            <form>
                <input
                    type="tel"
                    value={phoneNumber}
                    placeholder="Phone Number"
                    className="form-input fs16 bg-white c-gold mb-"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    /> <span hidden={errorMessage === ''} style={{ "color": "red" }}>{errorMessage}</span>
                <button type="submit" className="btn btn--primary" onClick={onSubmitPhone} disabled={loading} id="sign-in-button">{ loading ? 'Sending..' : 'Send Text' }</button>
            </form>
            :
            <form>
                <p className="c-gold fs20 mb-">{phoneNumber}</p>
                <input type="text"
                    placeholder="Code..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="form-input fs16 bg-white c-gold mb-"
                    />
                <span hidden={errorMessage === ''} style={{ "color": "red" }}>{errorMessage}</span>
                <button type="submit" className="btn btn--primary" disabled={loading} onClick={ onSubmitCode }>{ loading ? 'Loading..' : 'Send Text' }</button>
                <p className="mt- fs12 c-gold">Didn't get the code? <span onClick={ onResendPhoneNumber }>Click here try again.</span></p>

                {
                  (user) && <PhoneNumberSuccess user={user} />
                }
            </form>
        }

        <div id="recaptcha" />
      </div>

    )
}
