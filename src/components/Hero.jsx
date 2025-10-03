import { Box, Stack, Typography, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";
import site from "../content/siteContent";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionChip = motion(Chip);

// Smooth, slower ease
const EASE_SLOW = [0.22, 1, 0.36, 1];

// Stable pseudo-random (per index) so animation feels organic but consistent
const pr = (i, salt = 1) => {
  const x = Math.sin((i + 1) * 997 * salt) * 10000;
  return x - Math.floor(x);
};

export default function Hero() {
  // Randomized animation params for chips
  const chipAnim = useMemo(
    () =>
      (site.hero.badges || []).map((_, i) => {
        return {
          // small drift from different directions
          x: (pr(i, 2) - 0.5) * 28, // -14..14
          y: (pr(i, 3) - 0.5) * 32, // -16..16
          r: (pr(i, 4) - 0.5) * 8, // -4..4 deg
          delay: 0.2 + i * 0.14 + pr(i, 5) * 0.25,
          duration: 1.1 + pr(i, 6) * 0.7,
        };
      }),
    [site.hero.badges?.length]
  );

  // Randomized animation params for tiles
  const tileAnim = useMemo(
    () =>
      (site.hero.tiles || []).map((_, i) => {
        return {
          x: (pr(i, 7) - 0.5) * 40, // -20..20
          y: 20 + pr(i, 8) * 30, // 20..50 (mostly upward lift-in)
          r: (pr(i, 9) - 0.5) * 6, // -3..3 deg
          s: 0.95 + pr(i, 10) * 0.08, // 0.95..1.03
          delay: 0.45 + i * 0.12 + pr(i, 11) * 0.25,
          duration: 1.2 + pr(i, 12) * 0.9,
        };
      }),
    [site.hero.tiles?.length]
  );

  return (
    <Box className="hero-glow" sx={{ pt: { xs: 6, md: 10 } }}>
      <Stack spacing={3} alignItems="flex-start">
        {/* Chips — staggered, randomized entrances */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: "wrap",
            gap: { xs: 0.75, sm: 1 }, // tighter on phones
            rowGap: { xs: 0.75, sm: 1 },
            maxWidth: "100%",
            minWidth: 0, // allow flex children to shrink
          }}
        >
          {(site.hero.badges || []).map((b, i) => (
            <MotionChip
              key={b}
              label={b}
              variant="outlined"
              size="small" // compact by default; text scaled below
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
                // clamp transforms so chips never start off-screen on mobile
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

        {/* Headline — slower lift-in with a touch of scale */}
        <MotionTypography
          variant="h1"
          sx={{ fontSize: { xs: 40, md: 72 }, lineHeight: 1.05 }}
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.35, delay: 0.25, ease: EASE_SLOW }}
        >
          {site.hero.headline}
        </MotionTypography>

        {/* Subhead — gentle fade/slide */}
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

        {/* CTA buttons — appear after text */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: EASE_SLOW }}
        >
          <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" href={site.brand.ctaLink}>
              {site.brand.ctaPrimary}
            </Button>
            <Button size="large" variant="outlined" href="#work">
              {site.brand.ctaSecondary}
            </Button>
          </Stack>
        </MotionBox>
      </Stack>

      {/* Tiles — each tile lifts in with slight randomized offset/rotation/scale */}
      <MotionBox
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.6, ease: EASE_SLOW }}
      >
        <Box
          sx={{
            mt: 6,
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
          }}
        >
          {(site.hero.tiles || []).map((t, i) => (
            <MotionBox
              key={t.src + i}
              className="card-blur"
              initial={{
                opacity: 0,
                x: tileAnim[i]?.x ?? 0,
                y: tileAnim[i]?.y ?? 24,
                rotate: tileAnim[i]?.r ?? 0,
                scale: tileAnim[i]?.s ?? 0.98,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: tileAnim[i]?.duration ?? 1.4,
                delay: tileAnim[i]?.delay ?? 0.6,
                ease: EASE_SLOW,
              }}
              sx={{
                gridColumn: {
                  xs: "span 12",
                  sm: "span 6",
                  md: i % 3 === 0 ? "span 5" : "span 3",
                },
                height: 160,
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Image fill */}
              <Box
                component="img"
                src={t.src}
                alt={t.alt || ""}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: t.objectPosition || "center",
                  display: "block",
                }}
              />
              {/* Optional soft gradient for legibility if you later add text */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.25) 100%)",
                  pointerEvents: "none",
                }}
              />
              {t.caption && (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    left: 12,
                    bottom: 10,
                    color: "rgba(255,255,255,0.95)",
                    fontWeight: 700,
                  }}
                >
                  {t.caption}
                </Typography>
              )}
            </MotionBox>
          ))}
        </Box>
      </MotionBox>
    </Box>
  );
}
