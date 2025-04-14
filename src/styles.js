// Colores principales
export const colors = {
  primary: '#3B82F6', // Azul principal
  primaryDark: '#2563EB', // Azul oscuro
  primaryLight: '#60A5FA', // Azul claro
  background: '#0F172A', // Fondo oscuro con tono azul
  backgroundLight: '#1E293B', // Fondo claro con tono azul
  text: '#FFFFFF', // Texto blanco
  textSecondary: '#E2E8F0', // Texto secundario
  accent: '#93C5FD', // Acento azul
  border: '#3B82F633', // Borde con transparencia
  cardBackground: '#1E293B', // Fondo de tarjetas
  cardHover: '#334155', // Hover de tarjetas
  gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)', // Gradiente azul
  overlay: 'rgba(15, 23, 42, 0.8)', // Overlay con tono azul
  shadow: '0 4px 6px rgba(59, 130, 246, 0.1)', // Sombra con tono azul
  success: '#4CAF50',
  error: '#FF3B30',
  warning: '#FFC107',
  info: '#2196F3'
};

// Estilos generales
export const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    color: colors.text
  },
  header: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderBottom: `2px solid ${colors.primary}`
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: colors.primaryLight
  },
  headerSubtitle: {
    fontSize: '0.875rem',
    color: colors.textSecondary
  },
  themeButton: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: colors.primary,
    color: colors.text,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: colors.primaryDark
    }
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  section: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: colors.primaryLight
  },
  projectsSection: {
    padding: '4rem 2rem',
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`
  },
  projectsContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  },
  projectsTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '3rem',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 0.8s ease forwards'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    padding: '1rem'
  },
  projectCard: {
    position: 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
    background: colors.backgroundLight,
    border: `1px solid ${colors.primary}20`,
    transition: 'all 0.3s ease',
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 0.8s ease forwards',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 10px 30px ${colors.primary}20`,
      '& .projectImage': {
        transform: 'scale(1.05)'
      }
    }
  },
  mainProjectCard: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  projectImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  projectContent: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  projectTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.primaryLight,
    margin: 0
  },
  projectDescription: {
    color: colors.textSecondary,
    lineHeight: '1.6',
    fontSize: '1rem'
  },
  projectTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: 'auto'
  },
  projectTag: {
    padding: '0.25rem 0.75rem',
    background: `${colors.primary}20`,
    color: colors.primaryLight,
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  projectButton: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`,
    color: colors.text,
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 5px 15px ${colors.primary}40`
    }
  },
  projectGlow: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: `radial-gradient(circle, ${colors.primary}10 0%, transparent 70%)`,
    filter: 'blur(50px)',
    opacity: 0.5,
    animation: 'pulse 8s ease-in-out infinite alternate'
  },
  techTag: {
    padding: '0.25rem 0.5rem',
    backgroundColor: colors.primaryDark,
    color: colors.text,
    borderRadius: '9999px',
    fontSize: '0.75rem'
  },
  projectLinks: {
    display: 'flex',
    gap: '1rem'
  },
  demoButton: {
    padding: '0.5rem 1rem',
    backgroundColor: colors.primary,
    color: colors.text,
    borderRadius: '0.375rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: colors.primaryDark
    }
  },
  codeButton: {
    padding: '0.5rem 1rem',
    border: `1px solid ${colors.primary}`,
    color: colors.text,
    borderRadius: '0.375rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: colors.primaryDark
    }
  },
  aboutSection: {
    marginBottom: '3rem',
    padding: '4rem 1rem',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center'
  },
  aboutContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem'
  },
  aboutTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: colors.primaryLight,
    lineHeight: '1.2',
    textAlign: 'center'
  },
  aboutGradientText: {
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  aboutCards: {
    display: 'flex',
    gap: '2rem',
    opacity: 0,
    transform: 'translateY(50px)',
    animation: 'fadeIn 1s ease 0.3s forwards',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  aboutCard: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px',
    padding: '2rem',
    backgroundColor: colors.backgroundLight,
    borderRadius: '0.5rem',
    border: `1px solid ${colors.primary}`,
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  aboutCardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: colors.primaryLight,
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  aboutCardDot: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    backgroundColor: colors.primary,
    borderRadius: '50%'
  },
  aboutCardText: {
    color: colors.textSecondary,
    lineHeight: '1.8',
    fontSize: '1.1rem'
  },
  techSection: {
    marginBottom: '3rem'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  techCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: '0.5rem',
    padding: '1.5rem',
    border: `1px solid ${colors.primary}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  techCardTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: colors.primaryLight,
    textAlign: 'center',
    margin: 0
  },
  techIconsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '1rem',
    justifyContent: 'center'
  },
  techIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  },
  techIconImage: {
    width: '40px',
    height: '40px',
    objectFit: 'contain'
  },
  techIconName: {
    color: colors.textSecondary,
    fontSize: '0.75rem',
    textAlign: 'center'
  },
  contactSection: {
    marginBottom: '3rem'
  },
  contactLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  contactLink: {
    color: colors.textSecondary,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      color: colors.primaryLight
    }
  },
  footer: {
    padding: '2rem 1rem',
    textAlign: 'center',
    backgroundColor: colors.backgroundLight,
    borderTop: `2px solid ${colors.primary}`,
    position: 'relative',
    overflow: 'hidden'
  },
  footerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
    animation: 'gradient 3s ease infinite'
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    position: 'relative',
    zIndex: 1
  },
  socialLinks: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1rem'
  },
  socialLink: {
    color: colors.textSecondary,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      color: colors.primaryLight,
      transform: 'translateY(-3px)'
    }
  },
  copyright: {
    color: colors.textSecondary,
    fontSize: '0.875rem',
    margin: 0
  },
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
    background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`
  },
  heroContent: {
    maxWidth: '1200px',
    width: '100%',
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 1s ease forwards'
  },
  heroName: {
    fontSize: '4rem',
    fontWeight: '800',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
    '@media (max-width: 768px)': {
      fontSize: '3rem'
    }
  },
  heroTagline: {
    fontSize: '1.5rem',
    color: colors.textSecondary,
    marginBottom: '2.5rem',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.6',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem'
    }
  },
  heroButton: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: colors.text,
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`,
    borderRadius: '50px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 15px ${colors.primary}40`,
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: `0 6px 20px ${colors.primary}60`,
      '&::before': {
        transform: 'translateX(100%)'
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, ${colors.primaryDark}, ${colors.primary})`,
      transition: 'transform 0.3s ease',
      zIndex: -1
    }
  },
  heroParticles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.3
  },
  heroGlow: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
    filter: 'blur(50px)',
    animation: 'pulse 8s ease-in-out infinite alternate',
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
        opacity: 0.3
      },
      '100%': {
        transform: 'scale(1.2)',
        opacity: 0.5
      }
    }
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}; 