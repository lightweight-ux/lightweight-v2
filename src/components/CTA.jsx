import { Box, Paper, Stack, Typography, Button } from '@mui/material'
import site from '../content/siteContent'

export default function CTA() {
  return (
    <Box id="contact" sx={{ my: { xs: 6, md: 10 } }}>
      <Paper className="card-blur" sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={2} justifyContent="space-between">
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>{site.cta.headline}</Typography>
            <Typography color="text.secondary">{site.cta.subhead}</Typography>
          </Stack>
          <Button size="large" variant="contained" href={site.brand.ctaLink}>{site.cta.button}</Button>
        </Stack>
      </Paper>
    </Box>
  )
}
