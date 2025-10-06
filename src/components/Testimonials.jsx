import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import site from "../content/siteContent";
import { useTheme, alpha } from "@mui/material/styles";

export default function Testimonials() {
  const theme = useTheme();
  const brandGradient =
    theme.brand?.gradient ||
    "linear-gradient(135deg, #FDD835 0%, #FFB300 100%)";
  return (
    <Box sx={{ mt: { xs: 6, md: 10 } }}>
      <Typography
        variant="h2"
        sx={{
          background: brandGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: 900,
          fontSize: "clamp(1.625rem, 3.6vw, 2.5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          mb: 2,
        }}
      >
        Results people feel
      </Typography>
      <Grid container spacing={2}>
        {site.testimonials.map((t, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Paper className="card-blur" sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                  "{t.quote}"
                </Typography>
                <Typography color="text.secondary">— {t.author}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
