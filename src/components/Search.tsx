import { Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function Search({
  searchText,
  handleSearch,
  handleCancelSearch,
}: {
  searchText: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelSearch: () => void;
}) {
  const iconStyles = {
    cursor: "pointer",
    color: "gray",
    fontSize: "29px",
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
        Search
      </Typography>

      <Box sx={{ position: "relative"}}>
        <TextField
          value={searchText}
          placeholder="Search"
          onChange={handleSearch}
          sx={{ width: "100%"
           }} // Make the text field take up the full width of the container
        />

        <Box sx={{ position: "absolute", right: "20px", top: "13px" }}>
          {searchText.length > 0 ? (
            <CloseIcon onClick={handleCancelSearch} sx={iconStyles} />
          ) : (
            <SearchIcon sx={iconStyles} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
