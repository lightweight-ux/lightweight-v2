// Showcase.jsx
import * as React from "react";
import { Box, Grid, Paper, Stack, Typography, Link } from "@mui/material";
import site from "../content/siteContent";
import { motion, useAnimation, useInView } from "framer-motion";

const MotionPaper = motion(Paper);

// simple stable hash → seeded random (so each card's motion is consistent)
function seededRand(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 0..1
  return (h >>> 0) / 4294967295;
}

function AnimatedCard({ card }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.3 }); // 30% entry/exit trigger
  const controls = useAnimation();

  // per-card randomization
  const rng = React.useMemo(
    () => seededRand(`${card.title}|${card.tag}`),
    [card.title, card.tag]
  );
  const floatAmp = 6 + Math.round(rng * 6); // 6..12px
  const floatDur = 8 + Math.round(rng * 6); // 8..14s
  const rotAmp = (rng * 2 - 1) * 1.5; // -1.5..1.5 deg
  const entryDelay = (rng * 0.6).toFixed(2); // 0..0.6s
  const entryX = (rng > 0.5 ? 1 : -1) * (10 + rng * 10); // ±10..±20 px
  const entryY = (rng > 0.5 ? -1 : 1) * (6 + rng * 8); // ±6..±14 px

  React.useEffect(() => {
    if (inView) {
      // visible: fade in + start gentle float loop
      controls
        .start({
          opacity: 1,
          scale: 1,
          rotate: 0,
          x: 0,
          y: 0,
          transition: {
            duration: 1.2,
            ease: "easeOut",
            delay: Number(entryDelay),
          },
        })
        .then(() => {
          controls.start({
            y: [0, -floatAmp, 0, floatAmp, 0], // transform-only (no layout)
            rotate: [0, rotAmp, 0, -rotAmp, 0],
            transition: {
              duration: floatDur,
              ease: "easeInOut",
              repeat: Infinity,
            },
          });
        });
    } else {
      // hidden (out of view by ≥30%): soft exit
      controls.start({
        opacity: 0.6,
        scale: 0.98,
        rotate: rotAmp / 2,
        x: entryX / 2,
        y: entryY / 2,
        transition: { duration: 0.9, ease: "easeInOut" },
      });
    }
  }, [
    inView,
    controls,
    entryDelay,
    floatAmp,
    floatDur,
    rotAmp,
    entryX,
    entryY,
  ]);

  return (
    <MotionPaper
      ref={ref}
      className="card-blur"
      initial={{
        opacity: 0,
        scale: 0.98,
        x: entryX,
        y: entryY,
        rotate: rotAmp,
      }}
      animate={controls}
      sx={{
        p: 0,
        overflow: "hidden",
        borderRadius: 3,
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        // ↓↓↓ Prevent layout/scroll jank
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "paint",
        overflowAnchor: "none",
        boxShadow: (t) =>
          `0 8px 30px ${
            t.palette.mode === "dark" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.12)"
          }`,
      }}
    >
      {/* Image (fixed height already reserves space; no CLS) */}
      <Box
        component="img"
        src={card.src}
        alt={card.title}
        loading="lazy"
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
          // Optional: composite the image too for ultra-smoothness
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Content */}
      <Stack spacing={0.5} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
          {card.title}
        </Typography>
        <Typography color="text.secondary">{card.tag}</Typography>
        <Link
          href={card.href}
          target="_blank"
          rel="noopener"
          sx={{ mt: 0.5, fontWeight: 600 }}
        >
          Visit project
        </Link>
      </Stack>
    </MotionPaper>
  );
}

export default function Showcase() {
  return (
    <Box
      id="work"
      sx={{
        mt: { xs: 6, md: 10 },
        // ↓↓↓ Keep scrollbar space stable; disable scroll anchoring here
        scrollbarGutter: "stable both-edges",
        overflowAnchor: "none",
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        Selected work
      </Typography>
      <Grid container spacing={2}>
        {site.showcase.map((card) => (
          <Grid item xs={12} md={6} key={card.title}>
            <AnimatedCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
