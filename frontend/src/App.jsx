import { useState } from 'react'
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Fade
} from '@mui/material'
import axios from 'axios'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    
    setLoading(true)
    setError('')
    setResult(null)

    try {
      console.log('Sending request with text:', text)
      const response = await axios.post('http://localhost:5000/api/check-grammar', { text })
      console.log('Received response:', response.data)
      
      if (response.data && response.data.correctedText) {
        setResult(response.data)
      } else {
        throw new Error('Invalid response format from server')
      }
    } catch (err) {
      console.error('Error details:', err)
      setError(err.response?.data?.details || err.response?.data?.error || 'Failed to check grammar. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50' // Green
    if (score >= 60) return '#ff9800' // Orange
    return '#f44336' // Red
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ 
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 3,
        p: 3,
        mb: 4,
        color: 'white',
        textAlign: 'center'
      }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Grammate
        </Typography>
        <Typography variant="subtitle1">
          Check and improve your English grammar
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Enter your text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="Type or paste your text here..."
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading || !text.trim()}
            sx={{ 
              height: 48,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              },
              '&:disabled': {
                background: '#e0e0e0',
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Check Grammar'}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Fade in={true}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        </Fade>
      )}

      {result && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={500}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="text.secondary">
                    Original Text
                  </Typography>
                  <Typography variant="body1" sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    {result.originalText}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={700}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="text.secondary">
                    Corrected Text
                  </Typography>
                  <Typography variant="body1" sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 1, color: '#2e7d32' }}>
                    {result.correctedText}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12}>
            <Fade in={true} timeout={900}>
              <Card elevation={3}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    justifyContent: 'space-between',
                    gap: 3,
                    p: 3
                  }}>
                    <Box sx={{ 
                      width: { xs: '100%', md: '60%' },
                      pr: { md: 3 }
                    }}>
                      <Typography variant="h6" gutterBottom color="text.secondary">
                        Grammar Score
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={result.grammarScore} 
                        sx={{ 
                          height: 25, 
                          borderRadius: 12.5,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getScoreColor(result.grammarScore),
                            borderRadius: 12.5,
                            transition: 'all 0.5s ease-in-out'
                          }
                        }} 
                      />
                    </Box>
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      width: { xs: '100%', md: '40%' },
                      background: `linear-gradient(45deg, ${getScoreColor(result.grammarScore)} 30%, ${getScoreColor(result.grammarScore)}99 90%)`,
                      borderRadius: 2,
                      p: 3,
                      color: 'white',
                      minHeight: { xs: 'auto', md: '150px' },
                      transition: 'all 0.3s ease-in-out'
                    }}>
                      <Typography 
                        variant="h1" 
                        sx={{ 
                          fontWeight: 'bold',
                          lineHeight: 1,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                          mb: 1,
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        {result.grammarScore}
                      </Typography>
                      <Typography 
                        variant="h5"
                        sx={{ 
                          opacity: 0.9,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        out of 100
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12}>
            <Fade in={true} timeout={1100}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="text.secondary">
                    Explanation
                  </Typography>
                  <Typography variant="body1" sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, whiteSpace: 'pre-line' }}>
                    {result.explanation}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default App
