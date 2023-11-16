import {
  OverlayCentered,
  OverlayLeft,
  OverlayRight,
  SignIn,
  SignUp,
  StyledLinkWrapp,
  StyledWrapper,
} from "./Welcome.styled";

const Welcome = () => {
  return (
    <StyledWrapper>
      <h1>Welcome to the app!</h1>
      <p>
        This app offers more than just a collection of recipes - it is designed
        to be your very own digital cookbook. You can easily save and retrieve
        your own recipes at any time.
      </p>
      <StyledLinkWrapp>
        <SignUp to="/signup">Sign Up</SignUp>
        <SignIn to="/signin">Sign In</SignIn>
      </StyledLinkWrapp>

      <OverlayCentered />
      <OverlayLeft />
      <OverlayRight />
    </StyledWrapper>
  );
};

export default Welcome;
