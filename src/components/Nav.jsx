// src/components/Nav.jsx
import * as React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Dialog,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import site from "../content/siteContent";

/* ---------- Animated hamburger (morphs to X) ---------- */
function MotionHamburger({ open, onClick }) {
  const reduce = useReducedMotion();
  const lineSx = {
    position: "absolute",
    left: 6,
    right: 6,
    height: 2.5,
    borderRadius: 2,
    background:
      "linear-gradient(90deg, rgba(255,255,255,.95), rgba(255,255,255,.6))",
  };
  return (
    <IconButton
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open ? "true" : "false"}
      aria-controls="mobile-menu"
      onClick={onClick}
      size="large"
      sx={{
        width: 44,
        height: 44,
        borderRadius: "999px",
        position: "relative",
        "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
      }}
    >
      <Box
        component={motion.div}
        initial={false}
        animate={open ? "open" : "closed"}
        sx={{ width: 32, height: 22, position: "relative" }}
      >
        <Box
          component={motion.span}
          sx={{ ...lineSx, top: 2 }}
          variants={{ closed: { y: 0, rotate: 0 }, open: { y: 9, rotate: 45 } }}
          transition={{
            type: reduce ? false : "spring",
            stiffness: 260,
            damping: 20,
          }}
        />
        <Box
          component={motion.span}
          sx={{ ...lineSx, top: 9.5 }}
          variants={{
            closed: { opacity: 1, scaleX: 1 },
            open: { opacity: 0, scaleX: 0.25 },
          }}
          transition={{ duration: reduce ? 0 : 0.18 }}
        />
        <Box
          component={motion.span}
          sx={{ ...lineSx, top: 17 }}
          variants={{
            closed: { y: 0, rotate: 0 },
            open: { y: -7, rotate: -45 },
          }}
          transition={{
            type: reduce ? false : "spring",
            stiffness: 260,
            damping: 20,
          }}
        />
      </Box>
    </IconButton>
  );
}

export default function Nav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          // visible + height
          bgcolor: "rgba(18,18,18,0.72)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: (t) => t.zIndex.appBar,
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: { xs: 64, md: 72 } }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
          >
            <Typography variant="brandScript">{site.brand.name}</Typography>
          </Box>

          {/* Desktop links */}
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

          {/* CTA always visible on desktop; optional on mobile via menu */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button href={site.brand.ctaLink} variant="contained">
              {site.brand.ctaPrimary}
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <MotionHamburger open={open} onClick={() => setOpen((v) => !v)} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile full-screen menu */}
      <Dialog
        id="mobile-menu"
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: motion.div,
          initial: { opacity: 0, y: -24 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -24 },
          transition: { duration: 0.22 },
          sx: {
            bgcolor: alpha("#121212", 0.92),
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            height: "100dvh",
          }}
        >
          {/* top row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="brandScript">{site.brand.name}</Typography>
            <MotionHamburger open onClick={() => setOpen(false)} />
          </Box>

          {/* menu body */}
          <Stack
            spacing={2}
            alignItems="stretch"
            sx={{ alignSelf: "center", width: "min(88vw, 520px)" }}
          >
            <Button
              href="#services"
              variant="contained"
              size="large"
              onClick={() => setOpen(false)}
            >
              Services
            </Button>
            <Button
              href="#work"
              variant="contained"
              size="large"
              onClick={() => setOpen(false)}
            >
              Work
            </Button>
            <Button
              href="#contact"
              variant="outlined"
              size="large"
              onClick={() => setOpen(false)}
            >
              Contact
            </Button>
            <Divider sx={{ my: 0.5, opacity: 0.2 }} />
            <Button
              href={site.brand.ctaLink}
              variant="contained"
              size="large"
              onClick={() => setOpen(false)}
              sx={{
                fontWeight: 800,
                background: theme.brand?.gradient,
                color: "#121212",
                "&:hover": { filter: "brightness(0.95)" },
              }}
            >
              {site.brand.ctaPrimary}
            </Button>
          </Stack>

          {/* footer row */}
          <Box sx={{ textAlign: "center", opacity: 0.7, fontSize: 12, pb: 1 }}>
            © {new Date().getFullYear()} {site.brand.name}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
