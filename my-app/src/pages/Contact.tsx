import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Avatar,
  Chip,
  Stack,
  Fade,
  IconButton
} from '@mui/material';
import {
  Send as SendIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import PageLayout from '../components/PageLayout';
import { sendContactNotification, logContactData, type ContactData } from '../lib/contactService';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  typing?: boolean;
  options?: string[];
}

interface UserData {
  name?: string;
  contactMethod?: 'email' | 'phone' | 'linkedin';
  email?: string;
  phone?: string;
  linkedin?: string;
  inquiryType?: string;
  details?: string;
  company?: string;
}

const Contact: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = useCallback((text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: messageIdCounter.current++,
        text,
        sender: 'bot',
        timestamp: new Date(),
        options
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // Variable typing delay for realism
  }, []);

  useEffect(() => {
    // Prevent duplicate initialization using ref (survives re-renders)
    if (hasInitialized.current) return;
    
    hasInitialized.current = true;
    
    // Initial greeting
    setTimeout(() => {
      addBotMessage("Hey there! 👋 I'm James's AI assistant. I'd love to help connect you with him!");
      setTimeout(() => {
        addBotMessage("What brings you here today?", [
          "I'm interested in hiring James",
          "I have a project opportunity", 
          "I'd like to partner/collaborate",
          "I want to sell something to James",
          "Just want to network/chat"
        ]);
      }, 1500);
    }, 1000);
  }, [addBotMessage]);

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: messageIdCounter.current++,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickResponse = (option: string) => {
    addUserMessage(option);
    processResponse(option);
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      addUserMessage(currentInput);
      processResponse(currentInput);
      setCurrentInput('');
    }
  };

  const processResponse = (response: string) => {
    const lowerResponse = response.toLowerCase();
    
    switch (conversationStep) {
      case 0: // Initial inquiry type
        setUserData(prev => ({ ...prev, inquiryType: response }));
        setConversationStep(1);
        
        setTimeout(() => {
          if (lowerResponse.includes('sell') || lowerResponse.includes('service') || lowerResponse.includes('product')) {
            addBotMessage("I appreciate you reaching out! James gets a lot of sales inquiries, so let me help make sure yours stands out. 😊");
            setTimeout(() => {
              addBotMessage("What's your name?");
            }, 2000);
          } else if (lowerResponse.includes('hire') || lowerResponse.includes('job') || lowerResponse.includes('employ')) {
            addBotMessage("Exciting! James is always interested in great opportunities. 🚀");
            setTimeout(() => {
              addBotMessage("I'd love to learn more! What's your name?");
            }, 2000);
          } else if (lowerResponse.includes('project') || lowerResponse.includes('work')) {
            addBotMessage("Awesome! James loves working on interesting projects. 💡");
            setTimeout(() => {
              addBotMessage("Let's get acquainted - what's your name?");
            }, 2000);
          } else if (lowerResponse.includes('partner') || lowerResponse.includes('collaborat')) {
            addBotMessage("That sounds intriguing! James is always open to meaningful collaborations. 🤝");
            setTimeout(() => {
              addBotMessage("What's your name?");
            }, 2000);
          } else {
            addBotMessage("Great! James enjoys connecting with people. 😊");
            setTimeout(() => {
              addBotMessage("What's your name?");
            }, 2000);
          }
        }, 1500);
        break;

      case 1: // Getting name
        setUserData(prev => ({ ...prev, name: response }));
        setConversationStep(2);
        
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${response}! 😊`);
          setTimeout(() => {
            if (userData.inquiryType?.toLowerCase().includes('sell')) {
              addBotMessage("What company are you with?");
            } else {
              addBotMessage("Are you reaching out on behalf of a company, or is this personal?");  
            }
          }, 1500);
        }, 1200);
        break;

      case 2: // Company info
        setUserData(prev => ({ ...prev, company: response }));
        setConversationStep(3);
        
        setTimeout(() => {
          addBotMessage("Got it! How would you prefer James to reach back out to you?", [
            "Email works best",
            "Phone call preferred", 
            "LinkedIn message",
            "Any method is fine"
          ]);
        }, 1500);
        break;

      case 3: // Contact preference
        let contactMethod: 'email' | 'phone' | 'linkedin' = 'email';
        if (lowerResponse.includes('phone') || lowerResponse.includes('call')) {
          contactMethod = 'phone';
        } else if (lowerResponse.includes('linkedin')) {
          contactMethod = 'linkedin';
        }
        
        setUserData(prev => ({ ...prev, contactMethod }));
        setConversationStep(4);
        
        setTimeout(() => {
          if (contactMethod === 'phone') {
            addBotMessage("Perfect! What's the best number to reach you at?");
          } else if (contactMethod === 'linkedin') {
            addBotMessage("Great choice! What's your LinkedIn profile URL?");
          } else {
            addBotMessage("Sounds good! What's your email address?");
          }
        }, 1500);
        break;

      case 4: // Contact details
        if (userData.contactMethod === 'phone') {
          setUserData(prev => ({ ...prev, phone: response }));
        } else if (userData.contactMethod === 'linkedin') {
          setUserData(prev => ({ ...prev, linkedin: response }));
        } else {
          setUserData(prev => ({ ...prev, email: response }));
        }
        setConversationStep(5);
        
        setTimeout(() => {
          addBotMessage("Awesome! Last question - can you give me a quick overview of what you'd like to discuss with James?");
          setTimeout(() => {
            addBotMessage("(Just a sentence or two is perfect! This helps him prepare for your conversation)");
          }, 2000);
        }, 1500);
        break;

      case 5: // Final details
        setUserData(prev => ({ ...prev, details: response }));
        setConversationStep(6);
        setIsSubmitting(true);
        
        setTimeout(async () => {
          addBotMessage("Perfect! I've got everything I need. 📝");
          
          // Prepare contact data for sending
          const contactData: ContactData = {
            name: userData.name || 'Unknown',
            company: userData.company,
            inquiryType: userData.inquiryType || 'General inquiry',
            contactMethod: userData.contactMethod || 'email',
            email: userData.email,
            phone: userData.phone,
            linkedin: userData.linkedin,
            details: response
          };

          // Log the contact data for development
          logContactData(contactData);

          // Try to send the contact notification
          try {
            const sent = await sendContactNotification(contactData);
            
            setTimeout(() => {
              if (sent) {
                addBotMessage("✅ Message sent successfully!");
              } else {
                addBotMessage("⚠️ I'll make sure James gets your message through our backup system.");
              }
              
              setTimeout(() => {
                if (userData.inquiryType?.toLowerCase().includes('sell')) {
                  addBotMessage("I'll make sure James sees your info. He typically responds to sales inquiries within 2-3 business days if there's a potential fit.");
                } else if (userData.inquiryType?.toLowerCase().includes('hire')) {
                  addBotMessage("I'll get this to James right away! He's usually pretty quick to respond to interesting opportunities - typically within 24 hours.");
                } else {
                  addBotMessage("I'll pass this along to James! He usually gets back to people within 1-2 business days.");
                }
                
                setTimeout(() => {
                  addBotMessage("Thanks for taking the time to share those details - it really helps! 🙏");
                  setTimeout(() => {
                    addBotMessage("In the meantime, feel free to check out his other work or connect with him on social media!", [
                      "View James's Resume",
                      "Check out Projects", 
                      "LinkedIn Profile",
                      "Back to Home"
                    ]);
                    setIsSubmitting(false);
                  }, 2500);
                }, 3000);
              }, 2000);
            }, 1500);
          } catch (error) {
            console.error('Failed to send contact notification:', error);
            setTimeout(() => {
              addBotMessage("⚠️ I'll make sure James gets your message through our backup system.");
              setTimeout(() => {
                addBotMessage("I'll pass this along to James! He usually gets back to people within 1-2 business days.");
                setTimeout(() => {
                  addBotMessage("Thanks for taking the time to share those details - it really helps! 🙏");
                  setTimeout(() => {
                    addBotMessage("In the meantime, feel free to check out his other work or connect with him on social media!", [
                      "View James's Resume",
                      "Check out Projects", 
                      "LinkedIn Profile",
                      "Back to Home"
                    ]);
                    setIsSubmitting(false);
                  }, 2500);
                }, 3000);
              }, 2000);
            }, 1500);
          }
        }, 1500);
        break;

      case 6: // Post-completion actions
        if (lowerResponse.includes('resume')) {
          window.location.href = '/resume';
        } else if (lowerResponse.includes('project')) {
          window.location.href = '/projects';
        } else if (lowerResponse.includes('linkedin')) {
          window.open('https://www.linkedin.com/in/your-profile', '_blank');
        } else if (lowerResponse.includes('home')) {
          window.location.href = '/';
        }
        break;
    }
  };

  return (
    <PageLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(100, 255, 218, 0.3)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              p: 3,
              bgcolor: 'rgba(100, 255, 218, 0.1)',
              borderBottom: '1px solid rgba(100, 255, 218, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#64ffda',
                color: '#000',
                width: 40,
                height: 40,
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              JC
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                James Caldwell
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#4caf50'
                  }}
                />
                <Typography variant="caption" sx={{ color: '#ccc' }}>
                  Available via AI Assistant
                </Typography>
              </Stack>
            </Box>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            {messages.map((message) => (
              <Fade in={true} key={message.id}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 1
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '75%',
                      bgcolor: message.sender === 'user'
                        ? '#64ffda'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: message.sender === 'user' ? '#000' : '#fff',
                      borderRadius: message.sender === 'user'
                        ? '16px 16px 4px 16px'
                        : '16px 16px 16px 4px',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                    
                    {message.options && conversationStep !== 6 && (
                      <Stack spacing={1} sx={{ mt: 2 }}>
                        {message.options.map((option, index) => (
                          <Chip
                            key={index}
                            label={option}
                            onClick={() => handleQuickResponse(option)}
                            sx={{
                              bgcolor: 'rgba(100, 255, 218, 0.2)',
                              color: '#64ffda',
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'rgba(100, 255, 218, 0.3)'
                              }
                            }}
                          />
                        ))}
                      </Stack>
                    )}

                    {message.options && conversationStep === 6 && (
                      <Stack spacing={1} sx={{ mt: 2 }}>
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outlined"
                            size="small" 
                            onClick={() => handleQuickResponse(option)}
                            sx={{
                              borderColor: '#64ffda',
                              color: '#64ffda',
                              '&:hover': {
                                bgcolor: 'rgba(100, 255, 218, 0.1)',
                                borderColor: '#4fd3a6'
                              }
                            }}
                          >
                            {option}
                          </Button>
                        ))}
                      </Stack>
                    )}
                  </Paper>
                </Box>
              </Fade>
            ))}

            {isTyping && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    borderRadius: '16px 16px 16px 4px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#64ffda',
                        animation: 'typing 1.4s ease-in-out infinite both',
                        animationDelay: '0s',
                        '@keyframes typing': {
                          '0%, 80%, 100%': { transform: 'scale(0)' },
                          '40%': { transform: 'scale(1)' }
                        }
                      }}
                    />
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#64ffda',
                        animation: 'typing 1.4s ease-in-out infinite both',
                        animationDelay: '0.2s',
                      }}
                    />
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#64ffda',
                        animation: 'typing 1.4s ease-in-out infinite both',
                        animationDelay: '0.4s',
                      }}
                    />
                  </Box>
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          {conversationStep < 6 && !isSubmitting && (
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid rgba(100, 255, 218, 0.2)',
                bgcolor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      borderRadius: '24px',
                      '& fieldset': {
                        borderColor: 'rgba(100, 255, 218, 0.3)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(100, 255, 218, 0.5)'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#64ffda'
                      }
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)'
                    }
                  }}
                />
                <IconButton
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim()}
                  sx={{
                    bgcolor: '#64ffda',
                    color: '#000',
                    '&:hover': {
                      bgcolor: '#4fd3a6'
                    },
                    '&:disabled': {
                      bgcolor: 'rgba(100, 255, 218, 0.3)',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Stack>
            </Box>
          )}

          {/* Submitting Indicator */}
          {isSubmitting && (
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid rgba(100, 255, 218, 0.2)',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#64ffda',
                    animation: 'typing 1.4s ease-in-out infinite both',
                    animationDelay: '0s',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#64ffda',
                    animation: 'typing 1.4s ease-in-out infinite both',
                    animationDelay: '0.2s',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#64ffda',
                    animation: 'typing 1.4s ease-in-out infinite both',
                    animationDelay: '0.4s',
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: '#64ffda' }}>
                Sending your message...
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Contact Info Footer */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#ccc', mb: 2 }}>
            Or reach out directly:
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              startIcon={<EmailIcon />}
              href="mailto:james@example.com"
              sx={{ color: '#64ffda' }}
            >
              james@example.com
            </Button>
            <Button
              startIcon={<PhoneIcon />}
              href="tel:+1234567890"
              sx={{ color: '#64ffda' }}
            >
              (123) 456-7890
            </Button>
            <Button
              startIcon={<LinkedInIcon />}
              href="https://linkedin.com/in/jamescaldwell"
              target="_blank"
              sx={{ color: '#64ffda' }}
            >
              LinkedIn
            </Button>
          </Stack>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default Contact;
