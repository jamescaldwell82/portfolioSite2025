import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { 
  Home as HomeIcon,
  Star as StarIcon,
  SportsEsports as GameIcon
} from '@mui/icons-material';

interface Mole {
  id: number;
  isUp: boolean;
  isGolden: boolean;
  isHit: boolean;
}

const NotFound: React.FC = () => {
  const [moles, setMoles] = useState<Mole[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'won' | 'lost'>('waiting');
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize moles
  useEffect(() => {
    const initialMoles: Mole[] = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      isUp: false,
      isGolden: false,
      isHit: false
    }));
    setMoles(initialMoles);
  }, []);

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('lost');
    }
  }, [timeLeft, gameState]);

  // Mole popping logic
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setMoles(prevMoles => {
        // Reset all moles
        const newMoles = prevMoles.map(mole => ({
          ...mole,
          isUp: false,
          isGolden: false,
          isHit: false
        }));

        // Randomly pop up 2-4 moles
        const numMoles = Math.floor(Math.random() * 3) + 2;
        const availableIndices = Array.from({ length: 9 }, (_, i) => i);
        
        for (let i = 0; i < numMoles; i++) {
          if (availableIndices.length === 0) break;
          
          const randomIndex = Math.floor(Math.random() * availableIndices.length);
          const moleIndex = availableIndices.splice(randomIndex, 1)[0];
          
          newMoles[moleIndex].isUp = true;
        }

        // Make one of the up moles golden (20% chance)
        const upMoles = newMoles.filter(mole => mole.isUp);
        if (upMoles.length > 0 && Math.random() < 0.2) {
          const goldenIndex = Math.floor(Math.random() * upMoles.length);
          const goldenMole = upMoles[goldenIndex];
          goldenMole.isGolden = true;
        }

        return newMoles;
      });
    }, 1500); // New moles every 1.5 seconds

    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
  }, []);

  const hitMole = useCallback((moleId: number) => {
    setMoles(prevMoles => {
      const newMoles = [...prevMoles];
      const mole = newMoles[moleId];
      
      if (!mole.isUp || mole.isHit) return prevMoles;
      
      mole.isHit = true;
      
      if (mole.isGolden) {
        // Golden mole hit! You win!
        setGameState('won');
        setScore(prevScore => prevScore + 100);
      } else {
        // Regular mole hit
        setScore(prevScore => prevScore + 10);
      }
      
      return newMoles;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('waiting');
    setScore(0);
    setTimeLeft(30);
    setGameStarted(false);
    setMoles(prevMoles => prevMoles.map(mole => ({
      ...mole,
      isUp: false,
      isGolden: false,
      isHit: false
    })));
  }, []);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        py: 4
      }}
    >
      <Container 
        maxWidth={false}
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          width: {
            xs: '100%',      // 100% on small screens
            sm: '100%',      // 100% on small+ screens  
            md: '75%',       // 75% on medium screens
            lg: '50%',       // 50% on large screens
            xl: '50%'        // 50% on extra large screens
          },
          px: { xs: 2, sm: 3, md: 0 } // Remove horizontal padding on md+ since we're controlling width
        }}
      >
        <Card
          sx={{
            background: 'rgba(26, 26, 26, 0.9)',
            backdropFilter: 'blur(15px)',
            border: '2px solid #64ffda',
            borderRadius: '20px',
            overflow: 'visible',
            boxShadow: '0 10px 40px rgba(100, 255, 218, 0.2)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 6 }, textAlign: 'center' }}>
            {/* Header */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4rem' },
                fontWeight: 'bold',
                color: '#ff6b6b',
                mb: 1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                color: '#fff',
                mb: 2,
                fontWeight: 500
              }}
            >
              Oops! Page Not Found! 🕳️
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: '#ccc',
                mb: 4,
                lineHeight: 1.6
              }}
            >
              Don't worry! Play some Whack-a-Mole to pass the time. 
              <br />
              One of the moles is <strong style={{ color: '#FFD700' }}>GOLDEN</strong> - find it to unlock your way home! ✨
            </Typography>

            {/* Game Stats */}
            {gameStarted && (
              <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                sx={{ mb: 3 }}
              >
                <Chip
                  label={`Score: ${score}`}
                  sx={{
                    backgroundColor: 'rgba(100, 255, 218, 0.2)',
                    color: '#64ffda',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                />
                <Chip
                  label={`Time: ${timeLeft}s`}
                  sx={{
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    color: '#ff6b6b',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                />
              </Stack>
            )}

            {/* Game States */}
            {gameState === 'waiting' && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ color: '#64ffda', mb: 2 }}
                >
                  🎯 Ready to Play?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#ccc', mb: 3 }}
                >
                  Hit moles for points, but one random mole is GOLDEN and wins instantly!
                  <br />
                  <em style={{ color: '#FFD700' }}>You won't know which one until you hit it! 🎯</em>
                </Typography>
              </Box>
            )}

            {gameState === 'won' && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#FFD700',
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    fontWeight: 'bold',
                    animation: 'victory 1s ease-in-out infinite alternate',
                    '@keyframes victory': {
                      '0%': { transform: 'scale(1)', textShadow: '0 0 10px #FFD700' },
                      '100%': { transform: 'scale(1.05)', textShadow: '0 0 20px #FFD700' }
                    }
                  }}
                >
                  🏆 YOU WON! 🏆
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#64ffda', mb: 2 }}
                >
                  Amazing! You found the golden mole! 🌟
                </Typography>
              </Box>
            )}

            {gameState === 'lost' && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ color: '#ff6b6b', mb: 2 }}
                >
                  ⏰ Time's Up!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#ccc', mb: 2 }}
                >
                  The golden mole got away this time! Try again?
                </Typography>
              </Box>
            )}

            {/* Whack-a-Mole Game Grid */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                background: 'rgba(139, 69, 19, 0.3)', // Brown for dirt
                borderRadius: '15px',
                border: '2px solid rgba(139, 69, 19, 0.5)'
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 80px)',
                  gap: 1,
                  justifyContent: 'center',
                  maxWidth: '300px',
                  mx: 'auto'
                }}
              >
                {moles.map((mole) => (
                  <Box
                    key={mole.id}
                    onClick={() => hitMole(mole.id)}
                    sx={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'rgba(101, 67, 33, 0.8)', // Darker brown for holes
                      border: '3px solid #654321',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: gameState === 'playing' ? 'pointer' : 'default',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      '&:hover': gameState === 'playing' ? {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 15px rgba(100, 255, 218, 0.3)'
                      } : {},
                    }}
                  >
                    {mole.isUp && !mole.isHit && (
                      <Box
                        sx={{
                          fontSize: '2.5rem',
                          animation: 'popUp 0.3s ease-out',
                          '@keyframes popUp': {
                            '0%': { transform: 'translateY(20px) scale(0)' },
                            '100%': { transform: 'translateY(0) scale(1)' }
                          }
                        }}
                      >
                        🐭
                      </Box>
                    )}
                    {mole.isHit && (
                      <Box
                        sx={{
                          fontSize: '1.5rem',
                          animation: 'hitEffect 0.5s ease-out',
                          '@keyframes hitEffect': {
                            '0%': { transform: 'scale(1)', opacity: 1 },
                            '100%': { transform: 'scale(0.5)', opacity: 0 }
                          }
                        }}
                      >
                        {mole.isGolden ? '🥇' : '💥'}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {gameState === 'waiting' && (
                <Button
                  onClick={startGame}
                  variant="contained"
                  size="large"
                  startIcon={<GameIcon />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    backgroundColor: '#64ffda',
                    color: '#000',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: '#4ecdc4',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 30px rgba(100, 255, 218, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start Game! 🎮
                </Button>
              )}

              {gameState === 'won' && (
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  size="large"
                  startIcon={<StarIcon />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    backgroundColor: '#FFD700',
                    color: '#000',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    animation: 'goldGlow 2s ease-in-out infinite alternate',
                    '&:hover': {
                      backgroundColor: '#FFC107',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 30px rgba(255, 215, 0, 0.5)'
                    },
                    transition: 'all 0.3s ease',
                    '@keyframes goldGlow': {
                      '0%': { boxShadow: '0 5px 20px rgba(255, 215, 0, 0.3)' },
                      '100%': { boxShadow: '0 10px 40px rgba(255, 215, 0, 0.6)' }
                    }
                  }}
                >
                  Victory! Go Home! 🏠
                </Button>
              )}

              {(gameState === 'lost' || gameState === 'won') && (
                <Button
                  onClick={resetGame}
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    borderColor: '#64ffda',
                    color: '#64ffda',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    borderWidth: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      borderColor: '#4fd3a6',
                      color: '#4fd3a6',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 30px rgba(100, 255, 218, 0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Play Again 🔄
                </Button>
              )}

              {gameState !== 'won' && (
                <Button
                  component={Link}
                  to="/"
                  variant="outlined"
                  size="large"
                  startIcon={<HomeIcon />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    borderColor: '#ff6b6b',
                    color: '#ff6b6b',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    borderWidth: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      borderColor: '#ff8a80',
                      color: '#ff8a80',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Give Up (Go Home)
                </Button>
              )}
            </Stack>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 4,
                color: '#888',
                fontSize: '0.9rem',
                fontStyle: 'italic'
              }}
            >
              🤫 The golden mole looks just like the others - it's a mystery until you hit it! ✨
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NotFound;
