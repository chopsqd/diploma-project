import React, {useState} from 'react'

export const useForm = (callback: Function, initialState = {}) => {
    const [formValues, setFormValues] = useState(initialState)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        callback()
    }

    return {
        onChange,
        onSubmit,
        formValues
    }
}