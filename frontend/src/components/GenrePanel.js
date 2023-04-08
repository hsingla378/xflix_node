import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import "./GenrePanel.css";

const initialCategoryVariant = {
  allGenre: "contained",
  education: "text",
  sports: "text",
  comedy: "text",
  lifestyle: "text",
};

const initialCategoryStyles = {
  allGenre: {
    backgroundColor: "white",
    color: "#586069",
    borderRadius: "60px",
    "&:hover": { backgroundColor: "#fff" },
  },
  education: {
    color: "#FFFFFFDE",
  },
  sports: { color: "#FFFFFFDE" },
  comedy: { color: "#FFFFFFDE" },
  lifestyle: { color: "#FFFFFFDE" },
};

//FOR AGE---------------------------------------
const selectedStyle = {
  backgroundColor: "white",
  color: "#586069",
  borderRadius: "60px",
  "&:hover": { backgroundColor: "#fff" },
};

const unSelectedStyle = {
  color: "#FFFFFFDE",
};

const restAgeBoolean = {
  sevenPlus: false,
  twelvePlus: false,
  sixteenPlus: false,
  eighteenPlus: false,
};

//FOR AGE---------------------------------------

export default function GenrePanel({
  selectedGenre,
  setSelectedGenre,
  selectedAgeGroup,
  setAgeGroup,
  sortingMethod,
  setSortingMethod
}) {
  //USESTATES
  const [categoryVariant, setCategoryVariant] = useState(
    initialCategoryVariant
  );
  const [categoryStyle, setCategoryStyle] = useState(initialCategoryStyles);

  const [ageVariant, setAgeVariant] = useState({
    allAgeGroup: "contained",
  });
  const [ageStyle, setAgeStyle] = useState({
    allAgeGroup: "",
  });

  //FOR AGE:-----------
  const [isAllAgeSelected, setAllAgeSelected] = useState(true);
  const [isRestAgeSelected, setRestAgeSelected] = useState(false);
  const [restAgeBoolObj, setRestAgeBoolObj] = useState(restAgeBoolean);

  const handleAgeClick = (e) => {
    if (e.target.id === "allAgeGroup") {
      if (isAllAgeSelected === false && isRestAgeSelected === true) {
        setAllAgeSelected(true);
        setRestAgeSelected(false);

        for (const property in restAgeBoolObj) {
          restAgeBoolObj[property] = false;
        }
        //  console.log(restAgeBoolObj);
        setRestAgeBoolObj(restAgeBoolObj);
        setAgeGroup(e.target.id);
      }
    } else {
      if (isRestAgeSelected === false) {
        let obj = { ...restAgeBoolean };
        obj[e.target.id] = true;
        setRestAgeBoolObj({ ...obj });
        setRestAgeSelected(true);
        setAllAgeSelected(false);
        setAgeGroup(e.target.id);
      } else {
        if (restAgeBoolObj[e.target.id] === false) {
          let obj = { ...restAgeBoolean };
          obj[e.target.id] = true;
          setRestAgeBoolObj({ ...obj });
          setAgeGroup(e.target.id);
        }
        else{
          setRestAgeBoolObj({...restAgeBoolean});
          setAllAgeSelected(true);
          setRestAgeSelected(false);
          setAgeGroup("allAgeGroup");
        }
      }
    }
  };
  //---------------------------------------------------




  //FOR HANDLING SORTING

  const handleSorting = (e) => {
     setSortingMethod(e.target.value)
  }

  // {backgroundColor:"white", color:"black", borderRadius:"60px"}

  //HANDLE CLICK OF GENRE
  let handleClick = (e) => {
    if (e.target.id === "allGenre") {
      categoryVariant.allGenre = "contained";
      categoryVariant.education = "text";
      categoryVariant.sports = "text";
      categoryVariant.comedy = "text";
      categoryVariant.lifestyle = "text";
      categoryStyle.allGenre = {
        backgroundColor: "white",
        color: "#586069",
        borderRadius: "60px",
        "&:hover": { backgroundColor: "#fff" },
      };
      categoryStyle.education = {
        color: "#FFFFFFDE",
      };
      categoryStyle.sports = {
        color: "#FFFFFFDE",
      };
      categoryStyle.comedy = {
        color: "#FFFFFFDE",
      };
      categoryStyle.lifestyle = {
        color: "#FFFFFFDE",
      };
      setCategoryVariant({ ...categoryVariant });
      setCategoryStyle({ ...categoryStyle });
      console.log(categoryStyle);
      setSelectedGenre(["all"]);
    } else {
      let key = e.target.id;
      let value1 = categoryVariant[key] === "text" ? "contained" : "text";
      setCategoryVariant({
        ...categoryVariant,
        [key]: value1,
      });

      setCategoryVariant({
        ...categoryVariant,
        allGenre: "text",
      });

      categoryStyle.allGenre = { color: "#FFFFFFDE" };
      let value2;
      console.log(categoryStyle[key].hasOwnProperty("backgroundColor"));
      if (categoryStyle[key].hasOwnProperty("backgroundColor")) {
        value2 = {
          color: "#FFFFFFDE",
        };
      } else {
        value2 = {
          backgroundColor: "white !important",
          color: "black",
          borderRadius: "60px",
        };
      }

      categoryStyle[key] = value2;
      setCategoryStyle({
        ...categoryStyle,
      });
      console.log(categoryStyle);
      if (selectedGenre.indexOf("all") !== -1) {
        selectedGenre.splice(selectedGenre.indexOf("all"), 1);
      }
      if (selectedGenre.indexOf(e.target.id) === -1) {
        selectedGenre.push(e.target.id);
      } else {
        selectedGenre.splice(selectedGenre.indexOf(e.target.id), 1);
      }
      setSelectedGenre([...selectedGenre]);
    }
  };

  return (
    <Box className="genre-container">
      <Grid container justifyContent="space-evenly" size="small">
        <Grid>
          <Button
            id="allGenre"
            variant={categoryVariant.allGenre}
            sx={categoryStyle.allGenre}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            All Genre
          </Button>
        </Grid>
        <Grid>
          <Button
            id="education"
            variant={categoryVariant.education}
            sx={categoryStyle.education}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Education
          </Button>
        </Grid>
        <Grid>
          <Button
            id="sports"
            variant={categoryVariant.sports}
            sx={categoryStyle.sports}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Sports
          </Button>
        </Grid>
        <Grid>
          <Button
            id="comedy"
            variant={categoryVariant.comedy}
            sx={categoryStyle.comedy}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Comedy
          </Button>
        </Grid>
        <Grid>
          <Button
            id="lifestyle"
            variant={categoryVariant.lifestyle}
            sx={categoryStyle.lifestyle}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Lifestyle
          </Button>
        </Grid>
        <Grid>
          <Button
            variant={categoryVariant}
            startIcon={<ImportExportIcon />}
            sx={{
              backgroundColor: "white",
              color: "#586069",
              borderRadius: "60px",
              minWidth: "250px",
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <Box>Sort By:</Box>
            <select
              name="sort"
              id="sort"
              style={{
                border: "none",
                color: "#586069",
                textTransform: "uppercase",
              }}
              onChange={(e)=>handleSorting(e)}
            >
              <option value="choose">Choose</option>
              <option value="releaseDate">Release Date</option>
              <option value="viewCount">View Count</option>
            </select>
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        spacing={1}
        size="small"
        sx={{ marginTop: "30px" }}
      >
        <Grid>
          <Button
            id="allAgeGroup"
            variant={categoryVariant}
            sx={isAllAgeSelected ? selectedStyle : unSelectedStyle}
            onClick={(e) => {
              handleAgeClick(e);
            }}
          >
            Any Age Group
          </Button>
        </Grid>
        <Grid>
          <Button
            id="sevenPlus"
            variant={categoryVariant}
            sx={restAgeBoolObj.sevenPlus ? selectedStyle : unSelectedStyle}
            onClick={(e) => {
              handleAgeClick(e);
            }}
          >
            7+
          </Button>
        </Grid>
        <Grid>
          <Button
            id="twelvePlus"
            variant={categoryVariant}
            sx={restAgeBoolObj.twelvePlus ? selectedStyle : unSelectedStyle}
            onClick={(e) => {
              handleAgeClick(e);
            }}
          >
            12+
          </Button>
        </Grid>
        <Grid>
          <Button
            id="sixteenPlus"
            variant={categoryVariant}
            sx={restAgeBoolObj.sixteenPlus ? selectedStyle : unSelectedStyle}
            onClick={(e) => {
              handleAgeClick(e);
            }}
          >
            16+
          </Button>
        </Grid>
        <Grid>
          <Button
            id="eighteenPlus"
            variant={categoryVariant}
            sx={restAgeBoolObj.eighteenPlus ? selectedStyle : unSelectedStyle}
            onClick={(e) => {
              handleAgeClick(e);
            }}
          >
            18+
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
