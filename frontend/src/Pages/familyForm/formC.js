import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../services/axiosInstance";
import 'react-datepicker/dist/react-datepicker.css'; // Import styles
import { useDispatch, useSelector } from "react-redux";
import { clearform } from "../../redux/reducers/stepperHandleSlice";
import { backfromthirdstep } from "../../redux/reducers/stepperHandleSlice";
const FormC = () => {
  const navigate = useNavigate()
  const newData = useSelector((state) => state.stepperformhander);
  const dispatch = useDispatch()

  const handleClick=()=>{
    dispatch(backfromthirdstep())
  }

  const formik2 = useFormik({
    initialValues: {
      covidstatus: "",
      vaccinestatus: "",
      quarantine: "",
      infectedDays: "",
    },
    validationSchema: Yup.object({
      covidstatus: Yup.string().required("Required"),
      vaccinestatus: Yup.string().required("Required"),
      quarantine: Yup.string().required("Required"),
      infectedDays: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      //Getting user from localstorage
      const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const email = user.email;
       
      const formData = {
        groupName: newData.group,
        email: email,
        members:[{
          fullName: newData.fullname,
          address: newData.address,
          phone: newData.phone,
          gender: newData.gender,
          dob: newData.dob,
          covidStatus:values.covidstatus,
          vaccineStatus:values.vaccinestatus,
          quarantine: values.quarantine,
          infectedDays:values.infectedDays,
        }]
      }
      try{
        const response2 = await axiosInstance.post("/families/create",formData)
      if(response2){
     
      dispatch(clearform())
      navigate('/')
    }
  }catch(err){
    console.log(err)
  }     
  
     
    },

  });

  return (
    <>
    <Formik
      initialValues={formik2.initialValues}
      validationSchema={formik2.validationSchema}
      >
      <form onSubmit={formik2.handleSubmit}>
        <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
          <VStack spacing={2} align="flex-start">
            <Heading color="var(--chakra-colors-blue-500);">
              Health Status
            </Heading>
          </VStack>
          <SimpleGrid style={{ width: 1200 }} columns={2} columnGap={3} rowGap={3}>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={formik2.errors.lastname && formik2.touched.lastname}
              >
                <FormLabel>Covid Status</FormLabel>
                <Field
                  as={Select}
                  name="covidstatus"
                  value={formik2.values.covidstatus}
                  onChange={formik2.handleChange}
                >
                  <option>Select</option>
                  <option> Positive</option>
                  <option> Negative</option>
                </Field>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={
                  formik2.errors.vaccinestatus && formik2.touched.vaccinestatus
                }
              >
                <FormLabel>Vaccine Status</FormLabel>
                <Field
                  as={Select}
                  name="vaccinestatus"
                  value={formik2.values.vaccinestatus}
                  onChange={formik2.handleChange}
                  >
                  <option>Select</option>
                  <option> Positive</option>
                  <option> Negative</option>
                </Field>
              </FormControl>
            </GridItem>

            <FormControl
              isInvalid={
                formik2.errors.quarantine && formik2.touched.quarantine
              }
            >
              <FormLabel alignSelf="flex-start">
                Quarantine for 15 days if covid infected
              </FormLabel>
              <Field
                as={Select}
                name="quarantine"
                value={formik2.values.quarantine}
                onChange={formik2.handleChange}
                >
                <option>Select</option>
                <option> Yes</option>
                <option> No</option>
              </Field>
            </FormControl>


            <FormControl
              isInvalid={formik2.errors.infectedDays && formik2.touched.infectedDays}
              >
              <FormLabel>Infected Days</FormLabel>
              <Field
                as={Input}
                name="infectedDays"
                placeholder="Select Date and Time"
                size="md"
                type="date"
                onChange={formik2.handleChange}
                value={formik2.values.dob}
                
                />
              <FormErrorMessage>{formik2.errors.dob}</FormErrorMessage>
            </FormControl>
                </SimpleGrid>
                <div style={{ display:"flex",justifyContent:"space-between",width:"13vw" }}>

               
                <div>

                <Button onClick={handleClick} colorScheme="blue">
                  Back
                </Button>
                </div>
                <Button type="submit" colorScheme="blue">
                  Submit
                </Button>
                </div>
              </VStack>
            </form>
          </Formik>
                </>
  );
};

export default FormC;
