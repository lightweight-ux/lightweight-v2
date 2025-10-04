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
import site from "../content/siteContent";

/** Small, reusable “gradient ring” style around round buttons on dark bg */
function ringSx(gradient) {
  return {
    borderRadius: "999px",
    border: "1px solid transparent",
    backgroundImage: `linear-gradient(#121212,#121212), ${gradient}`,
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
  const gradient =
    theme.brand?.gradient || "linear-gradient(135deg,#FF4FD8,#7B61FF,#23B0FF)";

  return (
    <Box component="footer" sx={{ mt: 8 }}>
      {/* Slim gradient bar for a premium feel */}
      <Box sx={{ height: 3, background: gradient, opacity: 0.9 }} />

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
            {/* Facebook */}
            <IconButton
              aria-label="Facebook"
              href="https://www.facebook.com/lightweight.agency"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient)}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>

            {/* Instagram */}
            <IconButton
              aria-label="Instagram"
              href="https://www.instagram.com/lightweight.agency/"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient)}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>

            {/* TikTok (simple glyph “Note” fallback, styled the same ring) */}
            <IconButton
              aria-label="TikTok"
              href="https://www.tiktok.com/@lightweight_agency?lang=en"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient)}
            >
              {/* Minimal TikTok glyph via inline SVG to avoid extra deps */}
              <Box
                component="svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M14.5 3c.5 2.3 2.1 4.1 4.4 4.7v2.3c-1.6-.1-3.2-.6-4.4-1.6v6.3c0 3.2-2.6 5.8-5.8 5.8S3 17.9 3 14.7c0-3.2 2.6-5.8 5.8-5.8.5 0 1 .1 1.5.2v2.6c-.5-.2-1-.3-1.5-.3-1.8 0-3.3 1.5-3.3 3.3S6 18 7.8 18s3.3-1.5 3.3-3.3V3h3.4z" />
              </Box>
            </IconButton>

            {/* Telegram (paper-plane inline SVG) */}
            <IconButton
              aria-label="Telegram"
              href="https://t.me/+Y80mkW_QuQBmNDYx"
              target="_blank"
              rel="noopener"
              size="small"
              sx={ringSx(gradient)}
            >
              <Box
                component="svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M21.9 3.3c.3-.1.7.1.8.4.1.3 0 .7-.3.9l-3.9 3.8c-.2.2-.6.2-.8 0l-3-2.7-2.9 11c-.1.4-.6.6-.9.4-.3-.1-.5-.5-.4-.8l2.9-11.2-4.7 1.8c-.3.1-.7 0-.8-.4-.1-.3 0-.7.3-.8L21.9 3.3z" />
              </Box>
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
