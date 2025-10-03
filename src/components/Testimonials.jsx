import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import site from '../content/siteContent'

export default function Testimonials() {
  return (
    <Box sx={{ mt: { xs: 6, md: 10 } }}>
      <Typography variant="h2" sx={{ mb: 2 }}>Results people feel</Typography>
      <Grid container spacing={2}>
        {site.testimonials.map((t, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Paper className="card-blur" sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ fontStyle: 'italic' }}>"{t.quote}"</Typography>
                <Typography color="text.secondary">— {t.author}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
