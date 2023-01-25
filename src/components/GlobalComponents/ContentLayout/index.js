import React from "react";
import { Grid, Box } from "@mui/material";

const ContentLayout = ({ title, children }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={2} lg={2}>
          {title && title !== "" && (
            <Box
              fontWeight="500"
              display="inline-block"
              color="text.primary"
              fontSize="body2.fontSize"
              component="span"
            >
              {title}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={9} md={10} lg={10}>
          <Box
            mt={{ xs: "-10px", sm: 0 }}
            mr={{ xs: 0, md: "100px", lg: "150px" }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentLayout;
