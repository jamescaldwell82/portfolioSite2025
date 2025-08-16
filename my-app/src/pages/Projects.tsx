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
import SEO from '../components/SEO';

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
    technologies: ["ASP.NET MVC", "ASP.NET WebForms", "DotNetNuke", "Evoq CMS" ,"C#", "JavaScript", "SQL Server", "HTML/CSS"],
    productWriteup: {
      purpose: 'Create an elegant dining experience online that reflects the upscale atmosphere of Bristol Seafood Grill. The multi-location restaurant needed to showcase the menu, ambiance, and reservation system while maintaining the sophisticated brand image.',
      learnings: [
        "Recognized the importance of personal organization and time management in a solo contract role, using Trello to track tasks and deadlines",
        "Collaboration with key stakeholders is key to gain the trust of the client and ensure project success",
        "Importance of streamlining user experiences to keep the bounce rate low",
        "Understanding the balance between following design specifications and making practical adjustments for user experience",
        "Asking questions to confirm understanding of requirements can save time and effort in the long run and keep surprises to a minimum"
      ]
    },
    technicalWriteup: {
      implementation: 'Built on Evoq CMS with custom module development in HTML/CSS/JS, integrated with OpenTable for reservations. This was a contract role, and I was working solo.',
      learnings: [
        'Custom Evoq CMS module development for dynamic content',
        'HTML/CSS/JS integration for custom theme and responsive design',
        'OpenTable API integration for reservation management',
        'SEO best practices for restaurant websites',
        'Cross-browser compatibility testing and optimization using tools like Google Lighthouse',
        'Some of the limits to plugins and module development in Evoq CMS created a need for custom solutions, which improved my problem-solving skills'
      ]
    }
  },
  {
    id: 2,
    title: 'Devon Seafood Grill',
    url: 'https://devonseafood.com',
    image: 'https://via.placeholder.com/400x250/388e3c/ffffff?text=Devon+Seafood+Grill',
    technologies: ["ASP.NET MVC", "ASP.NET WebForms", "DotNetNuke", "Evoq CMS" ,"C#", "JavaScript", "SQL Server", "HTML/CSS"],
    productWriteup: {
      purpose: 'Develop a multi-location restaurant website that maintains brand consistency while allowing location-specific content. Focus on creating an intuitive user experience for finding locations, viewing menus, and making reservations.',
      learnings: [
        'Creating these sites after Bristol Seafood Grill helped me recognize the importance of scalable content management for multi-location businesses',
        'The importance of knowing the questions to ask can help refine the project scope and ensure all requirements are met',
        'Creating modules set the tone for my future React projects, where I could create reusable components that could be used across multiple projects',
        'The importance of knowing the product can help ensure work items are completely refined and ready from development to deployment',
        'Taking the time to be detailed in testing can oftentimes be more valueable than rushing to meet a deadline'
      ]
    },
    technicalWriteup: {
      implementation: 'Built on Evoq CMS with custom module development in HTML/CSS/JS, integrated with OpenTable for reservations. This was a contract role, and I was working solo.',
      learnings: [
        'Custom Evoq CMS module development for dynamic content',
        'HTML/CSS/JS integration for custom theme and responsive design',
        'OpenTable API integration for reservation management',
        'SEO best practices for restaurant websites',
        'Cross-browser compatibility testing and optimization using tools like Google Lighthouse',
        'Some of the limits to plugins and module development in Evoq CMS created a need for custom solutions, which improved my problem-solving skills'
      ]
    }
  },
  {
    id: 3,
    title: 'React Resource Hub',
    url: '#',
    image: 'https://via.placeholder.com/400x250/f57c00/ffffff?text=React+Resource+Hub',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Firebase', 'ASP.NET Core API', 'Axios', 'T-SQL', 'Node.js'],
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
      implementation: 'React application with TypeScript for type safety, Material-UI for consistent design system, ASP.NET Core API for backend services, Firebase for authentication and data storage. Implemented code playground for interactive examples.',
      learnings: [
        'React/JS application architecture best practices with atomic design principles',
        'Component library implementation and theming',
        'Bootstrap for responsive design',
        'Teaches full CRUD functionality with Axios data fetching, including error handling and loading states',
        'Firebase Authentication integration',
        'Code playground implementation with sandboxed execution',
        'First time implementing React-Router-Dom for client-side routing',
        'React best practices for state management and component lifecycle'
      ]
    }
  },
  {
    id: 4,
    title: 'Quest Outreach Platform',
    url: '#',
    image: 'https://via.placeholder.com/400x250/7b1fa2/ffffff?text=Quest+Outreach+Platform',
    technologies: ["C#", "ASP.NET Core", "HotChocolate", "MassTransit", "T-SQL", "MongoDB", "Azure Blob Storage", "React", "TypeScript", "GraphQL", "React-Relay", "MUI", "Azure DevOps"],
    productWriteup: {
      purpose: 'Develop an outreach platform, that performs email, phone, fax, and direct mail outreach to healthcare practitioner offices. The platform receives thousands of users per day and thus optimization and scalability have been and continue to be a focus. The platform is built on a microservices architecture with a focus on modularity and scalability, using the latest technologies like GraphQL and React-Relay for efficient data fetching and state management. Based in Azure DevOps platform, this project has been insightful as to how to organize and manage complex workflows.',
      learnings: [
        'Importance of active participation in SCRUM ceremonies to ensure alignment and efficiency in completing work items',
        'Variance in strengths among developers can be leveraged to create a more efficient team',
        'A good balance between process and flexibility is crucial for team success',
        'Understanding stakeholders\' needs and expectations is key to delivering value',
        'Creating testing strategies can save a lot of time and effort for my QA team'
      ]
    },
    technicalWriteup: {
      implementation: 'Based in ASP.NET Core with HotChocolate for GraphQL API, MassTransit for message queuing, SQL Server, MongoDB and Azure Blob Storage for data storage, this project has been a significant learning experience in building scalable, high-performance applications.',
      learnings: [
        'Importance of alignment between development teams is key to delivering value efficiently',
        'Understanding best practices for database queries and optimizations can significantly improve performance',
        'Critical thinking to ensure edge cases are caught prior to production deployment',
        'Monitoring and logging are essential for debugging and performance tuning',
        'Code reviews are important for the entire development team to understand the codebase and improve overall quality'
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
        'Utilizing CoPilot for rapid prototyping and code generation with a critical eye for simplicity and maintainability',
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
    <>
      <SEO 
        title="Projects - James Caldwell"
        description="View James Caldwell's software development projects and portfolio. Explore applications built with React, TypeScript, Firebase, and other modern technologies."
        keywords="James Caldwell Projects, Software Development Portfolio, React Projects, TypeScript Applications, Firebase Apps, Web Development"
        url="https://portfoliosite2025-3f6d7.web.app/projects"
      />
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
    </>
  );
};

export default Projects;
