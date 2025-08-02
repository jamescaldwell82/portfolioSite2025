import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';

interface Project {
  id: number;
  title: string;
  url: string;
  image: string;
  technologies: string[];
  productWriteup: {
    purpose: string;
    learnings: string[];
  };
  technicalWriteup: {
    implementation: string;
    learnings: string[];
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Bristol Seafood Grill',
    url: 'https://bristolseafoodgrill.com',
    image: 'https://via.placeholder.com/400x250/1976d2/ffffff?text=Bristol+Seafood+Grill',
    technologies: ['WordPress', 'PHP', 'MySQL', 'Responsive Design'],
    productWriteup: {
      purpose: 'Create an elegant dining experience online that reflects the upscale atmosphere of Bristol Seafood Grill. The site needed to showcase the menu, ambiance, and reservation system while maintaining the sophisticated brand image.',
      learnings: [
        'Importance of visual hierarchy in restaurant websites',
        'Menu presentation significantly impacts customer decision-making',
        'Mobile-first design crucial for restaurant discovery',
        'Integration with reservation systems improves customer experience'
      ]
    },
    technicalWriteup: {
      implementation: 'Built on WordPress with custom theme development, integrated with OpenTable for reservations. Implemented responsive design with focus on menu readability and high-quality food photography optimization.',
      learnings: [
        'Custom WordPress theme development with PHP templating',
        'Image optimization techniques for food photography',
        'Third-party API integration (OpenTable reservation system)',
        'Performance optimization for image-heavy restaurant sites',
        'SEO implementation for local restaurant discovery'
      ]
    }
  },
  {
    id: 2,
    title: 'Devon Seafood Grill',
    url: 'https://devonseafood.com',
    image: 'https://via.placeholder.com/400x250/388e3c/ffffff?text=Devon+Seafood+Grill',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS3'],
    productWriteup: {
      purpose: 'Develop a multi-location restaurant website that maintains brand consistency while allowing location-specific content. Focus on creating an intuitive user experience for finding locations, viewing menus, and making reservations.',
      learnings: [
        'Multi-location business challenges require scalable content management',
        'Location-based user experience improves conversion rates',
        'Brand consistency across locations builds trust',
        'User journey mapping critical for restaurant websites'
      ]
    },
    technicalWriteup: {
      implementation: 'WordPress multisite implementation with location-specific customizations. Custom post types for menus and events, integrated mapping solutions, and centralized content management system.',
      learnings: [
        'WordPress multisite architecture and management',
        'Custom post types and meta fields for restaurant data',
        'Google Maps API integration for location services',
        'Content Management System design for non-technical users',
        'Database optimization for multi-location queries'
      ]
    }
  },
  {
    id: 3,
    title: 'React Resource Hub',
    url: '#',
    image: 'https://via.placeholder.com/400x250/f57c00/ffffff?text=React+Resource+Hub',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Firebase'],
    productWriteup: {
      purpose: 'Create a comprehensive learning platform for React developers with curated resources, tutorials, and interactive examples. Focus on providing value for developers at all skill levels.',
      learnings: [
        'Developer education requires hands-on interactive examples',
        'Content curation is as valuable as content creation',
        'Community features enhance learning engagement',
        'Progressive complexity helps user retention'
      ]
    },
    technicalWriteup: {
      implementation: 'React application with TypeScript for type safety, Material-UI for consistent design system, Firebase for authentication and data storage. Implemented code playground for interactive examples.',
      learnings: [
        'TypeScript integration in React applications',
        'Component library implementation and theming',
        'Firebase Authentication and Firestore integration',
        'Code playground implementation with sandboxed execution',
        'Performance optimization for content-heavy applications'
      ]
    }
  },
  {
    id: 4,
    title: 'Inventory+ Portfolio POC',
    url: '#',
    image: 'https://via.placeholder.com/400x250/7b1fa2/ffffff?text=Inventory%2B+POC',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    productWriteup: {
      purpose: 'Develop a proof-of-concept inventory management system that demonstrates full-stack development capabilities. Focus on creating an intuitive interface for inventory tracking with real-time updates.',
      learnings: [
        'Inventory management requires real-time data synchronization',
        'User interface design for data-heavy applications',
        'Dashboard design principles for business applications',
        'Importance of data validation and error handling'
      ]
    },
    technicalWriteup: {
      implementation: 'Full-stack MERN application with real-time updates using WebSockets. RESTful API design with comprehensive CRUD operations, data validation, and user authentication system.',
      learnings: [
        'MERN stack architecture and implementation',
        'WebSocket integration for real-time updates',
        'RESTful API design and best practices',
        'Database schema design for inventory systems',
        'Authentication and authorization implementation'
      ]
    }
  },
  {
    id: 5,
    title: 'Personal Portfolio',
    url: 'https://jcaldwell.io',
    image: 'https://via.placeholder.com/400x250/d32f2f/ffffff?text=Personal+Portfolio',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Firebase', 'EmailJS'],
    productWriteup: {
      purpose: 'Create a modern, interactive portfolio that showcases technical skills while providing an engaging user experience. The site needed to balance professional presentation with personality and creativity.',
      learnings: [
        'Personal branding requires authentic voice and personality',
        'Interactive elements increase engagement and memorability',
        'Contact experience design impacts conversion rates',
        'Performance and accessibility are non-negotiable for portfolio sites'
      ]
    },
    technicalWriteup: {
      implementation: 'React application with TypeScript, Material-UI design system, Firebase hosting, and EmailJS for contact forms. Features include interactive 404 page, conversational contact form, and responsive design.',
      learnings: [
        'Modern React patterns with hooks and context',
        'TypeScript for type-safe development',
        'Material-UI customization and theming',
        'Firebase deployment and hosting configuration',
        'EmailJS integration for client-side email functionality'
      ]
    }
  }
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardMedia
        component="img"
        height="200"
        image={project.image}
        alt={project.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {project.title}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          {project.technologies.map((tech) => (
            <Chip key={tech} label={tech} size="small" variant="outlined" />
          ))}
        </Stack>

        <FormControlLabel
          control={
            <Switch
              checked={showTechnical}
              onChange={(e) => setShowTechnical(e.target.checked)}
              color="primary"
            />
          }
          label={showTechnical ? "Technical View" : "Product View"}
          sx={{ mb: 2 }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" paragraph>
            {showTechnical 
              ? project.technicalWriteup.implementation 
              : project.productWriteup.purpose
            }
          </Typography>

          <Typography variant="h6" gutterBottom>
            {showTechnical ? "Technical Learnings:" : "Product Learnings:"}
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            {(showTechnical 
              ? project.technicalWriteup.learnings 
              : project.productWriteup.learnings
            ).map((learning, index) => (
              <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                {learning}
              </Typography>
            ))}
          </Box>
        </Box>

        <Button
          variant="contained"
          endIcon={<LaunchIcon />}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          disabled={project.url === '#'}
          sx={{ mt: 'auto' }}
        >
          {project.url === '#' ? 'Coming Soon' : 'View Site'}
        </Button>
      </CardContent>
    </Card>
  );
};

const Projects: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Projects
      </Typography>
      
      <Typography variant="h5" component="p" align="center" color="text.secondary" sx={{ mb: 6 }}>
        A showcase of my development work with insights into both product thinking and technical implementation.
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          md: 'repeat(2, 1fr)' 
        }, 
        gap: 4 
      }}>
        {projectsData.map((project) => (
          <Box key={project.id}>
            <ProjectCard project={project} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
