import { Container, Box } from '@mui/material'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <Nav />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
