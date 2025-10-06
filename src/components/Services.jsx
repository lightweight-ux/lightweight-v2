// src/components/Services.jsx
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import site from "../content/siteContent";

const MotionPaper = motion(Paper);
const MotionListItem = motion(ListItem);

export default function Services() {
  const theme = useTheme();
  const brandGradient =
    theme.brand?.gradient ||
    "linear-gradient(135deg, #FDD835 0%, #FF8F00 100%)";

  // Append a 4th card without touching site.content
  const services = React.useMemo(() => {
    const base = [...site.services];
    base.push({
      title: "Marketing Strategy & Consulting",
      price: "Custom scope • Starting at $65/hr",
      bullets: [
        "Brand positioning, messaging & value props",
        "Go-to-market plans, campaign roadmaps & content calendars",
        "Business Process Optimization",
      ],
    });
    return base;
  }, []);

  // Minimal “spotlight” state per card
  const [spot, setSpot] = React.useState({});

  // Track “show more” per card
  const [openMore, setOpenMore] = React.useState({});

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };
  const cardItem = {
    hidden: { opacity: 0, y: 26, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 18 },
    },
  };

  return (
    <Box id="services" sx={{ mt: { xs: 6, md: 10 } }}>
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
        What we do
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
        Creative that moves fast — and performs. Pick a lane or build a full
        stack.
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {services.map((s, idx) => {
          const id = `svc-${idx}`;
          const bullets = openMore[id] ? s.bullets : s.bullets.slice(0, 4);

          return (
            <Grid item xs={12} md={6} key={s.title}>
              <MotionPaper
                variants={cardItem}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  setSpot((prev) => ({ ...prev, [id]: `${x}px ${y}px` }));
                }}
                onMouseLeave={() =>
                  setSpot((prev) => ({ ...prev, [id]: undefined }))
                }
                className="card-blur"
                sx={{
                  p: { xs: 2.25, md: 3 },
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  // Gradient border
                  border: "1px solid transparent",
                  backgroundImage: `${brandGradient}`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.25), 0 6px 16px rgba(0,0,0,0.2)",
                  // Spotlight that follows cursor
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: spot[id]
                      ? `radial-gradient(300px 300px at ${spot[id]}, ${alpha(
                          brandGradient,
                          0.12
                        )} 0%, transparent 60%)`
                      : "transparent",
                    pointerEvents: "none",
                    transition: "background .25s ease",
                  },
                }}
              >
                <Stack spacing={1.25}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: 0.2,
                      lineHeight: 1.15,
                    }}
                  >
                    {s.title}
                  </Typography>

                  <Typography
                    color="primary"
                    sx={{
                      fontWeight: 800,
                      display: "inline-block",
                      background: brandGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {s.price}
                  </Typography>

                  {/* Bullets with check icons, lightly animated */}
                  <List dense sx={{ py: 0, mt: 0.5 }}>
                    {bullets.map((b) => (
                      <MotionListItem
                        key={b}
                        disableGutters
                        sx={{ px: 0 }}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.25 }}
                      >
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ mr: 1, opacity: 0.85 }}
                        />
                        <ListItemText
                          primaryTypographyProps={{ variant: "body2" }}
                          primary={b}
                        />
                      </MotionListItem>
                    ))}
                  </List>

                  {/* “+ more” keeps cards clean on first glance */}
                  {s.bullets.length > 4 && (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() =>
                        setOpenMore((prev) => ({ ...prev, [id]: !prev[id] }))
                      }
                      sx={{
                        alignSelf: "flex-start",
                        px: 0.5,
                        textTransform: "none",
                        fontWeight: 700,
                        opacity: 0.85,
                        "&:hover": { opacity: 1 },
                      }}
                    >
                      {openMore[id]
                        ? "Show less"
                        : `+${s.bullets.length - 4} more`}
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    href="#contact"
                    component={motion.button}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    sx={{
                      mt: 0.5,
                      fontWeight: 800,
                      borderRadius: 2,
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.25), 0 6px 24px rgba(127, 97, 255, 0.25)",
                    }}
                  >
                    Get a quote
                  </Button>
                </Stack>
              </MotionPaper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
