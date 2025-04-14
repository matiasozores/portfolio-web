import { useState, useEffect, useRef } from 'react'
import { colors, styles } from './styles'

// Hook personalizado para animaciones de scroll
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -150px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

// Componente de estrellas fugaces
const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStar = () => {
      const star = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 5
      };
      return star;
    };

    // Crear estrellas iniciales
    const initialStars = Array.from({ length: 15 }, createStar);
    setStars(initialStars);

    const interval = setInterval(() => {
      setStars(prevStars => {
        const newStars = [...prevStars, createStar()];
        return newStars.slice(-25);
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden',
      willChange: 'transform'
    }}>
      {stars.map(star => (
        <div
          key={star.id}
          style={{
            position: 'fixed',
            left: star.x,
            top: star.y,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `linear-gradient(90deg, ${colors.primaryLight}, ${colors.primary})`,
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * 2}px ${colors.primaryLight}`,
            animation: `shootingStar ${star.duration}s linear ${star.delay}s forwards`,
            opacity: 0,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
};

// Agregar los keyframes al documento
const addKeyframes = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shootingStar {
      0% {
        transform: translateX(0) translateY(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: translateX(100px) translateY(100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Referencias y estados para las animaciones
  const [heroRef, heroVisible] = useScrollAnimation();
  const [projectsRef, projectsVisible] = useScrollAnimation();
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [techRef, techVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  // Agregar los keyframes al montar el componente
  useEffect(() => {
    addKeyframes();
  }, []);

  // Efecto para manejar el tema
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Efecto para el slider automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === projects[0].images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Datos de ejemplo para los proyectos
  const projects = [
    {
      title: "Campus Virtual de Programación",
      description: "Plataforma destinada para organizar una serie de contenidos en un solo lugar. Incluye cursos, ejercicios prácticos y seguimiento de progreso.",
      demoLink: "#",
      codeLink: "#",
      isMain: true,
      technologies: ["HTML", "CSS", "React", "JavaScript"],
      images: [
        "/portfolio-web/assets/images/image1.png",
        "/portfolio-web/assets/images/image2.png",
        "/portfolio-web/assets/images/image3.png"
      ]
    }
  ];

  // Categorías de tecnologías
  const techCategories = [
    {
      name: "Lenguajes de Programación",
      technologies: [
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
      ]
    },
    {
      name: "Frontend",
      technologies: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
      ]
    },
    {
      name: "Backend",
      technologies: [
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      name: "Herramientas",
      technologies: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      color: colors.text,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <a 
        href="/portfolio-web/assets/cv/MATIAS_OZORES.pdf" 
        download="MATIAS_OZORES.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '0.75rem 1.5rem',
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`,
          color: colors.text,
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          zIndex: 100,
          boxShadow: `0 4px 15px ${colors.primary}40`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = `0 6px 20px ${colors.primary}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary}40`;
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        Descargar CV
      </a>
      <ShootingStars />
      <main>
        <section 
          ref={heroRef}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem',
            background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease'
          }}
        >
          <div style={{
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
          }} />
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            opacity: 1,
            transform: 'translateY(0)',
            paddingTop: '10vh'
          }}>
            <h1 style={{
              fontSize: '6rem',
              fontWeight: '700',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em',
              lineHeight: '1.2',
              marginTop: '0',
              textShadow: `0 2px 4px ${colors.primary}20`
            }}>
              Matías Ozores
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                height: '1px',
                width: '60px',
                background: `linear-gradient(90deg, transparent, ${colors.primary}50)`
              }} />
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '400',
                color: colors.primaryLight,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontStyle: 'italic',
                opacity: 0.9
              }}>
                Técnico en Computación
              </h2>
              <div style={{
                height: '1px',
                width: '60px',
                background: `linear-gradient(90deg, ${colors.primary}50, transparent)`
              }} />
            </div>
            <p style={{
              fontSize: '1.5rem',
              color: colors.textSecondary,
              marginBottom: '2.5rem',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
            "Todos los días me esfuerzo en mantener la constancia, la disciplina y la resistencia para luchar contra mis problemas, sin importar lo difícil que sea"
            </p>
            <a 
              href="#about" 
              style={{
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
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about').scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 6px 20px ${colors.primary}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary}40`;
              }}
            >
              Conocé más sobre mi
            </a>
          </div>
        </section>

        <section 
          ref={aboutRef}
          id="about"
          style={{
            ...styles.aboutSection,
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease',
            scrollMarginTop: '100px'
          }}
        >
          <div style={styles.aboutContainer}>
            <div style={{
              position: 'relative',
              padding: '2rem',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'fadeIn 1s ease forwards'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(50px)',
                opacity: 0.5,
                zIndex: -1
              }} />
              <h2 style={styles.aboutTitle}>
                El arte del aprendizaje,<br />
                <span style={styles.aboutGradientText}>
                  mi estilo de vida
                </span>
              </h2>
            </div>

            <div style={styles.aboutCards}>
              <div style={{
                ...styles.aboutCard,
                background: `${colors.backgroundLight}80`,
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: `0 8px 32px ${colors.primary}10`,
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${colors.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${colors.primary}10`;
              }}
              >
                <h3 style={styles.aboutCardTitle}>
                  <span style={styles.aboutCardDot} />
                  Formación técnica
                </h3>
                <p style={styles.aboutCardText}>
                Soy Técnico en Computación y continúo mi formación académica para fortalecer mis bases. Combinando este aprendizaje con mi enfoque autodidacta, siempre busco mejorar mis habilidades y aplicar lo que aprendo de manera efectiva.
                </p>
              </div>

              <div style={{
                ...styles.aboutCard,
                background: `${colors.backgroundLight}80`,
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: `0 8px 32px ${colors.primary}10`,
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${colors.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${colors.primary}10`;
              }}
              >
                <h3 style={styles.aboutCardTitle}>
                  <span style={styles.aboutCardDot} />
                  Objetivo de vida
                </h3>
                <p style={styles.aboutCardText}>
                  Trabajar constantemente para ser capaz de desarrollar y dirigir cualquier tipo de proyecto con el objetivo de que dejen algo mas hallá del dinero y generen un impacto positivo en la vida de las personas. 
                </p>
              </div>

              <div style={{
                ...styles.aboutCard,
                background: `${colors.backgroundLight}80`,
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: `0 8px 32px ${colors.primary}10`,
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${colors.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${colors.primary}10`;
              }}
              >
                <h3 style={styles.aboutCardTitle}>
                  <span style={styles.aboutCardDot} />
                  Enfoque Autodidacta
                </h3>
                <p style={styles.aboutCardText}>
                La educación tradicional tiene limitaciones, por eso desarrollo mi propia metodología de aprendizaje, más rápida y eficaz. Me enfoco en resolver problemas reales y aplicar lo que aprendo de inmediato.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `radial-gradient(circle at 20% 20%, ${colors.primary}10 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, ${colors.primaryLight}10 0%, transparent 50%)`,
            zIndex: 0,
            opacity: 0.5
          }} />
        </section>

        <section 
          ref={projectsRef}
          style={{
            padding: '4rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
            opacity: projectsVisible ? 1 : 0,
            transform: projectsVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease'
          }}
        >
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${colors.primary}10 0%, transparent 70%)`,
            filter: 'blur(50px)',
            opacity: 0.5,
            animation: 'pulse 8s ease-in-out infinite alternate'
          }} />
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '3rem',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Proyectos destacados
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              padding: '1rem'
            }}>
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  style={{
                    position: 'relative',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    background: colors.backgroundLight,
                    border: `1px solid ${colors.primary}20`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    ...(project.isMain && {
                      gridColumn: '1 / -1',
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      '@media (min-width: 768px)': {
                        gridTemplateColumns: '1fr 1fr'
                      },
                      gap: '2rem'
                    })
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = project.isMain ? 'scale(1.02)' : 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = project.isMain 
                      ? `0 25px 50px -12px ${colors.primary}30`
                      : `0 20px 25px -5px ${colors.primary}20, 0 10px 10px -5px ${colors.primary}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: project.isMain ? '300px' : '400px',
                    '@media (min-width: 768px)': {
                      height: project.isMain ? '100%' : '400px'
                    }
                  }}>
                    {project.images.map((image, imgIndex) => (
                      <img 
                        key={imgIndex}
                        src={image} 
                        alt={`${project.title} - imagen ${imgIndex + 1}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'opacity 0.5s ease',
                          opacity: currentImageIndex === imgIndex ? 1 : 0
                        }}
                      />
                    ))}
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: '0.5rem',
                      zIndex: 2
                    }}>
                      {project.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => setCurrentImageIndex(imgIndex)}
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            border: 'none',
                            background: currentImageIndex === imgIndex ? colors.primary : `${colors.primary}40`,
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '1rem',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      gap: '1rem',
                      zIndex: 2
                    }}>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? project.images.length - 1 : prev - 1)}
                        style={{
                          background: `${colors.background}80`,
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: colors.text,
                          fontSize: '1.5rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ←
                      </button>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '1rem',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      gap: '1rem',
                      zIndex: 2
                    }}>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev === project.images.length - 1 ? 0 : prev + 1)}
                        style={{
                          background: `${colors.background}80`,
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: colors.text,
                          fontSize: '1.5rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        →
                      </button>
                    </div>
                  </div>
                  <div style={{
                    padding: '2rem',
                    '@media (min-width: 768px)': {
                      padding: '3rem'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    position: 'relative'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      '@media (min-width: 768px)': {
                        flexDirection: 'row',
                        alignItems: 'center'
                      }
                    }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        '@media (min-width: 768px)': {
                          fontSize: '2rem'
                        },
                        fontWeight: '700',
                        color: colors.primaryLight,
                        margin: 0,
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.primaryLight;
                      }}
                      >
                        {project.title}
                      </h3>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: `${colors.primary}20`,
                        color: colors.primaryLight,
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        border: `1px solid ${colors.primary}40`,
                        whiteSpace: 'nowrap',
                        width: 'fit-content'
                      }}>
                        ESTADO: BETA
                      </span>
                    </div>
                    <p style={{
                      color: colors.textSecondary,
                      lineHeight: '1.8',
                      fontSize: '1rem',
                      '@media (min-width: 768px)': {
                        fontSize: '1.125rem'
                      },
                      opacity: 0.9,
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    >
                      {project.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginTop: 'auto'
                    }}>
                      {project.technologies.map((tech, i) => (
                        <span key={i} style={{
                          padding: '0.5rem 1rem',
                          background: `${colors.primary}20`,
                          color: colors.primaryLight,
                          borderRadius: '50px',
                          fontSize: '0.875rem',
                          '@media (min-width: 768px)': {
                            fontSize: '1rem'
                          },
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          transform: 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.primary;
                          e.currentTarget.style.color = colors.text;
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 4px 6px ${colors.primary}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${colors.primary}20`;
                          e.currentTarget.style.color = colors.primaryLight;
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={"https://matiasozores.github.io/campus-virtual-programacion/"}
                      style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        '@media (min-width: 768px)': {
                          padding: '1rem 2rem'
                        },
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`,
                        color: colors.text,
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        marginTop: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                        fontSize: '1rem',
                        '@media (min-width: 768px)': {
                          fontSize: '1.125rem'
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 5px 15px ${colors.primary}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver proyecto
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          ref={techRef}
          style={{
            padding: '6rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
            opacity: techVisible ? 1 : 0,
            transform: techVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease'
          }}
        >
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${colors.primary}10 0%, transparent 70%)`,
            filter: 'blur(50px)',
            opacity: 0.5,
            animation: 'pulse 8s ease-in-out infinite alternate'
          }} />
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '4rem',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Tecnologías con las que trabajo
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              padding: '1rem'
            }}>
              {techCategories.map((category, index) => (
                <div 
                  key={index} 
                  style={{
                    background: colors.backgroundLight,
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: `1px solid ${colors.primary}20`,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 10px 20px ${colors.primary}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: colors.primaryLight,
                    marginBottom: '2rem',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    {category.name}
                    <span style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: 0,
                      width: '40px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
                      borderRadius: '2px'
                    }} />
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {category.technologies.map((tech, techIndex) => (
                      <div 
                        key={techIndex}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${colors.primary}10`;
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        <div style={{
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${colors.backgroundLight}`,
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          padding: '8px'
                        }}>
                          <img 
                            src={tech.logo} 
                            alt={tech.name}
                            style={{
                              width: '40px',
                              height: '40px',
                              transition: 'all 0.3s ease',
                              objectFit: 'contain',
                              filter: 'none'
                            }}
                          />
                        </div>
                        <span style={{
                          fontSize: '1rem',
                          color: colors.text,
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          fontWeight: '500'
                        }}>
                          {tech.name}
                        </span>
                        <div style={{
                          width: '100%',
                          height: '4px',
                          background: `${colors.primary}20`,
                          borderRadius: '2px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '0%',
                            background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
                            transition: 'width 0.5s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.width = `${Math.random() * 50 + 50}%`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.width = '0%';
                          }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          ref={contactRef}
          style={{
            padding: '8rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contactVisible ? 1 : 0,
            transform: contactVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease'
          }}
        >
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${colors.primary}10 0%, transparent 70%)`,
            filter: 'blur(50px)',
            opacity: 0.5,
            animation: 'pulse 8s ease-in-out infinite alternate'
          }} />
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '800',
              marginBottom: '4rem',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Busco oportunidades para crecer es por eso que estoy abierto a nuevas ideas y proyectos, contactame y vamos a crear algo increible juntos.
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                gap: '4rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a
                  href="https://github.com/matiasozores"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none',
                    color: colors.text,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.color = colors.primaryLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.color = colors.text;
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: `${colors.primary}10`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}>
                    GitHub
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/mat%C3%ADas-ozores-57795030a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none',
                    color: colors.text,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.color = colors.primaryLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.color = colors.text;
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: `${colors.primary}10`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}>
                    LinkedIn
                  </span>
                </a>
              </div>

              <a
                href="mailto:matias.alejandro.ozores@gmail.com"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  textDecoration: 'none',
                  color: colors.text,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.color = colors.primaryLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.color = colors.text;
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: `${colors.primary}10`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                  </svg>
                </div>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}>
                  matias.alejandro.ozores@gmail.com
                </span>
              </a>

              <p style={{
                fontSize: '1.125rem',
                color: colors.textSecondary,
                marginTop: '2rem',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: '1.6'
              }}>
                No dudes en contactarme a través de cualquiera de estos medios.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerGradient} />
        <div style={styles.footerContent}>
          <div style={styles.socialLinks}>
            <a href="https://github.com/matiasozores" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/mat%C3%ADas-ozores-57795030a/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="mailto:matias.alejandro.ozores@gmail.com" style={styles.socialLink}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
            </a>
          </div>
          
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Matías Ozores. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
