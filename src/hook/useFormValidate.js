import { useState } from "react";

export const useFormValidate = (formValues = {},formValidations) => {

    const [formValidate, setFormValidate] = useState({})

    const onFormValidate = () =>{

        const formErrorMessage = {}

        for (const formField of Object.keys( formValidations )) {

            const [ fn, errorMessage ] = formValidations[formField];

            formErrorMessage[`${ formField }Message`] = fn( formValues[formField] ) ? null : errorMessage;

        }

        setFormValidate(formErrorMessage);

    }

    return {
        ...formValidate,
        onFormValidate
    } 

}