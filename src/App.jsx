import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, Coffee, X, Home, UtensilsCrossed, Clock, MapPin, Phone, Mail } from 'lucide-react';

const RegardeBucks = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showChaiAI, setShowChaiAI] = useState(false);
  const [chaiInput, setChaiInput] = useState('');
  const [chaiMessages, setChaiMessages] = useState([
    { role: 'ai', text: 'Hi 👋 I’m Chai AI. Ask me anything about RegardeBucks.' }
  ]);

  const chaiSuggestions = [
    'What coffee do you recommend?',
    'What’s best for studying?',
    'Do you have vegan options?',
    'Which location is open late?'
  ];

  const products = [
    {
      id: 1,
      name: 'Ivy Signature Cold Brew',
      category: 'Cold Beverages',
      price: 249,
      description: 'Smooth and refreshing cold brew steeped for 20 hours',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
      paymentLink: 'https://rzp.io/rzp/dBRF1KkY'
    },
    {
      id: 2,
      name: 'Familia Morning Roast',
      category: 'Hot Beverages',
      price: 199,
      description: 'Rich and aromatic morning blend to start your day',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      paymentLink: 'https://rzp.io/rzp/8JIjwaU'
    },
    {
      id: 3,
      name: 'Study Session Matcha',
      category: 'Hot Beverages',
      price: 279,
      description: 'Premium matcha latte perfect for focus and energy',
      image: 'https://images.unsplash.com/photo-1536013266771-d25a52942c87?w=400&h=300&fit=crop',
      paymentLink: 'https://rzp.io/rzp/vkEBcZtw'
    },
    {
      id: 4,
      name: 'Caesar Salad Bowl',
      category: 'Food',
      price: 329,
      description: 'Fresh romaine lettuce with classic Caesar dressing',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      paymentLink: 'https://rzp.io/rzp/4ntYqdj'
    },
    {
      id: 5,
      name: 'Chocolate Muffin',
      category: 'Food',
      price: 149,
      description: 'Moist chocolate muffin with rich cocoa flavor',
      image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop',
      paymentLink: 'https://rzp.io/rzp/jTj7Jaad'
    }
  ];

  const locations = [
    {
      id: 1,
      name: 'RegardeBucks Downtown',
      address: '123 Main Street, Downtown',
      hours: 'Mon-Fri: 6:00 AM - 9:00 PM, Sat-Sun: 7:00 AM - 10:00 PM',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      name: 'RegardeBucks Central Park',
      address: '456 Park Avenue, Central District',
      hours: 'Mon-Sun: 6:30 AM - 8:30 PM',
      phone: '+91 98765 43211'
    },
    {
      id: 3,
      name: 'RegardeBucks Tech Hub',
      address: '789 Innovation Drive, Tech Park',
      hours: 'Mon-Fri: 7:00 AM - 10:00 PM, Sat-Sun: 8:00 AM - 9:00 PM',
      phone: '+91 98765 43212'
    }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('regardebucks_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const getChaiResponse = (question) => {
    const q = question.toLowerCase();

    if (q.includes('coffee') || q.includes('recommend')) {
      return '☕ I’d recommend the Ivy Signature Cold Brew — smooth, low acidity, and perfect any time of day.';
    }

    if (q.includes('study') || q.includes('focus')) {
      return '📚 For studying, go with our Study Session Matcha. Calm energy, no jitters.';
    }

    if (q.includes('vegan')) {
      return '🥗 Yes! Our Caesar Salad Bowl can be made vegan — just ask at checkout.';
    }

    if (q.includes('open') || q.includes('late') || q.includes('hours')) {
      return '⏰ Our Tech Hub location stays open till 10 PM on weekdays.';
    }

    if (q.includes('price') || q.includes('cost')) {
      return '💸 Most drinks range between ₹199–₹279. Worth every sip 😉';
    }

    return '🤔 Good question! I’m still learning — but I’d happily recommend something tasty if you tell me your mood.';
  };

  const sendChaiMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', text };
    const aiMsg = { role: 'ai', text: getChaiResponse(text) };

    setChaiMessages(prev => [...prev, userMsg, aiMsg]);
    setChaiInput('');
  };


  const handleAuthSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      const newUser = {
        email: authForm.email,
        name: authForm.name,
        id: Date.now()
      };
      localStorage.setItem('regardebucks_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setShowAuth(false);
      setAuthForm({ email: '', password: '', name: '' });
    } else {
      const savedUser = localStorage.getItem('regardebucks_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setShowAuth(false);
        setAuthForm({ email: '', password: '', name: '' });
      } else {
        alert('No account found. Please sign up first.');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('regardebucks_user');
    setCart([]);
  };

  const addToCart = (product) => {
    if (!currentUser) {
      setShowAuth(true);
      return;
    }
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = (item) => {
    window.open(item.paymentLink, '_blank');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const renderHome = () => (
    <>
      <div style={{
        background: 'linear-gradient(135deg, #00754a 0%, #1e3932 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '700',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Welcome to RegardeBucks
        </h1>
        <p style={{
          fontSize: '22px',
          fontWeight: '400',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Premium coffee and fresh food, crafted with care
        </p>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1e1e1e',
          marginBottom: '48px',
          letterSpacing: '-0.5px',
          textAlign: 'center'
        }}>
          Our Menu
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '24px' }}>
                <div style={{
                  fontSize: '13px',
                  color: '#00754a',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}>
                  {product.category}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#1e1e1e',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  color: '#6e6e6e',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  {product.description}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1e1e1e'
                  }}>
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      backgroundColor: '#00754a',
                      color: '#ffffff',
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '24px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006241'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00754a'}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderAbout = () => (
    <div style={{ minHeight: 'calc(100vh - 72px)' }}>
      <div style={{
        background: 'linear-gradient(135deg, #00754a 0%, #1e3932 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '700',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          About RegardeBucks
        </h1>
        <p style={{
          fontSize: '22px',
          fontWeight: '400',
          opacity: 0.95,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Serving excellence, one cup at a time since 2020
        </p>
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e1e1e',
            marginBottom: '24px'
          }}>
            Our Story
          </h2>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#4a4a4a',
            marginBottom: '20px'
          }}>
            RegardeBucks was founded with a simple mission: to create a welcoming space where people can enjoy exceptional coffee and connect with their community. What started as a small neighborhood café has grown into a beloved destination for coffee enthusiasts across the city.
          </p>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#4a4a4a',
            marginBottom: '20px'
          }}>
            We source our beans from sustainable farms around the world, ensuring that every cup not only tastes exceptional but also supports ethical farming practices. Our skilled baristas craft each beverage with precision and care, creating memorable experiences for our customers every day.
          </p>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#4a4a4a'
          }}>
            Beyond coffee, we offer fresh, locally-sourced food options that complement our beverages perfectly. From healthy breakfast bowls to indulgent pastries, every item on our menu is carefully selected to meet our high standards for quality and taste.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <Coffee size={48} style={{ color: '#00754a', marginBottom: '16px' }} />
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1e1e1e',
              marginBottom: '12px'
            }}>
              Premium Quality
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6e6e6e',
              lineHeight: '1.6'
            }}>
              We use only the finest, ethically-sourced coffee beans from sustainable farms worldwide.
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <UtensilsCrossed size={48} style={{ color: '#00754a', marginBottom: '16px' }} />
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1e1e1e',
              marginBottom: '12px'
            }}>
              Fresh Food
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6e6e6e',
              lineHeight: '1.6'
            }}>
              Our menu features fresh, locally-sourced ingredients prepared daily with care and attention.
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <Clock size={48} style={{ color: '#00754a', marginBottom: '16px' }} />
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1e1e1e',
              marginBottom: '12px'
            }}>
              Convenient Hours
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6e6e6e',
              lineHeight: '1.6'
            }}>
              Open early to late, we are here whenever you need your coffee fix or a quick bite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocations = () => (
    <div style={{ minHeight: 'calc(100vh - 72px)' }}>
      <div style={{
        background: 'linear-gradient(135deg, #00754a 0%, #1e3932 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '700',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Our Locations
        </h1>
        <p style={{
          fontSize: '22px',
          fontWeight: '400',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Find a RegardeBucks near you
        </p>
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {locations.map((location) => (
            <div
              key={location.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1e1e1e',
                marginBottom: '20px'
              }}>
                {location.name}
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <MapPin size={20} style={{ color: '#00754a', marginTop: '2px', flexShrink: 0 }} />
                <p style={{
                  fontSize: '15px',
                  color: '#4a4a4a',
                  lineHeight: '1.6'
                }}>
                  {location.address}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <Clock size={20} style={{ color: '#00754a', marginTop: '2px', flexShrink: 0 }} />
                <p style={{
                  fontSize: '15px',
                  color: '#4a4a4a',
                  lineHeight: '1.6'
                }}>
                  {location.hours}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Phone size={20} style={{ color: '#00754a', flexShrink: 0 }} />
                <p style={{
                  fontSize: '15px',
                  color: '#4a4a4a'
                }}>
                  {location.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div style={{ minHeight: 'calc(100vh - 72px)' }}>
      <div style={{
        background: 'linear-gradient(135deg, #00754a 0%, #1e3932 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '700',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Contact Us
        </h1>
        <p style={{
          fontSize: '22px',
          fontWeight: '400',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          We would love to hear from you
        </p>
      </div>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e1e1e',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Get in Touch
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '48px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Mail size={40} style={{ color: '#00754a', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e1e1e',
                marginBottom: '8px'
              }}>
                Email
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#4a4a4a'
              }}>
                info@regardebucks.com
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Phone size={40} style={{ color: '#00754a', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e1e1e',
                marginBottom: '8px'
              }}>
                Phone
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#4a4a4a'
              }}>
                +91 93192 55441
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e1e1e',
              marginBottom: '20px'
            }}>
              Send us a Message
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#1e1e1e',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#1e1e1e',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: '#1e1e1e',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Message
              </label>
              <textarea
                placeholder="Tell us what's on your mind"
                rows={6}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              onClick={() => alert('Thank you for your message! We will get back to you soon.')}
              style={{
                width: '100%',
                backgroundColor: '#00754a',
                color: '#ffffff',
                padding: '16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006241'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00754a'}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #e8e8e8'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '72px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Coffee size={32} style={{ color: '#00754a' }} />
            <span style={{ fontSize: '28px', fontWeight: '700', color: '#00754a', letterSpacing: '-0.5px' }}>
              RegardeBucks
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <button
              onClick={() => setCurrentPage('home')}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: currentPage === 'home' ? '#00754a' : '#4a4a4a',
                fontSize: '15px',
                fontWeight: currentPage === 'home' ? '600' : '500',
                cursor: 'pointer',
                padding: '8px 0',
                borderBottom: currentPage === 'home' ? '2px solid #00754a' : 'none'
              }}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: currentPage === 'about' ? '#00754a' : '#4a4a4a',
                fontSize: '15px',
                fontWeight: currentPage === 'about' ? '600' : '500',
                cursor: 'pointer',
                padding: '8px 0',
                borderBottom: currentPage === 'about' ? '2px solid #00754a' : 'none'
              }}
            >
              About
            </button>
            <button
              onClick={() => setCurrentPage('locations')}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: currentPage === 'locations' ? '#00754a' : '#4a4a4a',
                fontSize: '15px',
                fontWeight: currentPage === 'locations' ? '600' : '500',
                cursor: 'pointer',
                padding: '8px 0',
                borderBottom: currentPage === 'locations' ? '2px solid #00754a' : 'none'
              }}
            >
              Locations
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: currentPage === 'contact' ? '#00754a' : '#4a4a4a',
                fontSize: '15px',
                fontWeight: currentPage === 'contact' ? '600' : '500',
                cursor: 'pointer',
                padding: '8px 0',
                borderBottom: currentPage === 'contact' ? '2px solid #00754a' : 'none'
              }}
            >
              Contact
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {currentUser ? (
              <>
                <span style={{ color: '#1e1e1e', fontSize: '15px', fontWeight: '500' }}>
                  Hello, {currentUser.name}
                </span>
                <button
                  onClick={() => setShowCart(true)}
                  style={{
                    position: 'relative',
                    padding: '10px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <ShoppingCart size={24} style={{ color: '#1e1e1e' }} />
                  {cart.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: '#d62b1f',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '700',
                      borderRadius: '10px',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {cart.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    border: '1px solid #d8d8d8',
                    borderRadius: '24px',
                    color: '#1e1e1e',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.borderColor = '#b8b8b8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#d8d8d8';
                  }}
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#00754a',
                  color: '#ffffff',
                  padding: '12px 28px',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006241'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00754a'}
              >
                <User size={18} />
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === 'home' && renderHome()}
      {currentPage === 'about' && renderAbout()}
      {currentPage === 'locations' && renderLocations()}
      {currentPage === 'contact' && renderContact()}

      {/* Auth Modal */}
      {showAuth && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '100%',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1e1e1e'
              }}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <button
                onClick={() => setShowAuth(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={24} style={{ color: '#6e6e6e' }} />
              </button>
            </div>

            <div>
              {isSignUp && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    color: '#1e1e1e',
                    fontWeight: '600',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '2px solid #e8e8e8',
                      borderRadius: '8px',
                      fontSize: '15px',
                      transition: 'border-color 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#00754a'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#1e1e1e',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e8e8e8',
                    borderRadius: '8px',
                    fontSize: '15px',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#00754a'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                  placeholder="Enter your email"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: '#1e1e1e',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '8px'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e8e8e8',
                    borderRadius: '8px',
                    fontSize: '15px',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#00754a'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                  placeholder="Enter your password"
                />
              </div>

              <button
                onClick={handleAuthSubmit}
                style={{
                  width: '100%',
                  backgroundColor: '#00754a',
                  color: '#ffffff',
                  padding: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006241'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00754a'}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </div>

            <div style={{
              marginTop: '24px',
              textAlign: 'center'
            }}>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                style={{
                  color: '#00754a',
                  fontWeight: '600',
                  fontSize: '15px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid #e8e8e8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1e1e1e'
              }}>
                Your Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={24} style={{ color: '#6e6e6e' }} />
              </button>
            </div>

            <div style={{
              padding: '32px',
              overflowY: 'auto',
              flex: 1
            }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <ShoppingCart size={64} style={{ color: '#d8d8d8', margin: '0 auto 20px' }} />
                  <p style={{
                    color: '#6e6e6e',
                    fontSize: '18px',
                    fontWeight: '500'
                  }}>
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#fafafa',
                          padding: '20px',
                          borderRadius: '12px',
                          marginBottom: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                          <div>
                            <h3 style={{
                              fontWeight: '600',
                              color: '#1e1e1e',
                              fontSize: '16px',
                              marginBottom: '4px'
                            }}>
                              {item.name}
                            </h3>
                            <p style={{
                              color: '#6e6e6e',
                              fontSize: '18px',
                              fontWeight: '600'
                            }}>
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button
                            onClick={() => handleCheckout(item)}
                            style={{
                              backgroundColor: '#00754a',
                              color: '#ffffff',
                              padding: '10px 20px',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                              whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006241'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00754a'}
                          >
                            Pay Now
                          </button>
                          <button
                            onClick={() => removeFromCart(index)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '8px',
                              borderRadius: '8px',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <X size={20} style={{ color: '#d62b1f' }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    borderTop: '2px solid #e8e8e8',
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '22px',
                      fontWeight: '700',
                      color: '#1e1e1e'
                    }}>
                      Total:
                    </span>
                    <span style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: '#00754a'
                    }}>
                      ₹{totalAmount}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Chai AI Floating Button */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 3000
      }}>
        {!showChaiAI && (
          <button
            onClick={() => setShowChaiAI(true)}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#00754a',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '700',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
            }}
          >
            ☕ AI
          </button>
        )}
      </div>
      {showChaiAI && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '320px',
          height: '420px', 
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 3000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>

          {/* Header */}
          <div style={{
            backgroundColor: '#00754a',
            color: '#fff',
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <strong>Chai AI ☕</strong>
            <button
              onClick={() => setShowChaiAI(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            padding: '12px',
            flex: 1,
            overflowY: 'auto'
          }}>
            {chaiMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '10px',
                  textAlign: msg.role === 'user' ? 'right' : 'left'
                }}
              >
                <span style={{
                  display: 'inline-block',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: msg.role === 'user' ? '#00754a' : '#f1f1f1',
                  color: msg.role === 'user' ? '#fff' : '#1e1e1e',
                  fontSize: '14px',
                  maxWidth: '85%'
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div style={{
            padding: '8px 12px',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {chaiSuggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendChaiMessage(s)}
                style={{
                  fontSize: '12px',
                  padding: '6px 10px',
                  borderRadius: '16px',
                  border: '1px solid #00754a',
                  background: '#fff',
                  color: '#00754a',
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              value={chaiInput}
              onChange={(e) => setChaiInput(e.target.value)}
              placeholder="Ask Chai AI..."
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
              onKeyDown={(e) => e.key === 'Enter' && sendChaiMessage(chaiInput)}
            />
            <button
              onClick={() => sendChaiMessage(chaiInput)}
              style={{
                backgroundColor: '#00754a',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0 14px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RegardeBucks;