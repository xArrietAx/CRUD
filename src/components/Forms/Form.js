import { useRef } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const Form = ({ submit, onClose, buttonText, loading, data }) => {
  const initialRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function Submit(data) {
    submit(data);
    reset();
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(Submit)} noValidate>
      {" "}
      <FormControl isInvalid={errors.name}>
        {" "}
        <FormLabel>Name</FormLabel>{" "}
        <Input
        defaultValue={data?.name}
          ref={initialRef}
          placeholder="Ejem: Andrés"
          {...register("name", {
            required: "The name is required",
            minLength: {
              value: 3,
              message: "The min length is 3 characters",
            },
            maxLength: {
              value: 30,
              message: "The max length is 30 characters",
            },
            pattern: {
              value: /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/,
              message: "Please provide name valid",
            },
          })}
        />{" "}
        <FormErrorMessage>
          {" "}
          {errors.name && errors.name.message}{" "}
        </FormErrorMessage>{" "}
      </FormControl>{" "}
      <FormControl mt={4} isInvalid={errors.surname}>
        {" "}
        <FormLabel>Surname</FormLabel>{" "}
        <Input 
        defaultValue={data?.surname}
          placeholder="Ejem: Arrieta"
          {...register("surname", {
            required: "The surname is required",
            minLength: {
              value: 3,
              message: "The min length is 3 characters",
            },
            maxLength: {
              value: 30,
              message: "The max length is 30 characters",
            },
            pattern: {
              value: /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/,
              message: "Please provide name valid",
            },
          })}
        />{" "}
        <FormErrorMessage>
          {" "}
          {errors.surname && errors.surname.message}{" "}
        </FormErrorMessage>{" "}
      </FormControl>{" "}
      <FormControl mt={4} isInvalid={errors.department}>
        {" "}
        <FormLabel>department</FormLabel>{" "}
        <Input
        defaultValue={data?.department}
          placeholder="Ejem: cleaning"
          {...register("department", {
            required: "The department is required",
            minLength: {
              value: 3,
              message: "The min length is 3 characters",
            },
            maxLength: {
              value: 30,
              message: "The max length is 30 characters",
            },
            pattern: {
              value: /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/,
              message: "Please provide a valid department name",
            },
          })}
        />{" "}
        <FormErrorMessage>
          {" "}
          {errors.department && errors.department.message}{" "}
        </FormErrorMessage>{" "}
      </FormControl>{" "}


      <FormControl mt={4} isInvalid={errors.salary}>
        {" "}
        <FormLabel>Salary</FormLabel>{" "}
        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />
          <Input
          defaultValue={data?.salary}
            placeholder="Ejem: 3000"
            {...register("salary", {
              required: "The salary is required",
              pattern: {
                value: /^[\d+-]+$/,
                message: "Pleaser provide a valid salary",
              },
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {" "}
          {errors.salary && errors.salary.message}{" "}
        </FormErrorMessage>{" "}
      </FormControl>{" "}


      
      <FormControl mt={4} isInvalid={errors.phone}>
        {" "}
        <FormLabel>Phone</FormLabel>{" "}
        <Input
        defaultValue={data?.phone}
          placeholder="Ejem: 4354-3265"
          {...register("phone", {
            required: "The phone is required",
            maxLength: {
              value: 20,
              message: "The max length is 20 digits",
            },
            pattern: {
              value: /^[\d+-]+$/,
              message: "Pleaser provide a valid phone",
            },
          })}
        />{" "}
        <FormErrorMessage>
          {" "}
          {errors.phone && errors.phone.message}{" "}
        </FormErrorMessage>{" "}
      </FormControl>{" "}
      <Flex justifyContent={"end"} mt={5} mb={3}>
        <Button colorScheme="green" isLoading={loading} type="submit" px={10}>
          {buttonText}
        </Button>
      </Flex>
    </form>
  );
};
