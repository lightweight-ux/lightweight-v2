import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import site from "../content/siteContent";

export default function Nav() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: "blur(8px)" }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
        >
          <Typography variant="brandScript">{site.brand.name}</Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button href="#services" variant="text">
            Services
          </Button>
          <Button href="#work" variant="text">
            Work
          </Button>
          <Button href="#contact" variant="outlined">
            Contact
          </Button>
        </Box>
        <Button href={site.brand.ctaLink} variant="contained">
          {site.brand.ctaPrimary}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
