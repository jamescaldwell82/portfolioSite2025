import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Card, 
  CardContent, 
  Collapse, 
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  School,
  VolunteerActivism,
  Code,
  School as TeachIcon,
  Work,
  Home
} from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

interface TimelineChapter {
  id: number;
  period: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  content: React.ReactNode;
}

const Bio: React.FC = () => {
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

const chapters: TimelineChapter[] = [
    {
        id: 1,
        period: '2005-2011',
        title: 'School completion/Stay-at-home dad',
        icon: <School />,
        color: '#64ffda',
        content: "During this chapter, I spent my energy on taking care of my 3 sons as they were in their newborn-preschool ages. It was honestly one of the more rewarding chapters of my life, getting to mobilize our family by allowing my wife to begin her career while watching the everyday journey of each my sons maturing into boys and subsequently into men. Meanwhile, I was able to complete my undergraduate studies with honors, achieving a bachelor's degree in Psychology."
    },
    {
        id: 2,
        period: '2011-2017',
        title: 'Non-profit sector',
        icon: <VolunteerActivism />,
        color: '#ff6b6b',
        content: "While my sons were in school, I worked as a Children's Ministry Coordinator at a large church in Overland Park, KS. I led a team of roughly 100 volunteers, crafting weekly curriculum, recruiting and training volunteers, and leading the team towards the values/expectations of families in the congregation. I also served as a day camp director for one year, creating the program and seeing it through to realization. While it was an extremely successful year and chapter of my life, I desired to challenge myself to a career where I needed to learn something new everyday."
    },
    {
        id: 3,
        period: '2018-19',
        title: 'Career change to Software Development',
        icon: <Code />,
        color: '#4ecdc4',
        content: (
            <>
                I attended Centriq Training's Full Stack Developer program for 4 months in the spring of 2018, where I learned ASP.NET MVC development, getting a strong foundation in my technical skills. After graduating the program, I was hired by Houlihans Restaurants Inc to build{' '}
                <a href="https://bristolseafoodgrill.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4ecdc4', textDecoration: 'underline' }}>
                    bristolseafoodgrill.com
                </a>{' '}
                and{' '}
                <a href="https://devonseafood.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4ecdc4', textDecoration: 'underline' }}>
                    devonseafood.com
                </a>
                . While I learned a lot in this role as a contractor, Centriq Training hired me to become a .NET technical trainer.
            </>
        )
    },
    {
        id: 4,
        period: '2019-2023',
        title: 'Technical Training',
        icon: <TeachIcon />,
        color: '#45b7d1',
        content: "Teaching full stack development and mentoring other students to change careers was so extremely rewarding. It continues to be a passion of mine to help new developers to get their feet on the ground and succeed in this field. Teaching truly helps us to better understand the content we are instructing others in. During this time, I worked myself into a co-lead role in the full stack development program, writing new curriculum in ReactJS and ASP.NET Core technologies. I also worked to become certified as a CompTIA CTT+ technical trainer, which led me to a better understanding of how to train in technology."
    },
    {
        id: 5,
        period: '2023-current',
        title: 'Software Engineering',
        icon: <Work />,
        color: '#96ceb4',
        content: "I now find myself working full-time at Quest Analytics, LLC as a software engineer, helping to develop and support our outreach applications that manages to perfect healthcare practitioner data. It has been amazing to be a part of creating, launching, and watching our outreach platform grow. I've learned so much about performance tuning a young application, and using design patterns that allow for clean code."
    },
    {
        id: 6,
        period: '2024',
        title: 'Minnesota Bound',
        icon: <Home />,
        color: '#feca57',
        content: "In the summer of 2024, my wife and I decided to move our 3 teenage boys and my mom from Olathe, KS to Monticello, MN, pursuing a long time personal dream. Our love for snowy winters and moderate summers, along with a love for outdoor activities, have both been satisfied by this move towards our dream to own land in the great lakes region. It has been really fun to learn about a new community and where our family can take part in the area. In our first year, I helped to coach our youngest son's hockey team and my wife, Erin, served as the team manager. It was the best way to get to know some local families and make friends where we live. I've definitely learned to make life a journey and take a risk every once in a while."
    }
];

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <PageLayout title="My Journey">
      <Container maxWidth="md">
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center', 
            mb: 2,
            color: '#64ffda',
            fontWeight: 'bold'
          }}
        >
          Life Chapters
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            color: 'text.secondary',
            fontSize: '1.1rem'
          }}
        >
          Click on any chapter to explore that part of my journey
        </Typography>

        <Stack spacing={3}>
          {chapters.map((chapter) => (
            <Card
              key={chapter.id}
              sx={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                border: `2px solid ${chapter.color}`,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 25px ${chapter.color}40`
                }
              }}
            >
              <CardContent 
                sx={{ 
                  p: 0,
                  '&:last-child': { pb: 0 }
                }}
              >
                <Box
                  onClick={() => toggleChapter(chapter.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    },
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: chapter.color,
                      color: '#000',
                      mr: 3,
                      flexShrink: 0
                    }}
                  >
                    {chapter.icon}
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={chapter.period}
                        sx={{
                          backgroundColor: chapter.color,
                          color: '#000',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      {chapter.title}
                    </Typography>
                  </Box>

                  <IconButton
                    sx={{
                      color: chapter.color,
                      transform: expandedChapters.includes(chapter.id) 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>

                <Collapse in={expandedChapters.includes(chapter.id)}>
                  <Box
                    sx={{
                      px: 3,
                      pb: 3,
                      borderTop: `1px solid ${chapter.color}40`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.7,
                        fontSize: '1rem',
                        pt: 2
                      }}
                    >
                      {chapter.content}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#64ffda',
              fontStyle: 'italic',
              mb: 2
            }}
          >
            "Life is a journey, not a destination"
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Each chapter has shaped who I am today - from being a dedicated father and student, 
            to serving communities, pivoting to technology, teaching others, and now engineering 
            solutions while building a life in Minnesota. The journey continues...
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default Bio;
