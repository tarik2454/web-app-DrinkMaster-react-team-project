import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signupThunk } from "../../redux/Auth/operations";
import { selectIsLoading } from "../../redux/Auth/selectors";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";

import {
  DivWrapper,
  StyleGreenSvg,
  StyleRedSvg,
  StyledCalendarSvg,
  StyledDatatimeWrapper,
  StyledDatetime,
} from "./Signup.styled";
import { SpriteSVG } from "../../shared/icons/SpriteSVG";
import {
  InputWrapper,
  SignButton,
  StyledAuthLink,
  StyledForm,
  Wrapper,
} from "../Signin/Signin.styled";
import Subtitle from "../../shared/components/Title/Subtitle";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const formik = useFormik({
    initialValues: {
      username: "",
      birthdate: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Name is required"),
      birthdate: Yup.string()
        .matches(
          // /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
          /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
          "Invalid date format (DD/MM/YYYY)"
        )
        .required("Date of Birth is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less then 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
          "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here

      const credentials = {
        username: values.username,
        birthdate: convertDateFormat(values.birthdate),
        password: values.password,
        email: values.email,
      };
      dispatch(signupThunk(credentials));
    },
  });

  const handleDateChange = (name, value) => {
    // Перевірка, чи value є екземпляром moment
    const formattedDate =
      value instanceof moment ? value.format("YYYY-MM-DD") : value;
    formik.setFieldTouched(name, true, false); // Помітити поле як торкнуте, без валідації
    formik.handleChange({
      target: {
        name,
        value: formattedDate,
      },
    });
  };
  // Конвертує дату з формату фронта DD/MM/YYYY на формат беку YYYY-MM-DD
  const convertDateFormat = (dateStr) => {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to YYYY-MM-DD
    }
    return dateStr; // Return the original string if it's not in expected format
  };

  const datetimeOptions = {
    timeFormat: false,
    closeOnSelect: true,
    isValidDate: (current) => {
      return current.isBefore();
    },
    dayOfWeekFormat: "dd", // Use "dd" to start from Monday
    startOfWeek: 1, // 0 is Sunday, 1 is Monday
  };

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Subtitle Subtitle=" Sign Up" />
      <Wrapper>
        <InputWrapper
          type="text"
          id="username"
          name="username"
          placeholder="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          $isError={formik.touched.username && Boolean(formik.errors.username)}
          $isSuccess={formik.touched.username && !formik.errors.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div style={{ color: "red" }}>{formik.errors.username}</div>
        ) : formik.touched.username && !formik.errors.username ? (
          <div style={{ color: "green" }}>Valid username</div>
        ) : null}
        <StyledDatatimeWrapper>
          <StyledDatetime
            type="date"
            id="birthdate"
            name="birthdate"
            inputProps={{ placeholder: "dd/mm/yyyy" }}
            timeFormat={false}
            onBlur={formik.handleBlur}
            onChange={(value) => handleDateChange("birthdate", value)}
            // onChange={formik.handleChange}
            value={formik.values.birthdate}
            closeOnSelect={true}
            {...datetimeOptions}
          />

          <StyledCalendarSvg>
            <SpriteSVG name={"calendar"} />
          </StyledCalendarSvg>
        </StyledDatatimeWrapper>
        {formik.touched.birthdate && formik.errors.birthdate ? (
          <div style={{ color: "red" }}>{formik.errors.birthdate}</div>
        ) : formik.touched.birthdate && !formik.errors.birthdate ? (
          <div style={{ color: "green" }}>Valid birthdate</div>
        ) : null}
        {/* ================ */}
        <DivWrapper>
          <InputWrapper
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            $isError={formik.touched.email && Boolean(formik.errors.email)}
            $isSuccess={formik.touched.email && !formik.errors.email}
          />
          {/* <AiFillCheckCircle
            style={{
              color: "black",
              backgroundColor: "green",
              borderRadius: "50%",
              position: "absolute",
              right: "0px",
              top: "15px",
              cursor: "pointer",
            }}
          />
          <FaExclamationCircle
            style={{
              color: "black",
              background: "red",
              borderRadius: "50%",
              border: "2px",
              position: "absolute",
              right: "50px",
              top: "15px",
              cursor: "pointer",
            }}
          /> */}
          {formik.touched.email && formik.errors.email ? (
            <StyleRedSvg>
              <SpriteSVG name={"error"} />
            </StyleRedSvg>
          ) : formik.touched.email && !formik.errors.email ? (
            <StyleGreenSvg>
              <SpriteSVG name={"done"} />
            </StyleGreenSvg>
          ) : null}
          {/* ================ */}
        </DivWrapper>
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : formik.touched.email && !formik.errors.email ? (
          <div style={{ color: "green" }}>Valid email</div>
        ) : null}
        <DivWrapper>
          <InputWrapper
            // type="password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            $isError={
              formik.touched.password && Boolean(formik.errors.password)
            }
            $isSuccess={formik.touched.password && !formik.errors.password}
          />
          {/* Eye icon to toggle password visibility */}
          {formik.values.password && ( // Check if the password field has any value
            <div
              style={{
                position: "absolute",
                right: "20px",
                top: "15px",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          )}
        </DivWrapper>
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : formik.touched.password && !formik.errors.password ? (
          <div style={{ color: "green" }}>Valid password</div>
        ) : null}
      </Wrapper>

      <Wrapper>
        <SignButton type="submit" disabled={isLoading}>
          Sign Up
        </SignButton>
        <StyledAuthLink to="/signin">Sign In</StyledAuthLink>
      </Wrapper>
    </StyledForm>
  );
};

export default SignUp;
