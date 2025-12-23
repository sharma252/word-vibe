import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const About = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        About WordVibe
                    </h1>
                    <p className="lead text-muted">
                        Empowering voices, connecting minds, and shaping the future of digital storytelling.
                    </p>
                </div>
            </div>

            <div className="row g-5 align-items-center mb-5">
                <div className="col-md-6">
                    <div className="p-4 bg-white rounded-4 shadow-sm border border-light">
                        <h2 className="h3 fw-bold mb-3">Our Mission</h2>
                        <p className="text-secondary mb-4">
                            At WordVibe, we believe that every story deserves to be heard. We created this platform to provide a beautiful, seamless space for writers, thinkers, and creators to share their ideas with the world.
                        </p>
                        <p className="text-secondary">
                            Whether you're a seasoned developer sharing code snippets, a traveler documenting journeys, or a philosopher musing on life, WordVibe is your canvas. We prioritize simplicity, performance, and aesthetic excellence.
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="position-relative">
                        <div className="bg-primary position-absolute rounded-circle opacity-10 blur-3xl" style={{ width: '300px', height: '300px', top: '-50px', right: '-50px', filter: 'blur(60px)', zIndex: -1 }}></div>
                        <div className="bg-secondary position-absolute rounded-circle opacity-10 blur-3xl" style={{ width: '200px', height: '200px', bottom: '-20px', left: '-20px', filter: 'blur(60px)', zIndex: -1 }}></div>
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            {/* Using a placeholder that looks nice or we can just use typography */}
                            <div className="card-body p-5 text-center text-white" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}>
                                <h3 className="fw-bold mb-0" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>"The pen is mightier than the sword, but a blog post travels faster."</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-lg-8 text-center">
                    <h3 className="fw-bold mb-4">Connect With Us</h3>
                    <div className="d-flex justify-content-center gap-4">
                        <a href="#" className="btn btn-outline-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                            <Github size={20} />
                        </a>
                        <a href="#" className="btn btn-outline-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="btn btn-outline-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:hello@wordvibe.com" className="btn btn-outline-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
