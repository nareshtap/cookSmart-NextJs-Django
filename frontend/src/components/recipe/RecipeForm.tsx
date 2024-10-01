"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { addRecipe } from "@/redux/services/recipeService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "@/styles/recipe/RecipeForm.module.css";
import UploadIcon from "@mui/icons-material/Upload";
import redirectToLogin from "@/hoc/redirectToLogin";

const GradientBackground = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  minHeight: "100vh",
  alignItems: "center",
  animation: "gradient 15s ease infinite",
  padding: theme.spacing(6),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(4),
  maxWidth: "600px",
  borderRadius: "10px",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

const FileInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #4caf50",
  borderRadius: "5px",
  padding: "10px",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#fff",
}));

const FileInput = styled("input")({
  display: "none",
});

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: ["", "", ""],
    instructions: [""],
    cuisine_type: "",
    photo_link: "",
    preparation_time: "",
    cooking_time: "",
    yields: "",
    is_vegetarian: false,
  });
  const [fileName, setFileName] = useState("Choose File");
  const [upload, setUpload] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: newInstructions,
    }));
  };

  const addIngredientField = (e) => {
    e.preventDefault();
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ""],
    }));
  };

  const addInstructionField = (e) => {
    e.preventDefault();
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, ""],
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUpload(true);
        toast.success("Image uploading...");
        const uploadResponse = await uploadImageToCloudinary(file);
        setFileName(file.name);
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          photo_link: uploadResponse.secure_url,
        }));
        setUpload(false);
        toast.success("Image uploaded.");
      } catch (error) {
        console.error("Failed to upload image:", error);
        toast.error("Image upload failed. Please try again.");
      }
    } else {
      setFileName("Choose File");
    }
  };

  const validateForm = () => {
    if (!recipe.name) {
      toast.error("Recipe name is required.");
      return false;
    }
    if (recipe.ingredients.length === 0) {
      toast.error("At least one ingredient must be provided.");
      return false;
    }
    if (recipe.instructions.length === 0) {
      toast.error("At least one instruction must be provided.");
      return false;
    }
    if (!recipe.cuisine_type) {
      toast.error("Cuisine type is required.");
      return false;
    }
    if (Number(recipe.yields) > 10) {
      toast.error("Yields must be a less than 10.");
      return false;
    }
    if (!recipe.preparation_time) {
      toast.error("Preparation time must be a selected.");
      return false;
    }
    if (!recipe.cooking_time) {
      toast.error("Cooking time must be selected.");
      return false;
    }
    if (!recipe.photo_link) {
      toast.error("Image is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await dispatch(addRecipe(recipe)).unwrap();
      toast.success("Recipe submitted successfully!");
      router.replace("/home");
    } catch (error) {
      console.error("Failed to submit recipe:", error);
      toast.error("Failed to submit recipe. Please try again.");
    }
  };

  return (
    <GradientBackground>
      <StyledContainer>
        <h3 className={styles.FormTitle}>Add a New Recipe</h3>
        <form onSubmit={handleSubmit}>
          {Object.keys(recipe).map(
            (key) =>
              key !== "cuisine_type" &&
              key !== "yields" &&
              key !== "preparation_time" &&
              key !== "cooking_time" &&
              key !== "ingredients" &&
              key !== "instructions" &&
              key !== "is_vegetarian" &&
              key !== "photo_link" && (
                <TextField
                  key={key}
                  label={key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  name={key}
                  fullWidth
                  margin="normal"
                  value={recipe[key]}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: !!recipe[key] }}
                  className={styles.input}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#66bb6a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#81c784",
                      },
                      "& .MuiFormLabel-root": {
                        color: "#81c784",
                      },
                    },
                  }}
                />
              )
          )}
          <h6 className={styles.subHead}>Ingredients:</h6>
          <Grid container spacing={2}>
            {recipe.ingredients.map((ingredient, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <TextField
                  label={`Ingredient ${index + 1}`}
                  name={`ingredient-${index}`}
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#66bb6a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#81c784",
                      },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <button className={styles.recipeButton} onClick={addIngredientField}>
            Add Ingredient
          </button>

          <h6 className={styles.subHead}>Instructions:</h6>
          {recipe.instructions.map((instruction, index) => (
            <TextField
              key={index}
              label={`Step ${index + 1}`}
              name={`instruction-${index}`}
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              fullWidth
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#66bb6a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#81c784",
                  },
                },
              }}
            />
          ))}
          <button onClick={addInstructionField} className={styles.recipeButton}>
            Add Instruction
          </button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            <FormControl sx={{ width: "49%", marginRight: 1 }}>
              <InputLabel id="cuisine-type-label">Cuisine Type</InputLabel>
              <Select
                labelId="cuisine-type-label"
                name="cuisine_type"
                value={recipe.cuisine_type}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#66bb6a",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#81c784",
                    },
                  },
                }}
              >
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Yields"
              name="yields"
              type="number"
              value={recipe.yields}
              onChange={handleInputChange}
              sx={{
                flex: 1,
                marginLeft: 1,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#66bb6a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#81c784",
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <TextField
              label="Preparation Time (mins)"
              name="preparation_time"
              type="number"
              value={recipe.preparation_time}
              onChange={handleInputChange}
              sx={{
                flex: 1,
                marginRight: 1,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#66bb6a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#81c784",
                  },
                },
              }}
            />

            <TextField
              label="Cooking Time (mins)"
              name="cooking_time"
              type="number"
              value={recipe.cooking_time}
              onChange={handleInputChange}
              sx={{
                flex: 1,
                marginLeft: 1,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#66bb6a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#81c784",
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={recipe.is_vegetarian}
                    onChange={() =>
                      setRecipe({ ...recipe, is_vegetarian: true })
                    }
                    color="success"
                  />
                }
                label="Vegetarian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!recipe.is_vegetarian}
                    onChange={() =>
                      setRecipe({ ...recipe, is_vegetarian: false })
                    }
                    color="success"
                  />
                }
                label="Non-Vegetarian"
              />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                marginLeft: 2,
                borderRadius: "3px",
              }}
            >
              <FileInputContainer>
                <FileInput
                  type="file"
                  accept="image/*"
                  id="photo-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="photo-upload"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Playwrite DE Grund, cursive",
                  }}
                >
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{ color: "green", border: "none" }}
                  >
                    {upload ? <UploadIcon sx={{ marginRight: "8px" }} /> : null}
                    {fileName}
                  </Button>
                </label>
              </FileInputContainer>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{
                width: "300px",
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#66bb6a",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              Submit Recipe
            </Button>
          </Box>
        </form>
      </StyledContainer>
    </GradientBackground>
  );
};

export default redirectToLogin(RecipeForm);
