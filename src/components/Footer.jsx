import { Box, Stack, Typography, Link } from '@mui/material'
import site from '../content/siteContent'

export default function Footer() {
  return (
    <Box sx={{ py: 4, borderTop: '1px solid', borderColor: 'divider' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <Typography variant="body2">© {new Date().getFullYear()} {site.brand.name}</Typography>
        <Typography variant="body2">
          <Link href={`mailto:${site.footer.email}`}>{site.footer.email}</Link>
          {' · '}
          {site.footer.location}
        </Typography>
      </Stack>
    </Box>
  )
}
