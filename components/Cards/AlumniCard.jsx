import { Grid, Typography, Button, Avatar, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const AlumniCard = (props) => {
  return (
    <>
      <Box sx={{ 
        width: { xs: "100%" }, 
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 20px rgba(255, 105, 180, 0.2)",
        borderRadius: "24px"
      }}>
      <Grid
        container
        spacing={{ xs: 3, md: 2 }}
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems={"center"}
        className="p-4 rounded-3xl"
      >
        <Grid item container xs={12} sm={9}>
          <Grid item xs={12} sm={3} className="flex justify-center lg:justify-start">
            <Avatar
              src={props.imageSrc || '/blank-profile-picture.webp'}
              alt={props.name}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={9} className="pt-4 lg:pt-0">
            <Grid container spacing={1} direction={"column"}>
              <Grid item className="flex justify-center lg:justify-start">
                <Typography variant="h5" fontWeight="bold">
                  {props.name}
                </Typography>
              </Grid>
              <Grid item className="flex justify-center lg:justify-start">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {props.batch} || {props.branch}
                </Typography>
              </Grid>
              <Grid item className="flex justify-center lg:justify-start">
                <Typography variant="body2" color="textSecondary">
                  {props.position} || at {props.company}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={3}>
          <Grid item xs={12}>
            <NavLink to={`/view?id=${props.userId}`}>
            <Button
              variant="outlined"
              fullWidth
              style={{
                backgroundColor: 'white',
                borderColor: "#FA005E",
                color: "#FA005E",
                height: "50px",
                fontWeight: 600,
                fontSize: "1em",
                textTransform: "capitalize"
              }}
            >
              View Profile
            </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default AlumniCard;
