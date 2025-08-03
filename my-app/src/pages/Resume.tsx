import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Card, 
  CardContent, 
  Button,
  Chip,
  Stack,
  Paper,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Download as DownloadIcon,
  LinkedIn as LinkedInIcon,
  Work,
  School,
  Code,
  Email,
  LocationOn,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import PageLayout from '../components/PageLayout';
import { linkedInService } from '../lib/linkedInService';

// Types for resume data structure
interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
  technologies?: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  honors?: string;
}

interface Skill {
  category: string;
  skills: string[];
}

interface ContactInfo {
  email: string;
  location: string;
  linkedin: string;
  github?: string;
}

interface ResumeData {
  contactInfo: ContactInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: string[];
  lastUpdated: string;
}

const Resume: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample data structure - in a real implementation, this would come from LinkedIn API or a database
  const sampleResumeData: ResumeData = {
    contactInfo: {
      email: "james.caldwell82@outlook.com",
      location: "Monticello, MN",
      linkedin: "https://www.linkedin.com/in/james-caldwell-686042138/",
      github: "https://github.com/jamescaldwell82"
    },
    summary: "Experienced Software Engineer and Technical Trainer with a passion for full-stack development, mentoring, and creating impactful solutions in healthcare technology. Proven track record in ASP.NET Core, React, and modern web technologies.",
    workExperience: [
      {
        id: "1",
        company: "Quest Analytics, LLC",
        position: "Software Engineer",
        location: "Overland Park, KS (Remote)",
        startDate: "2023",
        endDate: "Present",
        current: true,
        responsibilities: [
          "Part of founding team for new outreach platform, seeing successful launch in 2023",
          "Develop and maintain outreach applications managing healthcare practitioner data",
          "Improved page load times from ~45s to under 5s by optimizing API calls and implementing lazy load",
          "Set a high standard for clean code principles and design patterns for maintainable solutions",
          "Collaborate with cross-functional teams to launch and grow the outreach platform",
          "Contribute to architecture discussions and code reviews to ensure quality and scalability",
          "Implement unit tests and functional tests to ensure reliability and performance"
        ],
        technologies: ["C#", "ASP.NET Core", "HotChocolate", "MassTransit", "T-SQL", "MongoDB", "Azure Blob Storage", "React", "TypeScript", "GraphQL", "React-Relay", "MUI", "Azure DevOps"]
      },
      {
        id: "2",
        company: "Centriq Training",
        position: "Technical Trainer & Co-Lead",
        location: "Kansas City, MO",
        startDate: "2019",
        endDate: "2023",
        current: false,
        responsibilities: [
          "Instructed full-stack development bootcamp students in career transition",
          "Developed curriculum for ReactJS and ASP.NET Core technologies",
          "Mentored students through hands-on projects and career preparation",
          "Achieved CompTIA CTT+ certification for technical training excellence",
          "Collaborated with industry partners to enhance curriculum relevance",
          "Led team of instructors to improve student outcomes and engagement"
        ],
        technologies: ["React", "ASP.NET Core", "ASP.NET MVC", "JavaScript", "C#", "SQL", "HTML/CSS", "Firebase", "Git", "Bootstrap", "jQuery"]
      },
      {
        id: "3",
        company: "Houlihan's Restaurant Group",
        position: "Full Stack Developer (Contract)",
        location: "Leawood, KS",
        startDate: "2018",
        endDate: "2019",
        current: false,
        responsibilities: [
          "Built and maintained bristolseafoodgrill.com and devonseafood.com",
          "Developed responsive web applications using ASP.NET WebForms",
          "Implemented responsive design principles to create new sites in a CMS-driven environment",
          "Collaborated with marketing team on digital presence strategy",
          "Implemented SEO best practices to improve site visibility",
          "Ensured cross-browser compatibility and accessibility standards",
          "Collaborated with design team to modify and adapt initial designs into functional web applications",
          "Successfully launched new sites within expected deadlines",
          "During extension to my contract, I successfully wrote a SQL Stored Procedure for a `Find the closest restaurant` feature, improving user experience and search functionality"
        ],
        technologies: ["ASP.NET MVC", "ASP.NET WebForms", "DotNetNuke", "Evoq CMS" ,"C#", "JavaScript", "SQL Server", "HTML/CSS"]
      },
      {
        id: "4",
        company: "Christ Lutheran Church",
        position: "Children's Ministry Coordinator",
        location: "Overland Park, KS",
        startDate: "2011",
        endDate: "2017",
        current: false,
        responsibilities: [
          "Led team of 100+ volunteers in children's ministry programs",
          "Created and implemented weekly curriculum for various age groups",
          "Developed volunteer recruitment and training programs",
          "Grew summer camp program from 100 to 200+ participants",
          "Worked with parents to ensure a positive experience for children and families",
          "Collaborated with church leadership to align programs with community needs"
        ],
        technologies: []
      }
    ],
    education: [
      {
        id: "1",
        institution: "Centriq Training",
        degree: "Certificate",
        field: "Full Stack Web Development",
        graduationDate: "2018",
        honors: "Graduate"
      },
      {
        id: "2",
        institution: "Grace University",
        degree: "Bachelor of Arts",
        field: "Psychology",
        graduationDate: "2011",
        honors: "Graduated with Honors"
      }
    ],
    skills: [
      {
        category: "Programming Languages",
        skills: ["C#", "JavaScript", "TypeScript", "SQL"]
      },
      {
        category: "Frameworks & Libraries",
        skills: ["ASP.NET Core", "React", "Node.js", "Express", "Material-UI", "Entity Framework Core", "Rest APIs", "jQuery", "DotNetNuke", "Evoq CMS", "HotChocolate"]
      },
      {
        category: "Databases",
        skills: ["SQL Server", "NoSQL", "Firebase", "MongoDB", "Azure Blob Storage"]
      },
      {
        category: "Cloud & DevOps",
        skills: ["Azure", "Azure DevOps", "Docker", "Git", "CI/CD", "Figma"]
      },
      {
        category: "Testing & Monitoring",
        skills: ["Unit Testing", "XUnit", "DataDog", "Postman", "Swagger", "Full Story"]
      },
      {
        category: "Soft Skills",
        skills: ["Technical Training", "Team Leadership", "Mentoring", "Project Management", "Problem Solving", "Communication", "Collaboration", "Attention to Detail", "Adaptability", "Self-Starter"]
      }
    ],
    certifications: [
      "CompTIA CTT+ (Certified Technical Trainer)"
    ],
    lastUpdated: new Date().toLocaleDateString()
  };

  // Simulate loading resume data (in real implementation, this would fetch from LinkedIn or your API)
  const loadResumeData = async () => {
    setLoading(true);
    try {
      // Check if LinkedIn integration is available
      if (linkedInService.isAuthenticated()) {
        const linkedInProfile = await linkedInService.getProfile();
        if (linkedInProfile) {
          const transformedData = linkedInService.transformLinkedInData(linkedInProfile);
          setResumeData(transformedData);
          return;
        }
      }
      
      // Fallback to sample data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResumeData(sampleResumeData);
    } catch (error) {
      console.error('Failed to load resume data:', error);
      // Fallback to sample data on error
      setResumeData(sampleResumeData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumeData();
  }, []);

  const handleDownloadPDF = () => {
    // In a real implementation, this would download the latest PDF from your server
    const link = document.createElement('a');
    link.href = '/james-caldwell-resume.pdf'; // You'll need to add this file to the public folder
    link.download = 'James-Caldwell-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date: string) => {
    if (date === 'Present') return date;
    return date;
  };

  if (loading) {
    return (
      <PageLayout title="Resume">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress sx={{ color: '#64ffda' }} />
        </Box>
      </PageLayout>
    );
  }

  if (!resumeData) {
    return (
      <PageLayout title="Resume">
        <Alert severity="error">
          Failed to load resume data. Please try refreshing the page.
        </Alert>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Resume">
      <Container maxWidth="lg">
        {/* Header with contact info and actions */}
        <Paper 
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'rgba(26, 26, 26, 0.8)', // Semi-transparent to show roadmap background
            backdropFilter: 'blur(10px)', // Add blur effect
            border: '1px solid rgba(100, 255, 218, 0.3)'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              gap: 3
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ color: '#64ffda', mb: 2 }}>
                James Caldwell
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                Software Engineer & Technical Trainer
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Box display="flex" alignItems="center">
                  <Email sx={{ mr: 1, color: '#64ffda' }} />
                  <Typography variant="body2">{resumeData.contactInfo.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocationOn sx={{ mr: 1, color: '#64ffda' }} />
                  <Typography variant="body2">{resumeData.contactInfo.location}</Typography>
                </Box>
              </Stack>
            </Box>
            <Box sx={{ minWidth: { xs: '100%', md: '300px' } }}>
              <Stack spacing={2} alignItems={{ xs: 'stretch', md: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadPDF}
                  sx={{
                    bgcolor: '#64ffda',
                    color: '#000',
                    '&:hover': { bgcolor: '#4ecdc4' }
                  }}
                >
                  Download PDF
                </Button>
                <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                  <Tooltip title="Refresh from LinkedIn">
                    <IconButton 
                      onClick={loadResumeData}
                      sx={{ color: '#64ffda' }}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View LinkedIn Profile">
                    <IconButton 
                      component="a"
                      href={resumeData.contactInfo.linkedin}
                      target="_blank"
                      sx={{ color: '#0077b5' }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Typography variant="caption" color="text.secondary" textAlign="right">
                  Last updated: {resumeData.lastUpdated}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>

        {/* Professional Summary */}
        <Card sx={{ mb: 4, bgcolor: 'rgba(26, 26, 26, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#64ffda', mb: 2 }}>
              Professional Summary
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {resumeData.summary} . . .See <a href="/bio">Bio</a> for more details
            </Typography>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card sx={{ mb: 4, bgcolor: 'rgba(26, 26, 26, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#64ffda', mb: 3 }}>
              <Work sx={{ mr: 1, verticalAlign: 'middle' }} />
              Work Experience
            </Typography>
            <Stack spacing={3}>
              {resumeData.workExperience.map((job) => (
                <Box key={job.id}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {job.position}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#64ffda' }}>
                      {job.company} • {job.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(job.startDate)} - {formatDate(job.endDate)}
                    </Typography>
                  </Box>
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {job.responsibilities.map((responsibility, index) => (
                      <Typography key={index} variant="body2" sx={{ pl: 2 }}>
                        • {responsibility}
                      </Typography>
                    ))}
                  </Stack>
                  {job.technologies && job.technologies.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {job.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(100, 255, 218, 0.1)',
                            color: '#64ffda',
                            border: '1px solid rgba(100, 255, 218, 0.3)'
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Education */}
        <Card sx={{ mb: 4, bgcolor: 'rgba(26, 26, 26, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#64ffda', mb: 3 }}>
              <School sx={{ mr: 1, verticalAlign: 'middle' }} />
              Education
            </Typography>
            <Stack spacing={2}>
              {resumeData.education.map((edu) => (
                <Box key={edu.id}>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    {edu.degree} in {edu.field}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#64ffda' }}>
                    {edu.institution}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Graduated: {edu.graduationDate}
                    {edu.honors && ` • ${edu.honors}`}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card sx={{ mb: 4, bgcolor: 'rgba(26, 26, 26, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#64ffda', mb: 3 }}>
              <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
              Technical Skills
            </Typography>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3
              }}
            >
              {resumeData.skills.map((skillGroup, index) => (
                <Box key={index}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    {skillGroup.category}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skillGroup.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        sx={{
                          bgcolor: 'rgba(100, 255, 218, 0.1)',
                          color: '#64ffda',
                          border: '1px solid rgba(100, 255, 218, 0.3)'
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <Card sx={{ mb: 4, bgcolor: 'rgba(26, 26, 26, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: '#64ffda', mb: 3 }}>
                Certifications
              </Typography>
              <Stack spacing={1}>
                {resumeData.certifications.map((cert, index) => (
                  <Typography key={index} variant="body1">
                    • {cert}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Container>
    </PageLayout>
  );
};

export default Resume;
