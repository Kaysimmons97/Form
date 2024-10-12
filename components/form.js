// form.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import logo from "@/assets/images/logo.jpg";

function MyForm() {
  const { setSubmittedData } = useFormData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmittedData((prevData) => [...prevData, data]);
  };

  return (
    
      <View style={styles.container}>
        <View>
          <Image source={logo} style = {styles.image}/>

        </View>
        <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder="Your Name"
          />
        )}
        name="name"
        defaultValue=""
        rules={{ required: "You must enter your name" }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder="Email"
          />
        )}
        name="email"
        defaultValue=""
        rules={{
          required: "You must enter your email",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Enter a valid email address",
          },
        }}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>  
      <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
 
    </View>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  image:{
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: "80%"
  },
  errorText: {
    color: "red",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  extraSpace: {
    height: 200, 
  },
  button: {
    backgroundColor: "#004f71",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 5,
    width: "50%",
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: {width:5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 2,


  }

});

export default MyForm;
