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
import { motion } from "framer-motion";
import site from "../content/siteContent";

export default function Services() {
  // Append a 4th card without touching site.content
  const services = [...site.services];

  return (
    <Box id="services" sx={{ mt: { xs: 6, md: 10 } }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        What we do
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
        Creative that moves fast — and performs. Pick a lane or build a full
        stack.
      </Typography>
      <Grid container spacing={2}>
        {services.map((s, idx) => (
          <Grid item xs={12} md={6} key={s.title}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Paper className="card-blur" sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {s.title}
                  </Typography>
                  <Typography color="primary" sx={{ fontWeight: 700 }}>
                    {s.price}
                  </Typography>
                  <List dense>
                    {s.bullets.map((b) => (
                      <ListItem key={b} sx={{ px: 0 }}>
                        <ListItemText primary={b} />
                      </ListItem>
                    ))}
                  </List>
                  <Button variant="contained" href="#contact">
                    Get a quote
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
