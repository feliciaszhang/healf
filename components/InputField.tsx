import {
    ComponentWithAs,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
  } from "@chakra-ui/react";
  import React, { InputHTMLAttributes } from "react";
  import { useField } from "formik";
  
  type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean
  };
  
  export const InputField: React.FC<InputFieldProps> = (props) => {
    let InputOrTextarea: ComponentWithAs<any, any> = Input
    if (props.textarea) {
      InputOrTextarea = Textarea
    }
    const [field, { error }] = useField(props);
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <InputOrTextarea
          {...field}
          id={field.name}
          placehold={props.placeholder}
          type={props.type}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  };
  