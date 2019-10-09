import React, { useState } from 'react'
import SuccessfulSubmit from './SuccessfulSubmit'
import GratefulInputItems from './GratefulInputItems'

function GratefulForm(props) {
    const [inputs, setInputs] = useState(Array.from({ length: props.items }, () => ""))
    const [saveEnabled, setSaveEnabled] = useState(false)
    const [nextEnabled, setNextEnabled] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [activeIndex, setActiveInput] = useState(0)

    function inputChangedHandler(event, index) {
        const newInputs = inputs.map((input, currentIndex) => {
            if (index !== currentIndex) return input;
            return event.target.value
        });
        if (event.target.value) setNextEnabled(true)
        if (nextEnabled && index === inputs.length - 1) {
            setSaveEnabled(true)
        }
        setInputs(newInputs)
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        setCompleted(true)
    }

    const handleInputKeyPress = (index) => event => {
        if (event.key === 'Enter') {

            if (index < inputs.length) {
                setActiveInput(activeIndex + 1)
            }

            event.preventDefault()
        }
    }

    const handleNextButton = (event) => {
        if (activeIndex < inputs.length) {
            setActiveInput(activeIndex + 1)
            setNextEnabled(false)
        }
    }

    return (
        <div>
            {
                (!completed) ?
                    <form onSubmit={handleFormSubmit}>
                        {inputs && inputs.map((input, index) => (
                            <GratefulInputItems
                                index={index}
                                key={index}
                                item={input}
                                active={activeIndex}
                                onChange={inputChangedHandler}
                                onKeyPress={handleInputKeyPress} />
                        ))}
                        {
                            (saveEnabled) ?
                                <p className="form-group">
                                    <button className="btn btn--primary" type="submit">Next</button>
                                </p>
                                :
                                <p className="form-group">
                                    <button className="btn btn--secondary" disabled={!nextEnabled} type="button" onClick={handleNextButton} >Next</button>
                                </p>
                        }


                    </form>
                    :
                    <SuccessfulSubmit onComplete={() => props.onComplete(inputs)} items={inputs} />
            }
        </div>
    )

}

export default GratefulForm
