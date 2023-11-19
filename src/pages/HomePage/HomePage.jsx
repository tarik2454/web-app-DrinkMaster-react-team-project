import { useEffect } from "react";
import LigthBtn from "../../shared/components/Buttons/LigthBtn";
import { StyledBtn } from "../../shared/components/Buttons/LigthBtn.styled";
import { StyledTitle } from "../../shared/components/Title/Title.styled";
import { HomeImage, HomeWrapper, MainText } from "./HomePage.styled";
import Image from "./img/Found.png";
import { useNavigate } from "react-router-dom";
import {
  currentUserThunk,
  signupAndSignInThunk,
import { useDispatch } from "react-redux";
import {
  deleteFromOwnThunk,
  getAllDrinksThunk,
  getPopularThunk,
} from "../../redux/Drinks/operations";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddDrinkClick = () => {
    // Redirect the user to the add drink page
    navigate("/add");
  };

  useEffect(() => {
    dispatch(signupAndSignInThunk());
  }, [dispatch]);

  return (
    <HomeWrapper>
      <div>
        <StyledTitle>
          {"Craft Your Perfect Drink with Drink Master"}
        </StyledTitle>
        <MainText>
          Unlock your inner mixologist with Drink Master, your one-stop
          destination for exploring, crafting, and mastering the world's finest
          beverages.
        </MainText>
        <LigthBtn onClick={handleAddDrinkClick}>Add drink</LigthBtn>
      </div>
      <HomeImage src={Image} alt="Coctail's name" />
    </HomeWrapper>
  );
};

export default HomePage;
