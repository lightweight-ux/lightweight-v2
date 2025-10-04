import {
  Box,
  Stack,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // TikTok stand-in
import SendRoundedIcon from "@mui/icons-material/SendRounded"; // Telegram stand-in
import site from "../content/siteContent";

function ringSx(gradient, bg) {
  return {
    borderRadius: "999px",
    border: "1px solid transparent",
    backgroundImage: `linear-gradient(${bg},${bg}), ${gradient}`,
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    transition: "transform .18s ease, box-shadow .18s ease, color .18s ease",
    color: "text.secondary",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 30px rgba(0,0,0,.35)",
      color: "#fff",
    },
  };
}

export default function Footer() {
  const theme = useTheme();
  const bg = theme.palette?.background?.default || "#121212";
  // Your requested gradient
  const gradient = "linear-gradient(135deg,#FDD835,#4FC3F7)";

  return (
    <Box component="footer" sx={{ mt: 8 }}>
      {/* Slim gradient bar */}
      <Box sx={{ height: 3, background: gradient, opacity: 0.95 }} />

      <Box
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
          borderTop: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(1200px 400px at 50% 0%, rgba(255,255,255,0.03), rgba(0,0,0,0))",
        }}
      >
        {/* Top row: Logo + socials */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={{ xs: 3, md: 4 }}
        >
          {/* Logo text (Sacramento) */}
          <Stack spacing={0.5}>
            <Typography
              aria-label="Lightweight"
              sx={{
                fontFamily: `"Sacramento", cursive`,
                fontSize: { xs: 36, sm: 42 },
                lineHeight: 1,
                color: "#FFB300",
                textShadow: "0 2px 24px rgba(255,179,0,.15)",
              }}
            >
              lightweight
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {site.brand?.tagline || "Creative, fast, effective."}
            </Typography>
          </Stack>

          {/* Socials */}
          <Stack direction="row" spacing={1.2}>
            <IconButton
              aria-label="Facebook"
              href="https://www.facebook.com/lightweight.agency"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient, bg)}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="Instagram"
              href="https://www.instagram.com/lightweight.agency/"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient, bg)}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>

            {/* TikTok (using MusicNote as a clear, lightweight stand-in) */}
            <IconButton
              aria-label="TikTok"
              href="https://www.tiktok.com/@lightweight_agency?lang=en"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient, bg)}
              title="TikTok"
            >
              <MusicNoteIcon fontSize="small" />
            </IconButton>

            {/* Telegram (using SendRounded plane) */}
            <IconButton
              aria-label="Telegram"
              href="https://t.me/+Y80mkW_QuQBmNDYx"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient, bg)}
              title="Telegram"
            >
              <SendRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: { xs: 2.5, md: 3 }, opacity: 0.12 }} />

        {/* Bottom row: contact + copyright */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={{ xs: 1.25, md: 2 }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} {site.brand?.name || "Lightweight"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <Link
              href={`mailto:${site.footer.email}`}
              underline="hover"
              sx={{ fontWeight: 600 }}
            >
              {site.footer.email}
            </Link>
            {" · "}
            {site.footer.location}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
