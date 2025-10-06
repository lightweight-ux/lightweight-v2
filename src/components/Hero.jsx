import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import site from "../content/siteContent";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionChip = motion(Chip);
const MotionImg = motion.img;

const EASE_SLOW = [0.22, 1, 0.36, 1];
const pr = (i, salt = 1) => {
  const x = Math.sin((i + 1) * 997 * salt) * 10000;
  return x - Math.floor(x);
};

export default function Hero() {
  const items = site.hero.tiles || [];

  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const [hover, setHover] = React.useState(null); // 👈 match FeaturedWork

  const view = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const prev = React.useCallback(
    () => items.length && setIdx((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );
  const next = React.useCallback(
    () => items.length && setIdx((i) => (i + 1) % items.length),
    [items.length]
  );

  const sel = items[idx] || null;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  const touch = React.useRef({ x: 0 });
  const onTouchStart = (e) => (touch.current.x = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (dx > 50) prev();
    if (dx < -50) next();
  };

  const chipAnim = React.useMemo(
    () =>
      (site.hero.badges || []).map((_, i) => ({
        x: (pr(i, 2) - 0.5) * 28,
        y: (pr(i, 3) - 0.5) * 32,
        r: (pr(i, 4) - 0.5) * 8,
        delay: 0.2 + i * 0.14 + pr(i, 5) * 0.25,
        duration: 1.1 + pr(i, 6) * 0.7,
      })),
    [site.hero.badges?.length]
  );

  const tileAnim = React.useMemo(
    () =>
      items.map((_, i) => ({
        x: (pr(i, 7) - 0.5) * 40,
        y: 20 + pr(i, 8) * 30,
        r: (pr(i, 9) - 0.5) * 6,
        s: 0.95 + pr(i, 10) * 0.08,
        delay: 0.45 + i * 0.12 + pr(i, 11) * 0.25,
        duration: 1.2 + pr(i, 12) * 0.9,
      })),
    [items.length]
  );

  return (
    <>
      <Box className="hero-glow" sx={{ pt: { xs: 6, md: 10 } }}>
        <Stack spacing={3} alignItems="flex-start">
          {/* Chips */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              gap: { xs: 0.75, sm: 1 },
              rowGap: { xs: 0.75, sm: 1 },
              maxWidth: "100%",
              minWidth: 0,
            }}
          >
            {(site.hero.badges || []).map((b, i) => (
              <MotionChip
                key={b}
                label={b}
                variant="outlined"
                size="small"
                sx={{
                  maxWidth: "100%",
                  borderRadius: 999,
                  px: { xs: 1, sm: 1.25 },
                  "& .MuiChip-label": {
                    display: "block",
                    px: { xs: 0.5, sm: 0.75 },
                    fontSize: { xs: 12, sm: 13.5 },
                    lineHeight: 1.6,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
                initial={{
                  opacity: 0,
                  x: Math.max(-16, Math.min(16, chipAnim[i]?.x ?? 0)),
                  y: Math.max(-8, Math.min(12, chipAnim[i]?.y ?? 12)),
                  rotate: Math.max(-8, Math.min(8, chipAnim[i]?.r ?? 0)),
                  scale: 0.98,
                }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                transition={{
                  duration: chipAnim[i]?.duration ?? 1.3,
                  delay: chipAnim[i]?.delay ?? 0.2,
                  ease: EASE_SLOW,
                }}
              />
            ))}
          </Stack>

          {/* Headline */}
          <MotionTypography
            variant="h1"
            sx={{ fontSize: { xs: 40, md: 72 }, lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.35, delay: 0.25, ease: EASE_SLOW }}
          >
            {site.hero.headline}
          </MotionTypography>

          {/* Subhead */}
          <MotionTypography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 800 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, delay: 0.45, ease: EASE_SLOW }}
          >
            {site.hero.subhead}
          </MotionTypography>

          {/* CTAs */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.65, ease: EASE_SLOW }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                size="large"
                variant="contained"
                href={site.brand.ctaLink}
              >
                {site.brand.ctaPrimary}
              </Button>
              <Button size="large" variant="outlined" href="#work">
                {site.brand.ctaSecondary}
              </Button>
            </Stack>
          </MotionBox>
        </Stack>

        {/* Tiles — updated to match FeaturedWork behavior */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6, ease: EASE_SLOW }}
        >
          <Box
            id="work"
            sx={{
              "--row": "220px", // 👈 fixed row height
              mt: 6,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }, // 👈 responsive cols like FeaturedWork
              gridAutoRows: "var(--row)", // 👈 enables row-span trick
              gap: 2,
            }}
          >
            {items.map((t, i) => {
              const active = hover === (t.id || i);
              return (
                <motion.div
                  key={(t.src || "") + i}
                  layout
                  style={{ gridRow: active ? "span 2" : "span 1" }} // 👈 grow on hover
                  transition={{
                    layout: { duration: 0.45, type: "spring", bounce: 0.2 },
                  }}
                  onHoverStart={() => setHover(t.id || i)}
                  onHoverEnd={() => setHover(null)}
                >
                  <MotionBox
                    className="card-blur"
                    onClick={() => view(i)}
                    whileHover={{ boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}
                    transition={{ duration: 0.25 }}
                    sx={{
                      height: "100%", // 👈 allow row-span to control height
                      borderRadius: 3,
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    {/* Scaled image on hover (like FeaturedWork) */}
                    <MotionImg
                      src={t.src}
                      alt={t.alt || ""}
                      initial={false}
                      animate={{ scale: active ? 1.08 : 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Deepening gradient overlay on hover */}
                    <MotionBox
                      initial={false}
                      animate={{ opacity: active ? 1 : 0.8 }}
                      transition={{ duration: 0.35 }}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 65%, rgba(0,0,0,.75) 100%)",
                      }}
                    />

                    {/* Bottom caption + inline CTA */}
                    <motion.div
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{
                        opacity: active ? 1 : 0.85,
                        y: active ? 0 : 10,
                      }}
                      transition={{ duration: 0.35 }}
                      style={{
                        position: "absolute",
                        left: 16,
                        right: 16,
                        bottom: 16,
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 800, mb: 4 }}
                        >
                          {t.caption || t.alt || "Project"}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ opacity: 0.9 }}
                      >
                        Hover to preview • Click for snapshot
                      </Typography>
                    </motion.div>
                  </MotionBox>
                </motion.div>
              );
            })}
          </Box>
        </MotionBox>
      </Box>

      {/* Dialog (unchanged aside from using `items`/idx) */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        slotProps={{
          backdrop: {
            sx: {
              background:
                "radial-gradient(1200px 600px at 50% 0%, rgba(0,0,0,.85), rgba(0,0,0,.92))",
              backdropFilter: "blur(2px)",
            },
          },
        }}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {sel && (
            <Box
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              sx={{
                position: "relative",
                height: { xs: "70vh", md: "72vh" },
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <MotionImg
                  key={(sel.src || "") + idx}
                  src={sel.src}
                  alt={sel.alt || sel.caption || `item-${idx + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(100%) contrast(1.08) brightness(0.9)",
                  }}
                />
              </AnimatePresence>

              <Box
                sx={{
                  pointerEvents: "none",
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(450px 220px at 58% 58%, rgba(255,200,120,.35), rgba(0,0,0,0) 60%)",
                }}
              />
              <Box
                sx={{
                  pointerEvents: "none",
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 35%)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  left: { xs: 16, md: 32 },
                  top: { xs: 24, md: 32 },
                  right: { xs: 16, md: "38%" },
                  color: "#fff",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ letterSpacing: 2, opacity: 0.7 }}
                >
                  0{idx + 1}
                  <Box component="span" sx={{ mx: 1, opacity: 0.5 }}>
                    /
                  </Box>
                  {items.length}
                </Typography>

                <Typography
                  component={motion.h2}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  sx={{
                    fontWeight: 700,
                    lineHeight: 0.95,
                    fontSize: {
                      xs: "clamp(18px, 8vw, 54px)",
                      md: "clamp(36px, 6.5vw, 92px)",
                    },
                    textTransform: "lowercase",
                    mb: 4,
                  }}
                >
                  {(sel.caption || sel.alt || "project")
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                  <br />
                  {(sel.caption || sel.alt || "project")
                    .split(" ")
                    .slice(2)
                    .join(" ")}
                </Typography>

                <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    href={`${
                      site.brand.ctaLink || "/start"
                    }?itemId=hero-${idx}`}
                  >
                    Start a project
                  </Button>
                  <Button variant="outlined" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </Stack>
              </Box>

              <IconButton
                onClick={prev}
                aria-label="Previous"
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "70%",
                  transform: "translateY(-70%)",
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.08)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={next}
                aria-label="Next"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "70%",
                  transform: "translateY(-70%)",
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.08)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              <IconButton
                onClick={() => setOpen(false)}
                aria-label="Close"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.08)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
