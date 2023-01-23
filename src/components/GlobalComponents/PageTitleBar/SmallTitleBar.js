import { Button, Grid, Typography, Box, Container } from "@mui/material";
import Link from "next/link";

const SmallTitleBar = ({
  title,
  center = true,
  desc,
  buttonText,
  buttonLink,
}) => {
  return (
    <Box className={`title-banner`}>
      <Container sx={{ p: "2rem" }}>
        <Box px={{ xs: "12px", lg: 0 }}>
          <Grid container spacing={3} direction="row">
            {center ? (
              <Grid item xs={12} sm={12}>
                <Box className="title-content" textAlign="center">
                  <Typography variant="h4">{title}</Typography>
                  {desc ? (
                    <Box pt={1} fontSize="body2.fontSize">
                      {desc}
                    </Box>
                  ) : null}
                </Box>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} sm={7}>
                  <Box
                    className="title-content"
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    <Typography variant="h4">{title}</Typography>
                    {desc ? (
                      <Box pt="5px" fontSize="body2.fontSize">
                        {desc}
                      </Box>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                  {buttonText ? (
                    <Box
                      className="btn-wrap"
                      textAlign={{ xs: "center", sm: "right" }}
                    >
                      <Button
                        sx={{ color: "#ffffff", borderColor: "#ffffff" }}
                        variant="outlined"
                        component={Link}
                        href={buttonLink}
                      >
                        <i
                          className="material-icons"
                          style={{
                            transform: "rotate(180deg)",
                            display: "inline-block",
                            paddingLeft: 10,
                          }}
                        >
                          arrow_right_alt
                        </i>
                        {buttonText}
                      </Button>
                    </Box>
                  ) : null}
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default SmallTitleBar;
