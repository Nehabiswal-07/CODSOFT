const startPortfolio = () => {

    /* --------------------------------------------------------------------------
       1. DYNAMIC COMPONENTS RENDERING ENGINE
       -------------------------------------------------------------------------- */
    
    // Core Rendering Coordinator
    const initDynamicPortfolio = () => {
        renderNavAndBranding();
        renderHero();
        renderAbout();
        renderAboutHighlights();
        renderEducationStats();
        renderEducation();
        renderSkills();
        renderProjects();
        renderJourney();
        renderCurrentlyLearning();
        renderAchievements();
        renderFutureGoals();
        renderContactInfo();
        renderFooter();
        initDevicePreview();
        initCanvasBackground();
        
        // Initial Lucide Icons translation
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Initialize 3D hover/tilt effects on highlight cards
        initHighlightInteractions();
    };

    // Nav & Branding Loader
    const renderNavAndBranding = () => {
        const loaderName = document.getElementById('loader-logo-name');
        const navLogoText = document.getElementById('nav-logo-text');
        
        if (loaderName) loaderName.textContent = PORTFOLIO_CONFIG.profile.name;
        if (navLogoText) navLogoText.textContent = PORTFOLIO_CONFIG.profile.logoName;
    };

    // Hero Section Loader
    const renderHero = () => {
        const profile = PORTFOLIO_CONFIG.profile;
        
        const profileName = document.getElementById('hero-profile-name');
        const tagline = document.getElementById('hero-tagline-container');
        const profileImg = document.getElementById('hero-profile-img');
        const ctasContainer = document.getElementById('hero-ctas-container');
        const badgeContainer = document.getElementById('hero-floating-badges-container');
        const topBadge = document.getElementById('hero-badge-glowing-container');
        
        if (profileName) profileName.textContent = profile.name;
        if (tagline) tagline.textContent = profile.tagline;
        if (profileImg) {
            profileImg.src = profile.profileImg;
            profileImg.alt = `${profile.name} Professional Portrait`;
        }
        
        // Render Top Glowing Status Badge
        if (topBadge) {
            if (profile.availableForWork) {
                topBadge.innerHTML = `
                    <span class="badge-dot" style="background-color: #10b981; box-shadow: 0 0 8px #10b981;"></span>
                    <span class="badge-text">Available for Internships & Placements</span>
                `;
            } else {
                topBadge.innerHTML = `
                    <span class="badge-dot" style="background-color: var(--accent-color); box-shadow: 0 0 8px var(--accent-color);"></span>
                    <span class="badge-text">Learning & Growing</span>
                `;
            }
        }
        
        // Render CTAs
        if (ctasContainer) {
            ctasContainer.innerHTML = `
                <a href="#projects" class="btn btn-primary" id="hero-btn-projects">
                    <span>View Projects</span>
                    <i data-lucide="arrow-right"></i>
                </a>
                <a href="${profile.resumeUrl}" target="_blank" class="btn btn-secondary" id="hero-btn-resume">
                    <i data-lucide="download"></i>
                    <span>Download Resume</span>
                </a>
                <a href="#contact" class="btn btn-tertiary" id="hero-btn-contact">
                    <span>Contact Me</span>
                </a>
            `;
        }

        // Floating Badges - Student & growth-focused (Removed from around profile image)
        if (badgeContainer) {
            badgeContainer.innerHTML = '';
        }
    };

    // About Section Loader
    const renderAbout = () => {
        const profile = PORTFOLIO_CONFIG.profile;
        const about = PORTFOLIO_CONFIG.about;
        
        const avatarImg = document.getElementById('about-avatar-img');
        const bioTitle = document.getElementById('about-bio-title');
        const introText = document.getElementById('about-intro-text');
        const expandedContainer = document.getElementById('about-expanded-paragraphs');
        const locationContainer = document.getElementById('about-location-card-container');
        
        if (avatarImg) {
            avatarImg.src = profile.profileImg;
            avatarImg.alt = profile.name;
        }
        if (bioTitle) bioTitle.textContent = about.title;
        if (introText) introText.textContent = about.intro;
        
        // Populate expandable paragraphs
        if (expandedContainer && about.readMoreParagraphs) {
            expandedContainer.innerHTML = about.readMoreParagraphs
                .map(para => `<p class="about-text">${para}</p>`)
                .join('');
        }

        // Populate location widget
        if (locationContainer) {
            locationContainer.innerHTML = `
                <div class="location-card">
                    <div class="location-icon-container">
                        <i data-lucide="map-pin" class="loc-icon-pulse"></i>
                    </div>
                    <div class="location-details">
                        <span class="location-label">Current Location</span>
                        <h4 class="location-value" id="location-value-text">${profile.location}</h4>
                    </div>
                </div>
            `;
        }
    };

    // About Highlights Loader
    const renderAboutHighlights = () => {
        const container = document.getElementById('about-highlights-container');
        if (container) {
            container.innerHTML = `
                <div class="about-highlight-card glass-panel reveal delay-1" data-target-num="9.27" data-suffix="" data-prefix="">
                    <div class="card-glow-bg"></div>
                    <i data-lucide="graduation-cap" class="highlight-icon icon-cyan"></i>
                    <div>
                        <h4 class="counter-num">0</h4>
                        <p>B.Tech CSE CGPA</p>
                    </div>
                </div>
                <div class="about-highlight-card glass-panel reveal delay-2" data-target-num="2" data-suffix="×" data-prefix="">
                    <div class="card-glow-bg"></div>
                    <i data-lucide="trophy" class="highlight-icon icon-gold"></i>
                    <div>
                        <h4 class="counter-num">0</h4>
                        <p>ISIH Winner</p>
                    </div>
                </div>
                <div class="about-highlight-card glass-panel reveal delay-3" data-target-num="3" data-suffix="+" data-prefix="">
                    <div class="card-glow-bg"></div>
                    <i data-lucide="folder-git-2" class="highlight-icon icon-purple"></i>
                    <div>
                        <h4 class="counter-num">0</h4>
                        <p>Projects Built</p>
                    </div>
                </div>
                <div class="about-highlight-card glass-panel reveal delay-4" data-target-num="10" data-suffix="+" data-prefix="">
                    <div class="card-glow-bg"></div>
                    <i data-lucide="cpu" class="highlight-icon icon-blue"></i>
                    <div>
                        <h4 class="counter-num">0</h4>
                        <p>Technical Skills</p>
                    </div>
                </div>
            `;
            
            // Observe the dynamically added reveal items
            if (window.IntersectionObserver && typeof revealObserver !== 'undefined') {
                container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
            }
        }
    };

    // Academic Stats Counter Loader
    const renderEducationStats = () => {
        const statsContainer = document.getElementById('education-stats-container');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="edu-stat-card glass-panel">
                    <div class="card-glow-bg"></div>
                    <i data-lucide="graduation-cap" class="stat-icon text-cyan"></i>
                    <div class="stat-num text-gradient">9.27</div>
                    <div class="stat-label">B.Tech CSE CGPA</div>
                </div>
                <div class="edu-stat-card glass-panel">
                    <div class="card-glow-bg"></div>
                    <i data-lucide="award" class="stat-icon text-purple"></i>
                    <div class="stat-num">91.16%</div>
                    <div class="stat-label">Class XII Score</div>
                </div>
                <div class="edu-stat-card glass-panel">
                    <div class="card-glow-bg"></div>
                    <i data-lucide="award" class="stat-icon text-blue"></i>
                    <div class="stat-num">91.33%</div>
                    <div class="stat-label">Class X Score</div>
                </div>
            `;
        }
    };

    // Education Section Loader (Animated Timeline)
    const renderEducation = () => {
        const education = PORTFOLIO_CONFIG.education;
        const timelineContainer = document.getElementById('education-timeline-container');
        
        if (timelineContainer && education) {
            // Render vertical timeline items
            const timelineHTML = education.map((edu, idx) => {
                const highlightClass = edu.highlight ? 'edu-card-highlight' : '';
                const gradeBadgeClass = edu.highlight ? 'edu-grade-glowing' : 'edu-grade-simple';
                const delayClass = `delay-${idx + 1}`;
                
                return `
                    <div class="edu-timeline-item ${delayClass}">
                        <div class="edu-timeline-dot"></div>
                        <div class="edu-card glass-panel ${highlightClass}" data-category="education" data-id="${edu.id}">
                            <div class="card-glow-bg"></div>
                            <div class="edu-card-header">
                                <div class="edu-institution-box">
                                    <h3>${edu.degree}</h3>
                                    <span class="edu-institution">${edu.institution}</span>
                                </div>
                                <div class="edu-grade-badge ${gradeBadgeClass}">
                                    <span>${edu.grade}</span>
                                </div>
                            </div>
                            <div class="edu-meta-info">
                                <span class="edu-duration"><i data-lucide="calendar"></i> ${edu.duration}</span>
                            </div>
                            <p class="edu-details-text">${edu.details}</p>
                        </div>
                    </div>
                `;
            }).join('');
            
            timelineContainer.innerHTML = `<div class="edu-timeline-line"></div><div class="edu-items-wrapper">${timelineHTML}</div>`;
        }
    };

    // Skills Section Loader
    const renderSkills = () => {
        const skills = PORTFOLIO_CONFIG.skills;
        const categoriesGrid = document.getElementById('skills-categories-grid');
        const pillsRibbon = document.getElementById('skills-pills-ribbon');
        
        const getTechIcon = (name) => {
            const cleanName = name.toLowerCase().trim();
            const icons = {
                'html': `<svg class="tech-icon-svg html-glow" viewBox="0 0 24 24"><path fill="#e34f26" d="M1.5 22L0 0h24l-1.5 22L12 24zM12 2.2L2.2 2.2l1.2 16.6L12 21.2l8.6-2.4 1.2-16.6zM12 5.5l-4.5 0.5v2.8h4.5v3H9.2v-1.1H6.4v3.9h8.4l-0.5 4.5-2.3 0.6-2.3-0.6-0.1-1.6H6.8l0.3 3.9 4.9 1.4 4.9-1.4 0.6-7.2h-5.5v-3h5.7l0.3-3.6z"/></svg>`,
                'html5': `<svg class="tech-icon-svg html-glow" viewBox="0 0 24 24"><path fill="#e34f26" d="M1.5 22L0 0h24l-1.5 22L12 24zM12 2.2L2.2 2.2l1.2 16.6L12 21.2l8.6-2.4 1.2-16.6zM12 5.5l-4.5 0.5v2.8h4.5v3H9.2v-1.1H6.4v3.9h8.4l-0.5 4.5-2.3 0.6-2.3-0.6-0.1-1.6H6.8l0.3 3.9 4.9 1.4 4.9-1.4 0.6-7.2h-5.5v-3h5.7l0.3-3.6z"/></svg>`,
                'html5 / css3': `<svg class="tech-icon-svg html-glow" viewBox="0 0 24 24"><path fill="#e34f26" d="M1.5 22L0 0h24l-1.5 22L12 24zM12 2.2L2.2 2.2l1.2 16.6L12 21.2l8.6-2.4 1.2-16.6zM12 5.5l-4.5 0.5v2.8h4.5v3H9.2v-1.1H6.4v3.9h8.4l-0.5 4.5-2.3 0.6-2.3-0.6-0.1-1.6H6.8l0.3 3.9 4.9 1.4 4.9-1.4 0.6-7.2h-5.5v-3h5.7l0.3-3.6z"/></svg>`,
                'css': `<svg class="tech-icon-svg css-glow" viewBox="0 0 24 24"><path fill="#1572b6" d="M1.5 22L0 0h24l-1.5 22L12 24zM12 2.2l7.8 0-0.6 8.5H12v3h3.5l-0.3 3.5-3.2 0.9-3.2-0.9-0.2-2.3h-2.8l0.4 4.5 5.8 1.6 5.8-1.6 0.8-9H12v-3h7.2l0.3-3.6z"/></svg>`,
                'css3': `<svg class="tech-icon-svg css-glow" viewBox="0 0 24 24"><path fill="#1572b6" d="M1.5 22L0 0h24l-1.5 22L12 24zM12 2.2l7.8 0-0.6 8.5H12v3h3.5l-0.3 3.5-3.2 0.9-3.2-0.9-0.2-2.3h-2.8l0.4 4.5 5.8 1.6 5.8-1.6 0.8-9H12v-3h7.2l0.3-3.6z"/></svg>`,
                'javascript': `<svg class="tech-icon-svg js-glow" viewBox="0 0 24 24"><rect width="24" height="24" fill="#f7df1e" rx="3"/><path fill="#000000" d="M21.9 16.5c-.2-.6-.9-1-1.8-1.2-.8-.2-1.3-.4-1.6-.7-.2-.2-.3-.5-.3-.9 0-.4.2-.7.6-.9s.9-.2 1.5 0c.5.2.9.5 1.1.9l2.2-1.4c-.4-.9-1.1-1.6-2-2-1-.4-2-.5-3.1-.3-1.1.2-1.9.8-2.4 1.6-.5.8-.8 1.8-.8 3s.3 2.1.9 2.7c.6.6 1.5 1 2.7 1.3.9.2 1.6.4 1.9.7.3.3.4.6.4 1 0 .5-.2.9-.6 1.1s-1 .3-1.6.1c-.7-.2-1.2-.6-1.5-1.3l-2.2 1.3c.5 1.1 1.3 1.9 2.4 2.3 1.1.4 2.4.4 3.7.1 1.2-.3 2.2-1 2.8-1.9.6-.9.9-2 .9-3.3 0-1.2-.3-2.1-.9-2.7z"/></svg>`,
                'javascript (es6+)': `<svg class="tech-icon-svg js-glow" viewBox="0 0 24 24"><rect width="24" height="24" fill="#f7df1e" rx="3"/><path fill="#000000" d="M21.9 16.5c-.2-.6-.9-1-1.8-1.2-.8-.2-1.3-.4-1.6-.7-.2-.2-.3-.5-.3-.9 0-.4.2-.7.6-.9s.9-.2 1.5 0c.5.2.9.5 1.1.9l2.2-1.4c-.4-.9-1.1-1.6-2-2-1-.4-2-.5-3.1-.3-1.1.2-1.9.8-2.4 1.6-.5.8-.8 1.8-.8 3s.3 2.1.9 2.7c.6.6 1.5 1 2.7 1.3.9.2 1.6.4 1.9.7.3.3.4.6.4 1 0 .5-.2.9-.6 1.1s-1 .3-1.6.1c-.7-.2-1.2-.6-1.5-1.3l-2.2 1.3c.5 1.1 1.3 1.9 2.4 2.3 1.1.4 2.4.4 3.7.1 1.2-.3 2.2-1 2.8-1.9.6-.9.9-2 .9-3.3 0-1.2-.3-2.1-.9-2.7z"/></svg>`,
                'react.js': `<svg class="tech-icon-svg react-glow" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="3" ry="11" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="11" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="11" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2" fill="#61dafb"/></svg>`,
                'react': `<svg class="tech-icon-svg react-glow" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="3" ry="11" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="11" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="11" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2" fill="#61dafb"/></svg>`,
                'node.js / express.js': `<svg class="tech-icon-svg node-glow" viewBox="0 0 24 24"><path fill="#339933" d="M12 2.25L4.5 6.58v8.66l7.5 4.33 7.5-4.33V6.58L12 2.25zm5.55 12.31l-5.55 3.2-5.55-3.2V8.12l5.55-3.2 5.55 3.2v6.44zM12 7.02l3.75 2.17v4.33L12 15.69l-3.75-2.17V9.19L12 7.02z"/></svg>`,
                'node.js': `<svg class="tech-icon-svg node-glow" viewBox="0 0 24 24"><path fill="#339933" d="M12 2.25L4.5 6.58v8.66l7.5 4.33 7.5-4.33V6.58L12 2.25zm5.55 12.31l-5.55 3.2-5.55-3.2V8.12l5.55-3.2 5.55 3.2v6.44zM12 7.02l3.75 2.17v4.33L12 15.69l-3.75-2.17V9.19L12 7.02z"/></svg>`,
                'mongodb': `<svg class="tech-icon-svg mongo-glow" viewBox="0 0 24 24"><path fill="#47a248" d="M12 0C9.6 4.3 6 8.3 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.7-3.6-7.7-6-12zm-1.8 12.5c-.3-.2-.5-.5-.5-.8 0-.8.7-1.4 1.5-1.4.3 0 .6.1.8.3.3.3.5.7.5 1.1-.1.8-.7 1.4-1.5 1.4-.4.1-.7-.2-.8-.6zm1.8 9.3v-2.1c-.6 0-1.1-.5-1.1-1.1V18c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1v.6c0 .6-.5 1.1-1.1 1.1v2.1c2 0 3.6-1.6 3.6-3.6s-1.6-3.6-3.6-3.6-3.6 1.6-3.6 3.6 1.6 3.6 3.6 3.6z"/></svg>`,
                'mysql': `<svg class="tech-icon-svg mysql-glow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8 13c-.1-.3-.3-.5-.6-.7-.3-.1-.6-.2-.9-.2-.7.1-1.3.5-1.7 1.1-.4.6-.6 1.3-.5 2 .1.7.5 1.3 1.1 1.7.6.4 1.3.6 2 .5.7-.1 1.3-.5 1.7-1.1.4-.6.6-1.3.5-2-.1-.7-.5-1.3-1.1-1.7-.1-.1-.3-.2-.5-.2V6c.3 0 .7.1 1 .2.3.1.6.3.8.5.2.2.4.5.5.8.1.3.2.7.2 1v1.1l-1.5.7c-.5-.5-1.2-.8-1.9-.8-.7 0-1.4.3-1.9.8-.5.5-.8 1.2-.8 1.9s.3 1.4.8 1.9l.2-.2-.1-.3c0-.4.1-.8.3-1.2.2-.4.5-.7.9-.9.4-.2.8-.3 1.2-.3.4 0 .8.1 1.2.3v2.1c0 .4.1.8.3 1.2.2.4.5.7.9.9.4.2.8.3 1.2.3s.8-.1 1.2-.3V13zm-6.2-11c-.3 0-.6.1-.9.2-.3.1-.6.3-.8.5-.2.2-.4.5-.5.8-.1.3-.2.7-.2 1v1.1c.3-.2.7-.3 1.1-.3.4 0 .8.1 1.1.3V2zm0 5.2V3.1l-1.8.8v1.6l1.8.8z" fill="#00758f"/><path d="M12.1 21.3c-.6.6-1.3 1.1-2.1 1.4-.8.3-1.7.5-2.6.5-1.8 0-3.5-.7-4.8-2-1.3-1.3-2-3-2-4.8 0-.9.2-1.8.5-2.6.3-.8.8-1.5 1.4-2.1.6-.6 1.3-1.1 2.1-1.4.8-.3 1.7-.5 2.6-.5.9 0 1.8.2 2.6.5.8.3 1.5.8 2.1 1.4l.7-.7c-.7-.7-1.6-1.3-2.6-1.7-1-.4-2-.6-3.1-.6-2.2 0-4.3.9-5.9 2.5C.5 11.1-.4 13.2-.4 15.4c0 2.2.9 4.3 2.5 5.9 1.6 1.6 3.7 2.5 5.9 2.5 1.1 0 2.1-.2 3.1-.6 1-.4 1.9-1 2.6-1.7l-.7-.7z" fill="#00758f"/></svg>`,
                'git': `<svg class="tech-icon-svg git-glow" viewBox="0 0 24 24"><path fill="#f05032" d="M23.3 10.9L13.1.7C12.7.3 12 .3 11.6.7L8.2 4.1l3 3c.7-.2 1.5 0 2.1.6.6.6.8 1.4.6 2.1l3 3c.7-.2 1.5 0 2.1.6.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.8-1.4-.6-2.1l-3-3c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3l-3-3C7.7 8 7.5 7.2 7.7 6.5L4.4 9.8c-.4.4-.4 1.1 0 1.5l10.2 10.2c.4.4 1.1.4 1.5 0l7.2-7.2c.4-.3.4-1-.1-1.4z"/></svg>`,
                'github': `<svg class="tech-icon-svg github-glow" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 24 12c0-6.6-5.4-12-12-12z"/></svg>`,
                'java': `<svg class="tech-icon-svg java-glow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.44 14.544c-.06.27-.12.54-.15.82a4.42 4.42 0 00.32 1.95 2.25 2.25 0 00.86 1.05 3.2 3.2 0 001.37.45 6.94 6.94 0 001.66-.08c.55-.07.97-.24 1.2-.42a1.05 1.05 0 00.3-.77.83.83 0 00-.31-.69c-.27-.22-.72-.37-1.3-.47a11.16 11.16 0 00-2-.17c-.49-.01-1-.07-1.45-.19a2.38 2.38 0 01-1.07-.56 1.55 1.55 0 01-.43-.97zm5.95 2.23c.31.25.59.54.82.87a3.02 3.02 0 01.35 1.48c0 .54-.13 1-.39 1.39a3.1 3.1 0 01-1.12.98 5.6 5.6 0 01-1.83.56c-.73.1-1.5.11-2.22.03a11.02 11.02 0 01-2.12-.39 5.37 5.37 0 01-1.8-.93 2.92 2.92 0 01-.84-1.28c-.06-.19-.07-.38-.04-.57a.64.64 0 01.27-.47.66.66 0 01.53-.08c.24.06.45.19.62.36a3.86 3.86 0 001.12.83c.53.25 1.13.43 1.73.53a12.5 12.5 0 002.5.1c.54-.03 1.07-.15 1.56-.37.38-.17.69-.43.91-.77a1.65 1.65 0 00.22-.84.97.97 0 00-.28-.7c-.22-.22-.52-.4-.86-.56-.36-.16-.76-.28-1.18-.36l.17-.69z" fill="#f89820"/><path d="M11.66 18.064c-.11.51-.25 1.02-.42 1.52a2.36 2.36 0 01-.89 1.19c-.44.3-.96.47-1.5.5a5.52 5.52 0 01-1.74-.2c-.52-.16-.94-.36-1.23-.59a1.05 1.05 0 01-.36-.78.88.88 0 01.31-.7.28.28 0 011.4-.52 12.44 12.44 0 012.2-.18c.5-.02.99-.08 1.48-.19a2.53 2.53 0 001.11-.53 1.46 1.46 0 00.41-.95 6.03 6.03 0 00.09-.72l.73.15c-.07.41-.18.82-.39 1.2zM8.34 6.844c.5-1.42.23-2.92-.76-4.14a.45.45 0 00-.63-.07.45.45 0 00-.07.63c.8 1 1.02 2.22.61 3.37l.85.21zm2.34-.84c.7-2 .32-4.12-1.07-5.84a.45.45 0 00-.7-.03.45.45 0 00.03.7c1.17 1.45 1.49 3.23.9 4.93l.84.24zm3.17 2.06c.4-1.25.13-2.58-.76-3.66a.45.45 0 00-.7.56c.71.86.92 1.9.61 2.89l.85.21z" fill="#e32a2d"/><path d="M19.04 11.234a4.13 4.13 0 00-.31-1.2 5.86 5.86 0 00-2-2.3 8.35 8.35 0 00-3.32-1.23 15.63 15.63 0 00-4.13-.1 12.02 12.02 0 00-4.08 1.4 5.92 5.92 0 00-2.4 2.8 4.72 4.72 0 00.22 3.65 6.55 6.55 0 002.3 2.45 14.54 14.54 0 003.88 1.76c1.47.4 3 .55 4.5.45A11.13 11.13 0 0017 17.584c.88-.56 1.54-1.34 1.86-2.26.24-.7.29-1.43.18-2.15v.06zm-1.46.7c.07.48.03.96-.13 1.41a3.67 3.67 0 01-1.26 1.7 8.3 8.3 0 01-2.9 1.1c-1.24.22-2.5.26-3.75.14a11.14 11.14 0 01-3.48-1.01 5.91 5.91 0 01-2.19-1.74 3.16 3.16 0 01-.48-2.22 4.54 4.54 0 011.75-2.3 9.42 9.42 0 013.37-1.3c1.3-.23 2.62-.23 3.92-.01a7.48 7.48 0 013 1.01 4.58 4.58 0 011.66 1.81c.32.73.49 1.62.49 1.71v.7zm.15-2.02c.07.13.12.27.17.41a7.08 7.08 0 01-1.63-.5c-.48-.22-.98-.4-1.5-.53.5-.22 1.05-.36 1.61-.43.51-.06.94.33 1.35 1.05z" fill="#5382a1"/></svg>`,
                'c++': `<svg class="tech-icon-svg cpp-glow" viewBox="0 0 24 24"><path fill="#00599c" d="M24 10.5h-2.5V8h-2v2.5H17v2h2.5V15h2v-2.5H24v-2zm-12.8 2.1c-.8.8-1.8 1.2-3 1.2-2.3 0-4-1.8-4-4.3 0-2.4 1.7-4.3 4-4.3 1.2 0 2.2.4 3 1.2L12.5 5c-1-1-2.4-1.6-4.3-1.6C4.1 3.4 1 6.5 1 10.5S4.1 17.6 8.2 17.6c1.9 0 3.3-.6 4.3-1.6l-1.3-3.4z"/></svg>`,
                'c': `<svg class="tech-icon-svg c-glow" viewBox="0 0 24 24"><path fill="#3949ab" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 16.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5c1.8 0 3.5.7 4.7 2L14 10.2c-.5-.5-1.2-.8-2-.8-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5c.8 0 1.5-.3 2-.8l2.7 2.7c-1.2 1.3-2.9 2-4.7 2z"/></svg>`
            };
            return icons[cleanName] || '';
        };

        if (categoriesGrid && skills.categories) {
            categoriesGrid.innerHTML = skills.categories.map(cat => {
                const isNoBar = cat.id === 'skills-soft' || cat.id === 'skills-languages';
                
                const skillItemsHTML = cat.skillsList.map(skill => {
                    const techIcon = getTechIcon(skill.name);
                    
                    if (isNoBar) {
                        return `
                            <div class="skill-item-no-bar">
                                <span class="skill-name-bullet">${skill.name}</span>
                            </div>
                        `;
                    }
                    
                    return `
                        <div class="skill-item">
                            <div class="skill-info">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    ${techIcon ? `<span class="skill-tech-icon">${techIcon}</span>` : ''}
                                    <span>${skill.name}</span>
                                </div>
                                <span class="skill-percentage" data-target="${skill.percentage}">0%</span>
                            </div>
                            <div class="skill-bar-bg">
                                <div class="skill-bar-fill" data-percentage="${skill.percentage}" style="width: 0%;"></div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                const flexListStyle = isNoBar ? `style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px;"` : '';
                
                return `
                    <div class="skill-category-card glass-panel" data-category="skills" data-id="${cat.id}">
                        <div class="card-glow-bg"></div>
                        <div class="category-header">
                            <i data-lucide="${cat.icon}" class="cat-icon text-indigo"></i>
                            <h3>${cat.title}</h3>
                        </div>
                        <div class="skill-list" ${flexListStyle}>
                            ${skillItemsHTML}
                        </div>
                    </div>
                `;
            }).join('');
        }

        if (pillsRibbon && skills.pills) {
            pillsRibbon.innerHTML = skills.pills
                .map(pill => `<span class="skill-pill">${pill}</span>`)
                .join('');
        }
    };

    // Projects Grid Loader
    const renderProjects = () => {
        const projects = PORTFOLIO_CONFIG.projects;
        const cardsGrid = document.getElementById('projects-cards-grid');
        
        if (cardsGrid && projects) {
            // First let's render the tabs container if it doesn't exist
            let tabsContainer = document.getElementById('projects-tabs-container');
            if (!tabsContainer) {
                tabsContainer = document.createElement('div');
                tabsContainer.id = 'projects-tabs-container';
                tabsContainer.className = 'projects-tabs-container';
                cardsGrid.parentNode.insertBefore(tabsContainer, cardsGrid);
            }
            
            // Render tabs
            const categories = [
                { id: 'all', label: 'All Projects', icon: 'layers' },
                { id: 'web', label: 'Web Development', icon: 'layout' },
                { id: 'ai', label: 'AI / ML', icon: 'cpu' },
                { id: 'fullstack', label: 'Full Stack', icon: 'server' },
                { id: 'uiux', label: 'UI/UX', icon: 'palette' }
            ];
            
            tabsContainer.innerHTML = categories.map(cat => `
                <button class="project-tab-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
                    <i data-lucide="${cat.icon}"></i>
                    <span>${cat.label}</span>
                </button>
            `).join('');
            
            // Now render all project cards
            cardsGrid.innerHTML = projects.map(proj => {
                const techBadgesHTML = proj.techs
                    .map(tech => `<span class="tech-tag">${tech}</span>`)
                    .join('');
                
                return `
                    <div class="project-card glass-panel" id="project-card-${proj.id}" data-categories='${JSON.stringify(proj.filterCategories || [])}'>
                        <div class="project-img-wrapper">
                            <img src="${proj.img}" alt="${proj.title}" class="project-img" onerror="this.src='https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop'">
                            <div class="project-overlay-glow"></div>
                        </div>
                        <div class="project-info">
                            <h3 class="project-title">${proj.title}</h3>
                            <p class="project-short-desc">${proj.shortDesc}</p>
                            <div class="project-techs">${techBadgesHTML}</div>
                            <div class="project-links">
                                <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="GitHub Code">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                    <span>Code</span>
                                </a>
                                <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="Live Website"><i data-lucide="external-link"></i> Live</a>
                                <button class="btn btn-small btn-primary open-details-btn" data-category="projects" data-id="${proj.id}">
                                    <span>View Details</span>
                                    <i data-lucide="eye"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            // Re-create icons for the tabs
            if (window.lucide) {
                window.lucide.createIcons();
            }
            
            // Add tab event listeners
            const tabBtns = tabsContainer.querySelectorAll('.project-tab-btn');
            const projectCards = cardsGrid.querySelectorAll('.project-card');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const filter = btn.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        const cats = JSON.parse(card.getAttribute('data-categories') || '[]');
                        
                        if (filter === 'all' || cats.includes(filter)) {
                            if (card.timeoutId) {
                                clearTimeout(card.timeoutId);
                                card.timeoutId = null;
                            }
                            card.style.display = '';
                            // Force reflow
                            void card.offsetHeight;
                            card.classList.remove('filtered-out');
                        } else {
                            card.classList.add('filtered-out');
                            if (!card.timeoutId) {
                                card.timeoutId = setTimeout(() => {
                                    if (card.classList.contains('filtered-out')) {
                                        card.style.display = 'none';
                                    }
                                    card.timeoutId = null;
                                }, 300);
                            }
                        }
                    });
                });
                
                // Set up hover tracking variable on tabs for mouse aura reflection shine
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    btn.style.setProperty('--mouse-x', `${x}px`);
                    btn.style.setProperty('--mouse-y', `${y}px`);
                });
            });
        }
    };

    // Learning / Growth Journey Loader
    const renderJourney = () => {
        const journey = PORTFOLIO_CONFIG.journey;
        const container = document.getElementById('journey-timeline-container');
        
        if (container && journey) {
            const itemsHTML = journey.map(item => `
                <div class="journey-item">
                    <div class="journey-dot"></div>
                    <div class="journey-card glass-panel" data-category="journey" data-id="${item.id}" title="Click to view learning outcomes">
                        <div class="journey-header-row">
                            <div class="journey-icon-box">
                                <i data-lucide="${item.icon}"></i>
                            </div>
                            <div class="journey-title-box">
                                <h3>${item.title}</h3>
                                <span class="journey-subtitle">${item.subtitle}</span>
                            </div>
                        </div>
                        <p class="journey-desc">${item.desc}</p>
                    </div>
                </div>
            `).join('');
            
            container.innerHTML = `
                <div class="journey-line"></div>
                <div class="journey-items-wrapper">
                    ${itemsHTML}
                </div>
            `;
        }
    };

    // Currently Learning Loader
    const renderCurrentlyLearning = () => {
        const currentlyLearning = PORTFOLIO_CONFIG.currentlyLearning;
        const container = document.getElementById('currently-learning-grid-container');
        
        if (container && currentlyLearning) {
            container.innerHTML = currentlyLearning.map(item => `
                <div class="learn-card glass-panel" data-category="currentlyLearning" data-id="${item.id}" title="Click to view target topics">
                    <div class="card-glow-bg"></div>
                    <div class="learn-card-header">
                        <div class="learn-icon-box">
                            <i data-lucide="${item.icon}"></i>
                        </div>
                        <h3>${item.title}</h3>
                    </div>
                    <p class="learn-desc">${item.desc}</p>
                </div>
            `).join('');
        }
    };

    // Achievements Loader
    const renderAchievements = () => {
        const achievements = PORTFOLIO_CONFIG.achievements;
        const timelineContainer = document.getElementById('achievements-timeline-container');
        
        if (timelineContainer && achievements) {
            const timelineHTML = achievements.map((ach) => {
                return `
                    <div class="ach-timeline-item">
                        <div class="ach-timeline-dot"></div>
                        <div class="ach-card glass-panel" data-category="achievements" data-id="${ach.id}">
                            <div class="card-glow-bg"></div>
                            <div class="ach-card-header">
                                <div class="ach-title-container">
                                    <div class="ach-icon-box">
                                        <i data-lucide="${ach.icon || 'award'}"></i>
                                    </div>
                                    <div class="ach-title-box">
                                        <h3>${ach.title}</h3>
                                        <span class="ach-subtitle">${ach.subtitle}</span>
                                    </div>
                                </div>
                                <div class="ach-year-badge">
                                    <span>${ach.year}</span>
                                </div>
                            </div>
                            <p class="ach-desc-text">${ach.desc}</p>
                        </div>
                    </div>
                `;
            }).join('');
            
            timelineContainer.innerHTML = `<div class="ach-timeline-line"></div><div class="ach-items-wrapper">${timelineHTML}</div>`;
        }
    };

    // Future Goals Loader
    const renderFutureGoals = () => {
        const futureGoals = PORTFOLIO_CONFIG.futureGoals;
        const container = document.getElementById('future-goals-grid-container');
        
        if (container && futureGoals) {
            container.innerHTML = futureGoals.map(goal => `
                <div class="goal-card glass-panel" data-category="futureGoals" data-id="${goal.id}" title="Click to view action steps">
                    <div class="card-glow-bg"></div>
                    <div class="goal-header-row">
                        <div class="goal-icon-box">
                            <i data-lucide="${goal.icon}"></i>
                        </div>
                        <h3>${goal.title}</h3>
                    </div>
                    <p class="goal-desc">${goal.desc}</p>
                </div>
            `).join('');
        }
    };

    // Contact Panel Loader
    const renderContactInfo = () => {
        const profile = PORTFOLIO_CONFIG.profile;
        const container = document.getElementById('contact-info-cards-container');
        
        if (container) {
            let socialsHTML = '';
            if (profile.socials.linkedin) {
                socialsHTML += `
                    <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-button linkedin-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        <span>LinkedIn</span>
                    </a>
                `;
            }
            if (profile.socials.github) {
                socialsHTML += `
                    <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" class="social-button github-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        <span>GitHub</span>
                    </a>
                `;
            }
            
            container.innerHTML = `
                <div class="info-card glass-panel">
                    <i data-lucide="mail" class="info-icon text-purple"></i>
                    <div class="info-text">
                        <span>Email Me</span>
                        <a href="mailto:${profile.email}" class="info-link">${profile.email}</a>
                    </div>
                </div>

                <div class="info-card glass-panel">
                    <i data-lucide="map-pin" class="info-icon text-indigo"></i>
                    <div class="info-text">
                        <span>Office Location</span>
                        <span class="info-data">${profile.location}</span>
                    </div>
                </div>
                
                <div class="social-channels-card glass-panel">
                    <h3>Connect on Social Networks</h3>
                    <div class="social-links-grid">
                        ${socialsHTML}
                    </div>
                </div>
            `;
        }
    };

    // Footer Loader
    const renderFooter = () => {
        const profile = PORTFOLIO_CONFIG.profile;
        const container = document.getElementById('footer-details-container');
        
        if (container) {
            container.innerHTML = `
                <div class="footer-left">
                    <a href="#home" class="footer-logo">
                        <span class="logo-bracket">&lt;</span>
                        <span class="logo-text">${profile.logoName}</span>
                        <span class="logo-bracket">/&gt;</span>
                    </a>
                    <p class="footer-subtitle">Built with HTML, CSS & JavaScript</p>
                    <p class="footer-copyright">
                        &copy; 2026 ${profile.name}. All rights reserved.
                    </p>
                </div>
                
                <div class="footer-middle">
                    <h4>Quick Links</h4>
                    <div class="footer-links">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#education">Education</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#journey">Learning Journey</a>
                        <a href="#achievements">Achievements</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
                
                <div class="footer-right">
                    <div class="footer-socials">
                        ${profile.socials.linkedin ? `<a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" title="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>` : ''}
                        ${profile.socials.github ? `<a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg></a>` : ''}
                        <a href="mailto:${profile.email}" title="Email"><i data-lucide="mail"></i></a>
                    </div>
                    <a href="#home" class="back-to-top-btn" id="back-to-top" title="Scroll to Top" aria-label="Scroll to Top">
                        <i data-lucide="arrow-up"></i>
                    </a>
                </div>
            `;
        }
    };

    // Device Viewport Preview Engine
    const initDevicePreview = () => {
        const desktopBtn = document.getElementById('preview-desktop-btn');
        const mobileBtn = document.getElementById('preview-mobile-btn');
        const appContainer = document.getElementById('app-container');
        
        if (desktopBtn && mobileBtn && appContainer) {
            desktopBtn.addEventListener('click', () => {
                desktopBtn.classList.add('active');
                mobileBtn.classList.remove('active');
                document.body.classList.remove('simulated-mobile-active');
                appContainer.classList.remove('simulated-mobile');
                
                // Trigger scroll handlers to update header
                window.dispatchEvent(new Event('scroll'));
            });
            
            mobileBtn.addEventListener('click', () => {
                mobileBtn.classList.add('active');
                desktopBtn.classList.remove('active');
                document.body.classList.add('simulated-mobile-active');
                appContainer.classList.add('simulated-mobile');
                
                // Trigger scroll handlers to update header inside container
                appContainer.dispatchEvent(new Event('scroll'));
            });
        }
    };




    /* --------------------------------------------------------------------------
       2. UNIFIED DETAILS MODAL MANAGER (CARD EXPANSION SYSTEM)
       -------------------------------------------------------------------------- */
    const detailsModal = document.getElementById('dynamic-details-modal');
    const modalContent = document.getElementById('details-modal-content');
    const modalCloseBtn = document.getElementById('details-modal-close-btn');
    const modalBackBtn = document.getElementById('details-modal-back-btn');
    
    let activeModalState = null;

    // Open dynamic modal
    const openDetailsModal = (category, id) => {
        let contentHTML = '';
        
        // 1. PROJECTS MODAL CONTENTTEMPLATE
        if (category === 'projects') {
            const proj = PORTFOLIO_CONFIG.projects.find(p => p.id === id);
            if (!proj) return;
            
            const featureList = proj.features.map(f => `<li><i data-lucide="check-circle" class="feat-icon text-purple"></i> ${f}</li>`).join('');
            const specPills = proj.modalTechs.map(t => `<span class="spec-pill">${t}</span>`).join('');
            
            contentHTML = `
                <div class="modal-hero">
                    <div class="modal-hero-img-box">
                        <img src="${proj.img}" alt="${proj.title}" onerror="this.src='https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop'">
                        <div class="modal-hero-glow"></div>
                    </div>
                    <div class="modal-hero-info">
                        <h2 class="modal-project-title">${proj.title}</h2>
                        <p class="modal-project-tagline">${proj.tagline}</p>
                        <div class="modal-meta-grid">
                            <div class="meta-item"><span class="meta-label">Role</span><span class="meta-value">${proj.role}</span></div>
                            <div class="meta-item"><span class="meta-label">Duration</span><span class="meta-value">${proj.duration}</span></div>
                            <div class="meta-item"><span class="meta-label">Category</span><span class="meta-value">${proj.category}</span></div>
                        </div>
                    </div>
                </div>
                <div class="modal-details-grid">
                    <div class="modal-left-col">
                        <h3>Project Overview</h3>
                        <p>${proj.longDesc}</p>
                        <h3>Key Features & Capabilities</h3>
                        <ul class="features-list">${featureList}</ul>
                    </div>
                    <div class="modal-right-col">
                        <div class="tech-specs-box glass-panel">
                            <h4>Technologies Used</h4>
                            <div class="specs-ribbon">${specPills}</div>
                            <hr class="specs-divider">
                            <div class="action-buttons-box">
                                <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-full-width"><i data-lucide="github"></i> <span>Repository Link</span></a>
                                <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-full-width"><i data-lucide="external-link"></i> <span>Live Preview</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } 
        
        // 2. EDUCATION MODAL CONTENT TEMPLATE
        else if (category === 'education') {
            const edu = PORTFOLIO_CONFIG.education.find(e => e.id === id);
            if (!edu || !edu.modalDetails) return;
            
            const detailItems = edu.modalDetails.syllabus.map(s => `<li><i data-lucide="book-open" class="feat-icon text-indigo"></i> ${s}</li>`).join('');
            const extraItems = edu.modalDetails.extracurriculars.map(x => `<li><i data-lucide="sparkles" class="feat-icon text-purple"></i> ${x}</li>`).join('');
            
            contentHTML = `
                <h2 class="modal-section-main-title">${edu.modalDetails.title}</h2>
                <p class="modal-section-subtitle">${edu.modalDetails.institution} &bull; ${edu.modalDetails.duration}</p>
                <div class="modal-accent-pill-badge">${edu.modalDetails.gradeText}</div>
                
                <div class="modal-details-grid" style="margin-top: 32px;">
                    <div class="modal-left-col">
                        <h3>Key Syllabus Topics covered</h3>
                        <ul class="features-list">${detailItems}</ul>
                    </div>
                    <div class="modal-right-col">
                        <div class="tech-specs-box glass-panel">
                            <h4>Activities & Projects</h4>
                            <ul class="features-list" style="margin-top: 0;">${extraItems}</ul>
                        </div>
                    </div>
                </div>
            `;
        } 
        
        // 3. SKILLS MODAL CONTENT TEMPLATE
        else if (category === 'skills') {
            const cat = PORTFOLIO_CONFIG.skills.categories.find(c => c.id === id);
            if (!cat || !cat.modalDetails) return;
            
            const topicsHTML = cat.modalDetails.topics.map(t => `<li><i data-lucide="check-circle" class="feat-icon text-indigo"></i> ${t}</li>`).join('');
            
            contentHTML = `
                <h2 class="modal-section-main-title">${cat.modalDetails.title}</h2>
                <p class="modal-section-desc-para">${cat.modalDetails.description}</p>
                
                <div class="modal-details-grid" style="margin-top: 24px;">
                    <div class="modal-left-col">
                        <h3>Core Concepts & Standards Practiced</h3>
                        <ul class="features-list">${topicsHTML}</ul>
                    </div>
                    <div class="modal-right-col">
                        <div class="tech-specs-box glass-panel">
                            <h4>Category Summary</h4>
                            <p style="font-size: 0.9rem; color: var(--text-secondary);">Currently mastering this stack through practical coding exercises, lab practices, and personal builds.</p>
                        </div>
                    </div>
                </div>
            `;
        } 
        
        // 4. LEARNING JOURNEY MODAL CONTENT TEMPLATE
        else if (category === 'journey') {
            const item = PORTFOLIO_CONFIG.journey.find(j => j.id === id);
            if (!item || !item.modalDetails) return;
            
            const achievementsHTML = item.modalDetails.achieved.map(a => `<li><i data-lucide="arrow-right" class="feat-icon text-indigo"></i> ${a}</li>`).join('');
            
            contentHTML = `
                <h2 class="modal-section-main-title">${item.modalDetails.title}</h2>
                <p class="modal-section-subtitle">${item.modalDetails.phase}</p>
                
                <div class="modal-details-grid" style="margin-top: 24px;">
                    <div class="modal-left-col">
                        <h3>Core Milestones Completed</h3>
                        <ul class="features-list">${achievementsHTML}</ul>
                    </div>
                    <div class="modal-right-col">
                        <div class="tech-specs-box glass-panel">
                            <h4>Phase Summary</h4>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">This milestone represents a critical step in building my fundamentals and gaining coding confidence.</p>
                        </div>
                    </div>
                </div>
            `;
        } 
        
        // 5. CURRENTLY LEARNING MODAL CONTENT TEMPLATE
        else if (category === 'currentlyLearning') {
            const item = PORTFOLIO_CONFIG.currentlyLearning.find(l => l.id === id);
            if (!item || !item.modalDetails) return;
            
            const topicsHTML = item.modalDetails.topics.map(t => `<li><i data-lucide="play" class="feat-icon text-purple" style="width: 14px;"></i> ${t}</li>`).join('');
            
            contentHTML = `
                <h2 class="modal-section-main-title">${item.modalDetails.title}</h2>
                
                <div class="modal-details-grid" style="margin-top: 24px;">
                    <div class="modal-left-col">
                        <h3>Learning Plan & Active Tasks</h3>
                        <ul class="features-list">${topicsHTML}</ul>
                    </div>
                    <div class="modal-right-col">
                        <div class="tech-specs-box glass-panel">
                            <h4>Status</h4>
                            <span class="badge-glowing" style="margin-bottom: 0;"><span class="badge-dot"></span> <span class="badge-text">Actively Studying</span></span>
                        </div>
                    </div>
                </div>
            `;
        } 
        
        
        // 7. ACHIEVEMENTS MODAL CONTENT TEMPLATE
        else if (category === 'achievements') {
            const ach = PORTFOLIO_CONFIG.achievements.find(a => a.id === id);
            if (!ach || !ach.modalDetails) return;
            
            const pointsHTML = ach.modalDetails.accomplished.map(p => `<li><i data-lucide="check" class="feat-icon text-yellow"></i> ${p}</li>`).join('');
            
            contentHTML = `
                <h2 class="modal-section-main-title">${ach.modalDetails.title}</h2>
                <p class="modal-section-subtitle">${ach.modalDetails.role} &bull; ${ach.year}</p>
                
                <div class="modal-details-grid" style="margin-top: 24px;">
                    <div class="modal-left-col">
                        <h3>Detailed Accomplishments</h3>
                        <ul class="features-list">${pointsHTML}</ul>
                    </div>
                    <div class="modal-right-col">
                        <div class="tech-specs-box glass-panel">
                            <h4>Category</h4>
                            <p style="font-size: 0.9rem; color: var(--text-secondary);"><i data-lucide="award" style="width:16px; margin-right:6px;"></i> Student Merit Achievement</p>
                        </div>
                    </div>
                </div>
            `;
        } 
        
        // 8. FUTURE GOALS MODAL CONTENT TEMPLATE
        else if (category === 'futureGoals') {
            const goal = PORTFOLIO_CONFIG.futureGoals.find(g => g.id === id);
            if (!goal || !goal.modalDetails) return;
            
            const stepsHTML = goal.modalDetails.actionSteps.map(s => `<li><i data-lucide="arrow-right" class="feat-icon text-purple"></i> ${s}</li>`).join('');
            
            contentHTML = `
                <h2 class="modal-section-main-title">${goal.modalDetails.title}</h2>
                
                <div class="modal-details-grid" style="margin-top: 24px;">
                    <div class="modal-left-col">
                        <h3>Action Steps Planned</h3>
                        <ul class="features-list">${stepsHTML}</ul>
                    </div>
                    <div class="modal-right-col">
                        <div class="tech-specs-box glass-panel">
                            <h4>Target Timeline</h4>
                            <p style="font-size: 0.9rem; color: var(--text-secondary);"><i data-lucide="calendar" style="width:16px; margin-right:6px;"></i> Ongoing Objective</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Render to DOM, transform icons and show modal
        if (contentHTML) {
            modalContent.innerHTML = contentHTML;
            if (window.lucide) {
                window.lucide.createIcons();
            }
            
            detailsModal.classList.add('open');
            document.body.classList.add('modal-open');
            activeModalState = { category, id };

            // Manage URL hash for Back button support
            const hash = `#details-${category}-${id}`;
            if (window.location.hash !== hash) {
                history.pushState({ modalOpen: true, category, id }, '', hash);
            }
        }
    };

    // Close dynamic details modal
    const closeDetailsModal = (shouldPopState = false) => {
        if (activeModalState) {
            detailsModal.classList.remove('open');
            document.body.classList.remove('modal-open');
            activeModalState = null;
            
            if (shouldPopState) {
                history.pushState(null, '', window.location.pathname + window.location.search);
            }
        }
    };

    // Card Clicks Delegating Listener
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.open-details-btn');
        
        if (trigger) {
            const category = trigger.getAttribute('data-category');
            const id = trigger.getAttribute('data-id');
            if (category && id) {
                openDetailsModal(category, id);
            }
        }
    });

    // Close button triggers
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => closeDetailsModal(true));
    if (modalBackBtn) modalBackBtn.addEventListener('click', () => closeDetailsModal(true));
    
    // Close modal on click outside
    if (detailsModal) {
        detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) {
                closeDetailsModal(true);
            }
        });
    }

    // Close modal on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModalState) {
            closeDetailsModal(true);
        }
    });

    // Back browser button routing popstate
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.category && e.state.id) {
            openDetailsModal(e.state.category, e.state.id);
        } else {
            closeDetailsModal(false);
        }
    });

    // Hash check on initial page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('details-')) {
            const parts = hash.split('-');
            if (parts.length >= 3) {
                const category = parts[1];
                const id = parts.slice(2).join('-');
                openDetailsModal(category, id);
            }
        }
    }

    // High-performance count-up counters for highlight cards
    const animateHighlightCounters = () => {
        const cards = document.querySelectorAll('.about-highlight-card');
        cards.forEach(card => {
            const numEl = card.querySelector('.counter-num');
            if (!numEl) return;
            
            const target = parseFloat(card.getAttribute('data-target-num'));
            const suffix = card.getAttribute('data-suffix') || '';
            const prefix = card.getAttribute('data-prefix') || '';
            
            let current = 0;
            const duration = 1500; // 1.5s count up duration for smoother effect
            const frameRate = 1000 / 60; // 60 FPS
            const totalFrames = Math.round(duration / frameRate);
            const increment = target / totalFrames;
            let frame = 0;
            
            const counterInterval = setInterval(() => {
                frame++;
                current += increment;
                
                if (frame >= totalFrames) {
                    current = target;
                    clearInterval(counterInterval);
                }
                
                // Format appropriately (decimals vs integers)
                if (Number.isInteger(target)) {
                    numEl.textContent = `${prefix}${Math.floor(current)}${suffix}`;
                } else {
                    numEl.textContent = `${prefix}${current.toFixed(2)}${suffix}`;
                }
            }, frameRate);
        });
    };

    // High-performance count-up counters for skill percentages
    const animateSkillPercentage = (el, targetValue) => {
        let current = 0;
        const duration = 1500; // 1.5s duration
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        const increment = targetValue / totalFrames;
        let frame = 0;
        
        const interval = setInterval(() => {
            frame++;
            current += increment;
            if (frame >= totalFrames) {
                current = targetValue;
                clearInterval(interval);
            }
            el.textContent = `${Math.round(current)}%`;
        }, frameRate);
    };

    // Scroll-triggered count-up counters using IntersectionObserver
    const initHighlightScrollTrigger = () => {
        const container = document.getElementById('about-highlights-container');
        if (!container) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHighlightCounters();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(container);
    };

    // Premium mouse hover 3D tilt, magnetic pull, and cursor-tracking reflection glows
    const initHighlightInteractions = () => {
        const targets = document.querySelectorAll('.about-highlight-card, .project-card, .skill-category-card, .ach-card, .learn-card, .goal-card');
        targets.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const maxTilt = 2.0; // Subtle, elegant, non-exaggerated tilt limit (2 degrees max)
                // Natural tilt direction: rotating the card face toward the cursor
                const tiltX = ((y - centerY) / centerY) * maxTilt;
                const tiltY = -((x - centerX) / centerX) * maxTilt;
                
                // Extremely subtle magnetic pull shift (max 2px)
                const moveX = (x - centerX) / centerX * 2;
                const moveY = (y - centerY) / centerY * 2;
                
                // Apply perspective tilt, elevation offset (-2px translate), and slight scale for depth
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${moveX * 0.2}px, ${moveY * 0.2 - 2}px, 6px) scale(1.01)`;
                card.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.45), 0 0 20px rgba(6, 182, 212, 0.12)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    };
    // High-performance canvas interactive AI-inspired cinematic background
    const initCanvasBackground = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;
        
        let mouse = { x: null, y: null };
        
        // Multi-layered cursor aura for distortion effect
        let mouseAura1 = { x: canvas.width / 2 || 600, y: canvas.height / 2 || 400 };
        let mouseAura2 = { x: canvas.width / 2 || 600, y: canvas.height / 2 || 400 };
        let mouseAura3 = { x: canvas.width / 2 || 600, y: canvas.height / 2 || 400 };
        const mouseTrail = [];
        
        // Parallax coordinates
        const targetParallax = { x: 0, y: 0 };
        const currentParallax = { x: 0, y: 0 };
        
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Organic background fog fields (visibility scaled up by 40%)
        const fogFields = [
            { xPct: 0.15, yPct: 0.25, radius: 950, color: 'rgba(6, 182, 212, 0.14)', angle: 0, speed: 0.00008, depth: 0.05 },
            { xPct: 0.85, yPct: 0.45, radius: 1050, color: 'rgba(59, 130, 246, 0.12)', angle: Math.PI / 4, speed: 0.00006, depth: 0.08 },
            { xPct: 0.45, yPct: 0.75, radius: 1000, color: 'rgba(168, 85, 247, 0.11)', angle: Math.PI * 2 / 3, speed: 0.00007, depth: 0.06 }
        ];
        
        const drawFogFields = (px, py) => {
            const w = canvas.width;
            const h = canvas.height;
            
            fogFields.forEach(f => {
                f.angle += f.speed;
                const dx = Math.sin(f.angle) * 120 + px * f.depth * 15;
                const dy = Math.cos(f.angle * 0.7) * 80 + py * f.depth * 15;
                const x = f.xPct * w + dx;
                const y = f.yPct * h + dy;
                
                const radiusPulse = f.radius + Math.sin(f.angle * 1.2) * 60;
                
                let grad = ctx.createRadialGradient(x, y, 0, x, y, radiusPulse);
                grad.addColorStop(0, f.color);
                grad.addColorStop(0.5, f.color.replace(/[\d.]+\)$/, '0.05)'));
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, radiusPulse, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        // Morphing ambient glow blobs (visibility scaled up by 40%)
        const morphBlobs = [
            { xPct: 0.3, yPct: 0.35, size: 450, color: 'rgba(6, 182, 212, 0.10)', phase: 0, depth: 0.07 },
            { xPct: 0.7, yPct: 0.65, size: 520, color: 'rgba(168, 85, 247, 0.08)', phase: Math.PI / 2, depth: 0.1 }
        ];
        
        const drawMorphBlobs = (px, py) => {
            morphBlobs.forEach(b => {
                b.phase += 0.0015;
                const x = b.xPct * canvas.width + px * b.depth * 15 + Math.sin(b.phase * 0.4) * 60;
                const y = b.yPct * canvas.height + py * b.depth * 15 + Math.cos(b.phase * 0.6) * 60;
                
                ctx.save();
                ctx.beginPath();
                const numPoints = 8;
                for (let i = 0; i < numPoints; i++) {
                    const angle = (i / numPoints) * Math.PI * 2;
                    const radiusOffset = Math.sin(b.phase + i * 1.2) * 30;
                    const r = b.size + radiusOffset;
                    const pxCurrent = x + Math.cos(angle) * r;
                    const pyCurrent = y + Math.sin(angle) * r;
                    
                    if (i === 0) ctx.moveTo(pxCurrent, pyCurrent);
                    else {
                        const prevAngle = ((i - 1) / numPoints) * Math.PI * 2;
                        const prevRadiusOffset = Math.sin(b.phase + (i - 1) * 1.2) * 30;
                        const prevR = b.size + prevRadiusOffset;
                        const prevPx = x + Math.cos(prevAngle) * prevR;
                        const prevPy = y + Math.sin(prevAngle) * prevR;
                        
                        const midX = (prevPx + pxCurrent) / 2;
                        const midY = (prevPy + pyCurrent) / 2;
                        ctx.quadraticCurveTo(prevPx, prevPy, midX, midY);
                    }
                }
                ctx.closePath();
                
                let grad = ctx.createRadialGradient(x, y, 0, x, y, b.size * 1.1);
                grad.addColorStop(0, b.color);
                grad.addColorStop(0.5, b.color.replace(/[\d.]+\)$/, '0.04)'));
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = grad;
                ctx.globalCompositeOperation = 'screen';
                ctx.fill();
                ctx.restore();
            });
        };

        // Soft moving aurora wave bands
        const auroraWaves = [
            { yPct: 0.25, amp: 90, freq: 0.0007, speed: 0.0003, color: 'rgba(6, 182, 212, 0.08)', depth: 0.06 },
            { yPct: 0.45, amp: 110, freq: 0.0005, speed: -0.0002, color: 'rgba(168, 85, 247, 0.07)', depth: 0.09 },
            { yPct: 0.65, amp: 100, freq: 0.0006, speed: 0.00025, color: 'rgba(59, 130, 246, 0.07)', depth: 0.08 }
        ];

        const drawAuroraWaves = (px, py) => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            
            auroraWaves.forEach(wave => {
                ctx.beginPath();
                const t = time * wave.speed;
                const waveYBase = wave.yPct * h + py * wave.depth * 15;
                
                for (let x = 0; x <= w; x += 15) {
                    const waveX = x + px * wave.depth * 15;
                    const y = waveYBase + Math.sin(waveX * wave.freq + t) * wave.amp + Math.cos(waveX * 0.0004 - t * 0.6) * (wave.amp * 0.35);
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                
                ctx.lineTo(w, h);
                ctx.lineTo(0, h);
                ctx.closePath();
                
                let grad = ctx.createLinearGradient(0, waveYBase - wave.amp * 1.5, 0, h);
                grad.addColorStop(0, wave.color);
                grad.addColorStop(0.4, wave.color.replace(/[\d.]+\)$/, '0.03)'));
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = grad;
                ctx.fill();
            });
            ctx.restore();
        };

        // Faint animated energy streaks
        const energyStreaks = [
            { yPct: 0.2, speed: 0.0006, length: 0.25, thickness: 2.4, color: 'rgba(6, 182, 212, ', amplitude: 18, depth: 0.12 },
            { yPct: 0.38, speed: 0.0004, length: 0.3, thickness: 3.0, color: 'rgba(168, 85, 247, ', amplitude: 25, depth: 0.18 },
            { yPct: 0.55, speed: 0.0007, length: 0.22, thickness: 2.0, color: 'rgba(59, 130, 246, ', amplitude: 22, depth: 0.15 },
            { yPct: 0.72, speed: 0.0005, length: 0.28, thickness: 3.2, color: 'rgba(168, 85, 247, ', amplitude: 20, depth: 0.22 },
            { yPct: 0.85, speed: 0.0008, length: 0.24, thickness: 2.8, color: 'rgba(6, 182, 212, ', amplitude: 24, depth: 0.28 }
        ];

        const drawEnergyStreaks = (px, py) => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            
            energyStreaks.forEach((streak, idx) => {
                const phase = time * streak.speed + idx * 10;
                const progress = (time * 0.008 * streak.speed) % 2.2 - 0.6; // Cycle progress
                
                ctx.beginPath();
                let first = true;
                const startX = -w * 0.1;
                const endX = w * 1.1;
                const step = 20;
                
                for (let x = startX; x <= endX; x += step) {
                    const streakX = x + px * streak.depth * 15;
                    const y = streak.yPct * h + py * streak.depth * 15 + Math.sin(streakX * 0.0025 + phase) * streak.amplitude + Math.cos(streakX * 0.001 - phase * 0.5) * (streak.amplitude * 0.3);
                    
                    const nodePosPct = (x - startX) / (endX - startX);
                    const distFromProgress = Math.abs(nodePosPct - progress);
                    
                    if (distFromProgress < streak.length) {
                        const opacityFactor = Math.pow(1 - (distFromProgress / streak.length), 2);
                        const strokeAlpha = opacityFactor * 0.22; // More visible moving light streaks
                        
                        if (first) {
                            ctx.moveTo(x, y);
                            first = false;
                        } else {
                            ctx.lineTo(x, y);
                        }
                        
                        ctx.strokeStyle = `${streak.color}${strokeAlpha})`;
                        ctx.lineWidth = streak.thickness;
                        ctx.stroke();
                        
                        // Restart path for each segment to get proper alpha gradient
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                    }
                }
            });
            ctx.restore();
        };

        // Volumetric background components (increased base opacities by 40%)
        const glowClouds = [];
        const techTraces = [];
        const lightBeams = [];
        let sweepProgress = 0.0;
        const sweepSpeed = 0.00045;

        const initVolumetricEnvironment = () => {
            // Initialize 5 large volumetric glow clouds (auroras) with +40% visibility
            glowClouds.length = 0;
            glowClouds.push(
                { xPct: 0.1, yPct: 0.15, radius: 680, color: "rgba(6, 182, 212, 0.16)", phaseX: 0, phaseY: Math.PI/3, driftSpeed: 0.00015, depth: 0.15 }, // Top-Left Cyan
                { xPct: 0.85, yPct: 0.2, radius: 780, color: "rgba(168, 85, 247, 0.14)", phaseX: Math.PI/4, phaseY: 0, driftSpeed: 0.00012, depth: 0.2 }, // Top-Right Violet (behind profile image)
                { xPct: 0.25, yPct: 0.8, radius: 850, color: "rgba(59, 130, 246, 0.15)", phaseX: Math.PI/2, phaseY: Math.PI/6, driftSpeed: 0.00014, depth: 0.18 }, // Bottom-Left Electric Blue
                { xPct: 0.75, yPct: 0.85, radius: 750, color: "rgba(219, 39, 119, 0.11)", phaseX: Math.PI/3, phaseY: Math.PI/2, driftSpeed: 0.0001, depth: 0.22 }, // Bottom-Right Soft Magenta
                { xPct: 0.5, yPct: 0.45, radius: 620, color: "rgba(6, 182, 212, 0.10)", phaseX: Math.PI*2/3, phaseY: Math.PI/4, driftSpeed: 0.00016, depth: 0.12 } // Center-right Cyan
            );

            // Tech traces are extremely sparse and are drawn as neural fibers rather than wireframes (no dots)
            techTraces.length = 0;
            for (let i = 0; i < 14; i++) {
                techTraces.push({
                    id: i,
                    xPct: 0.05 + Math.random() * 0.9,
                    yPct: 0.08 + Math.random() * 0.84,
                    offsetX: 0,
                    offsetY: 0,
                    phaseX: Math.random() * Math.PI * 2,
                    phaseY: Math.random() * Math.PI * 2,
                    driftSpeed: Math.random() * 0.0002 + 0.0001,
                    depth: 0.3 + Math.random() * 0.4,
                    glow: 0,
                    connections: []
                });
            }

            // Connection mapping
            for (let i = 0; i < techTraces.length; i++) {
                const node = techTraces[i];
                const dists = techTraces
                    .map((other, idx) => ({ idx, dist: Math.hypot(node.xPct - other.xPct, node.yPct - other.yPct) }))
                    .filter(d => d.idx !== i)
                    .sort((a, b) => a.dist - b.dist);
                
                if (dists[0] && dists[0].dist < 0.25) {
                    node.connections.push(dists[0].idx);
                }
            }

            // 5 Volumetric light beams (cinematic rays, scaled up by 40% in visibility)
            lightBeams.length = 0;
            lightBeams.push(
                { xPct: -0.2, width: 300, speed: 0.00045, opacity: 0.065, color: "rgba(6, 182, 212, " },
                { xPct: 0.15, width: 250, speed: 0.00035, opacity: 0.055, color: "rgba(59, 130, 246, " },
                { xPct: 0.45, width: 360, speed: 0.00028, opacity: 0.050, color: "rgba(168, 85, 247, " },
                { xPct: 0.75, width: 280, speed: 0.0004, opacity: 0.060, color: "rgba(6, 182, 212, " },
                { xPct: 1.05, width: 260, speed: 0.0005, opacity: 0.070, color: "rgba(59, 130, 246, " }
            );
        };

        const drawVolumetricEnvironment = (px, py) => {
            const w = canvas.width;
            const h = canvas.height;

            // 1. Draw Volumetric Glow Clouds
            glowClouds.forEach(cloud => {
                const driftAmp = Math.min(w, h) * 0.1;
                cloud.offsetX = Math.sin(time * cloud.driftSpeed + cloud.phaseX) * driftAmp;
                cloud.offsetY = Math.cos(time * cloud.driftSpeed + cloud.phaseY) * driftAmp;

                let drawX = cloud.xPct * w + cloud.offsetX + px * cloud.depth * 24;
                let drawY = cloud.yPct * h + cloud.offsetY + py * cloud.depth * 24;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - drawX;
                    const dy = mouse.y - drawY;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 450) {
                        const pull = (450 - dist) / 450 * 50 * cloud.depth;
                        drawX += (dx / (dist || 1)) * pull;
                        drawY += (dy / (dist || 1)) * pull;
                    }
                }

                const pulse = Math.sin(time * 0.0004 + cloud.phaseX) * 45;
                const activeRadius = cloud.radius + pulse;

                let grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, activeRadius);
                grad.addColorStop(0, cloud.color);
                grad.addColorStop(0.3, cloud.color.replace(/[\d.]+\)$/, '0.08)'));
                grad.addColorStop(0.6, cloud.color.replace(/[\d.]+\)$/, '0.03)'));
                grad.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(drawX, drawY, activeRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // 2. Draw Moving Volumetric Light Beams (cinematic rays)
            lightBeams.forEach(beam => {
                beam.xPct += beam.speed;
                if (beam.xPct > 1.4) {
                    beam.xPct = -0.5;
                }

                const startX = beam.xPct * w;
                const angleOffset = Math.sin(time * 0.0001) * 40;
                const endX = startX + h * 0.7 + angleOffset;

                ctx.save();
                ctx.globalCompositeOperation = 'screen';

                let rayGrad = ctx.createLinearGradient(startX, 0, startX + beam.width, 0);
                rayGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
                rayGrad.addColorStop(0.3, `${beam.color}${beam.opacity * 0.45})`);
                rayGrad.addColorStop(0.5, `${beam.color}${beam.opacity})`);
                rayGrad.addColorStop(0.7, `${beam.color}${beam.opacity * 0.45})`);
                rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.fillStyle = rayGrad;
                ctx.beginPath();
                ctx.moveTo(startX, 0);
                ctx.lineTo(startX + beam.width, 0);
                ctx.lineTo(endX + beam.width, h);
                ctx.lineTo(endX, h);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            });

            // 3. Draw Holographic Diagonal Sweep Waves
            sweepProgress += sweepSpeed;
            if (sweepProgress > 2.2) {
                sweepProgress = -0.4;
            }
            if (sweepProgress > -0.1 && sweepProgress < 1.8) {
                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                
                const sweepX = sweepProgress * w;
                const sweepWidth = w * 0.15;
                
                let sweepGrad = ctx.createLinearGradient(sweepX, 0, sweepX + sweepWidth, h * 0.5);
                sweepGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
                sweepGrad.addColorStop(0.4, "rgba(6, 182, 212, 0.017)");
                sweepGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.025)");
                sweepGrad.addColorStop(0.6, "rgba(59, 130, 246, 0.017)");
                sweepGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.fillStyle = sweepGrad;
                ctx.beginPath();
                ctx.moveTo(sweepX - h * 0.3, 0);
                ctx.lineTo(sweepX + sweepWidth - h * 0.3, 0);
                ctx.lineTo(sweepX + sweepWidth + h * 0.7, h);
                ctx.lineTo(sweepX + h * 0.7, h);
                ctx.closePath();
                ctx.fill();
                
                ctx.restore();
            }

            // 4. Draw Proximity Neural Fibers (No visible dots/circles, curves only, extremely subtle)
            techTraces.forEach(node => {
                const baseX = node.xPct * w;
                const baseY = node.yPct * h;

                const driftAmp = Math.min(w, h) * 0.015;
                node.offsetX = Math.sin(time * node.driftSpeed + node.phaseX) * driftAmp;
                node.offsetY = Math.cos(time * node.driftSpeed + node.phaseY) * driftAmp;

                node.drawX = baseX + node.offsetX + px * node.depth * 16;
                node.drawY = baseY + node.offsetY + py * node.depth * 16;

                node.glow = 0;
                if (mouse.x !== null && mouse.y !== null) {
                    const dist = Math.hypot(node.drawX - mouse.x, node.drawY - mouse.y);
                    const activeRange = 250;
                    if (dist < activeRange) {
                        node.glow = (activeRange - dist) / activeRange;
                    }
                }
            });

            ctx.save();
            ctx.globalCompositeOperation = 'screen';

            techTraces.forEach(node => {
                if (node.glow > 0.05) {
                    const strokeAlpha = node.glow * 0.009;
                    
                    node.connections.forEach(connIdx => {
                        const target = techTraces[connIdx];
                        
                        // Draw as a smooth organic curve rather than sharp straight line
                        const midX = (node.drawX + target.drawX) / 2;
                        const midY = (node.drawY + target.drawY) / 2;
                        const ctrlX = midX + Math.sin(time * 0.0008 + node.id) * 20;
                        const ctrlY = midY + Math.cos(time * 0.0008 + node.id) * 20;
                        
                        let lineGrad = ctx.createLinearGradient(node.drawX, node.drawY, target.drawX, target.drawY);
                        lineGrad.addColorStop(0, `rgba(6, 182, 212, ${strokeAlpha})`);
                        lineGrad.addColorStop(1, `rgba(168, 85, 247, ${strokeAlpha * 0.6})`);

                        ctx.beginPath();
                        ctx.moveTo(node.drawX, node.drawY);
                        ctx.quadraticCurveTo(ctrlX, ctrlY, target.drawX, target.drawY);
                        ctx.strokeStyle = lineGrad;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    });
                }
            });

            ctx.restore();
        };

        // Smooth liquid-like cursor-reactive distortion glow
        const drawCursorAura = () => {
            if (mouse.x !== null && mouse.y !== null) {
                // Smoothly interpolate each aura center with progressive latency to create distortion
                mouseAura1.x += (mouse.x - mouseAura1.x) * 0.07;
                mouseAura1.y += (mouse.y - mouseAura1.y) * 0.07;
                
                mouseAura2.x += (mouseAura1.x - mouseAura2.x) * 0.045;
                mouseAura2.y += (mouseAura1.y - mouseAura2.y) * 0.045;
                
                mouseAura3.x += (mouseAura2.x - mouseAura3.x) * 0.025;
                mouseAura3.y += (mouseAura2.y - mouseAura3.y) * 0.025;
                
                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                
                // Layer 3 (Slowest, largest, very soft violet aura)
                let grad3 = ctx.createRadialGradient(mouseAura3.x, mouseAura3.y, 0, mouseAura3.x, mouseAura3.y, 520);
                grad3.addColorStop(0, 'rgba(168, 85, 247, 0.09)');
                grad3.addColorStop(0.5, 'rgba(168, 85, 247, 0.025)');
                grad3.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad3;
                ctx.beginPath();
                ctx.arc(mouseAura3.x, mouseAura3.y, 520, 0, Math.PI * 2);
                ctx.fill();
                
                // Layer 2 (Medium, royal blue aura)
                let grad2 = ctx.createRadialGradient(mouseAura2.x, mouseAura2.y, 0, mouseAura2.x, mouseAura2.y, 420);
                grad2.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
                grad2.addColorStop(0.5, 'rgba(59, 130, 246, 0.035)');
                grad2.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad2;
                ctx.beginPath();
                ctx.arc(mouseAura2.x, mouseAura2.y, 420, 0, Math.PI * 2);
                ctx.fill();
                
                // Layer 1 (Fastest, core cyan glow)
                let grad1 = ctx.createRadialGradient(mouseAura1.x, mouseAura1.y, 0, mouseAura1.x, mouseAura1.y, 270);
                grad1.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
                grad1.addColorStop(0.5, 'rgba(6, 182, 212, 0.045)');
                grad1.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad1;
                ctx.beginPath();
                ctx.arc(mouseAura1.x, mouseAura1.y, 270, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        };

        const drawGlowTrail = () => {
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            for (let i = mouseTrail.length - 1; i >= 0; i--) {
                const pt = mouseTrail[i];
                pt.x += pt.vx;
                pt.y += pt.vy;
                pt.size += 0.8;
                pt.opacity -= 0.005;
                
                if (pt.opacity <= 0) {
                    mouseTrail.splice(i, 1);
                    continue;
                }
                
                let grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.size);
                grad.addColorStop(0, `${pt.color}${pt.opacity})`);
                grad.addColorStop(0.5, `${pt.color}${pt.opacity * 0.30})`);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        };
        
        const animate = () => {
            time += 16.67; // ms per frame
            
            // Interpolate parallax with inertia
            currentParallax.x += (targetParallax.x - currentParallax.x) * 0.05;
            currentParallax.y += (targetParallax.y - currentParallax.y) * 0.05;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 1. Render background organic fog / auroras
            drawFogFields(currentParallax.x, currentParallax.y);
            
            // 2. Render morphing ambient glow blobs
            drawMorphBlobs(currentParallax.x, currentParallax.y);
            
            // 3. Render soft moving aurora waves
            drawAuroraWaves(currentParallax.x, currentParallax.y);
            
            // 4. Render soft cursor aura spotlight with liquid distortion
            drawCursorAura();
            
            // 5. Render cinematic volumetric environment (glow clouds, rays, sweep)
            drawVolumetricEnvironment(currentParallax.x, currentParallax.y);
            
            // 6. Render faint animated energy streaks
            drawEnergyStreaks(currentParallax.x, currentParallax.y);
            
            // 7. Render cursor glow trails
            drawGlowTrail();
            
            animationFrameId = requestAnimationFrame(animate);
        };
        
        window.addEventListener('resize', () => {
            setCanvasSize();
            initVolumetricEnvironment();
        });
        
        const handleMouseMove = (e) => {
            const isMobileSim = document.body.classList.contains('simulated-mobile-active');
            let mx, my;
            if (isMobileSim) {
                const appContainer = document.getElementById('app-container');
                const rect = appContainer.getBoundingClientRect();
                mx = e.clientX - rect.left;
                my = e.clientY - rect.top;
            } else {
                mx = e.clientX;
                my = e.clientY;
            }
            
            mouse.x = mx;
            mouse.y = my;
            
            // Update parallax target
            targetParallax.x = (mx - canvas.width / 2) * -0.04;
            targetParallax.y = (my - canvas.height / 2) * -0.04;
            
            // Push trail particle
            if (Math.random() < 0.35) {
                mouseTrail.push({
                    x: mx,
                    y: my,
                    size: Math.random() * 40 + 30,
                    opacity: 0.25,
                    color: Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(59, 130, 246,',
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4
                });
            }
        };
        
        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
            targetParallax.x = 0;
            targetParallax.y = 0;
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        
        setCanvasSize();
        initVolumetricEnvironment();
        animate();
        
        window.addEventListener('unload', () => {
            cancelAnimationFrame(animationFrameId);
        });
    };

    /* --------------------------------------------------------------------------
       3. PAGE LOADER PROGRESS
       -------------------------------------------------------------------------- */
    const handlePageLoad = () => {
        const loader = document.getElementById('loader-overlay');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                initHighlightScrollTrigger();
            }, 500);
        } else {
            initHighlightScrollTrigger();
        }
    };




    /* --------------------------------------------------------------------------
       4. THEME TOGGLER (LOCALSTORAGE SESSIONS)
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });


    /* --------------------------------------------------------------------------
       5. HERO TYPING LOOP (STUDENT DATA)
       -------------------------------------------------------------------------- */
    const typingSpan = document.getElementById('typing-text');
    const roles = PORTFOLIO_CONFIG.profile.roles;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        if (!typingSpan) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 300;
        }

        setTimeout(typeEffect, typingSpeed);
    };

    if (typingSpan && roles.length > 0) {
        setTimeout(typeEffect, 1200);
    }


    /* --------------------------------------------------------------------------
       6. DESKTOP MOUSE GLOW AURA COORDINATES
       -------------------------------------------------------------------------- */
    const cursorGlow = document.getElementById('cursor-glow');
    const glassPanels = document.querySelectorAll('.glass-panel');

    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
        
        // Pass mouse coords to glass card elements for reflection shines
        glassPanels.forEach(panel => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            panel.style.setProperty('--mouse-x', `${x}px`);
            panel.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    document.addEventListener('mouseleave', () => {
        if (cursorGlow) cursorGlow.style.opacity = '0';
    });


    /* --------------------------------------------------------------------------
       7. STICKY HEADER & SCROLL PROGRESS BAR
       -------------------------------------------------------------------------- */
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('scroll-progress-bar');
    const backToTopBtn = document.getElementById('back-to-top');

    const getScrollState = () => {
        const isMobileSim = document.body.classList.contains('simulated-mobile-active');
        const container = isMobileSim ? document.getElementById('app-container') : null;
        
        const scrollTop = isMobileSim ? container.scrollTop : window.scrollY;
        const documentHeight = isMobileSim 
            ? (container.scrollHeight - container.clientHeight) 
            : (document.documentElement.scrollHeight - window.innerHeight);
            
        return { scrollTop, documentHeight };
    };

    const handleScroll = () => {
        const { scrollTop, documentHeight } = getScrollState();
        
        if (progressBar && documentHeight > 0) {
            const percentage = (scrollTop / documentHeight) * 100;
            progressBar.style.width = `${percentage}%`;
        }

        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 600) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    const appContainerEl = document.getElementById('app-container');
    if (appContainerEl) {
        appContainerEl.addEventListener('scroll', handleScroll);
    }
    handleScroll();


    /* --------------------------------------------------------------------------
       8. MOBILE BURGER MENU DRAWER
       -------------------------------------------------------------------------- */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        const isOpen = mobileMenuToggle.classList.contains('open');
        if (isOpen) {
            mobileMenuToggle.classList.remove('open');
            mobileNavDrawer.classList.remove('open');
            document.body.classList.remove('modal-open');
        } else {
            mobileMenuToggle.classList.add('open');
            mobileNavDrawer.classList.add('open');
            document.body.classList.add('modal-open');
        }
    };

    if (mobileMenuToggle && mobileNavDrawer) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('open');
                mobileNavDrawer.classList.remove('open');
                document.body.classList.remove('modal-open');
            });
        });
    }


    /* --------------------------------------------------------------------------
       9. INTERSECTION OBSERVER (SCROLL REVEALS)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');
    const revealTextElements = document.querySelectorAll('.reveal-text');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If revealing skills section, trigger inner progress bar fills and progressive counters
                if (entry.target.classList.contains('skills-section')) {
                    const fills = entry.target.querySelectorAll('.skill-bar-fill');
                    fills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-percentage') + '%';
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                        }, 100);
                    });
                    
                    const pctEls = entry.target.querySelectorAll('.skill-percentage');
                    pctEls.forEach(pctEl => {
                        const targetVal = parseInt(pctEl.getAttribute('data-target'), 10);
                        if (!isNaN(targetVal)) {
                            pctEl.textContent = '0%';
                            setTimeout(() => {
                                animateSkillPercentage(pctEl, targetVal);
                            }, 150);
                        }
                    });
                }
            }
        });
    }, {
        threshold: 0.01,
        rootMargin: '0px 0px 100px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
    revealTextElements.forEach(el => revealObserver.observe(el));


    /* --------------------------------------------------------------------------
       10. NAV LINK SCROLL SPY ACTIVE SECTIONS
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section');
    const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

    const updateActiveNav = () => {
        const isMobileSim = document.body.classList.contains('simulated-mobile-active');
        const container = isMobileSim ? document.getElementById('app-container') : null;
        const scrollTop = isMobileSim ? container.scrollTop : window.scrollY;
        
        let currentSectionId = 'home';
        const scrollPosition = scrollTop + 120;

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.offsetHeight;
            if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    if (appContainerEl) {
        appContainerEl.addEventListener('scroll', updateActiveNav);
    }
    updateActiveNav();


    /* --------------------------------------------------------------------------
       11. ABOUT EXPANDABLE READ MORE
       -------------------------------------------------------------------------- */
    const readMoreBtn = document.getElementById('about-read-more-btn');
    const aboutExpandable = document.getElementById('about-expandable');

    if (readMoreBtn && aboutExpandable) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                aboutExpandable.classList.remove('expanded');
                readMoreBtn.setAttribute('aria-expanded', 'false');
                readMoreBtn.querySelector('span').textContent = 'Read More';
            } else {
                aboutExpandable.classList.add('expanded');
                readMoreBtn.setAttribute('aria-expanded', 'true');
                readMoreBtn.querySelector('span').textContent = 'Read Less';
            }
        });
    }


    /* --------------------------------------------------------------------------
       12. CONTACT MESSAGE FORM VALIDATION
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('form-success-overlay');
    const successCloseBtn = document.getElementById('success-close-btn');

    const validateInput = (inputGroup, input) => {
        let valid = true;
        
        if (input.hasAttribute('required') && input.value.trim() === '') {
            valid = false;
        }
        
        if (valid && input.type === 'email') {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            valid = re.test(String(input.value).toLowerCase());
        }

        if (valid) {
            inputGroup.classList.remove('invalid');
        } else {
            inputGroup.classList.add('invalid');
        }

        return valid;
    };

    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            const group = input.closest('.input-group');
            input.addEventListener('blur', () => validateInput(group, input));
            input.addEventListener('input', () => {
                if (group.classList.contains('invalid')) {
                    validateInput(group, input);
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            inputs.forEach(input => {
                const group = input.closest('.input-group');
                if (!validateInput(group, input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                const submitBtn = document.getElementById('form-submit-btn');
                const origBtnText = submitBtn.querySelector('span').textContent;
                
                submitBtn.disabled = true;
                submitBtn.querySelector('span').textContent = 'Sending Message...';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span').textContent = origBtnText;
                    contactForm.reset();
                    
                    if (successOverlay) {
                        successOverlay.classList.add('show');
                    }
                }, 1500);
            }
        });
    }

    if (successCloseBtn && successOverlay) {
        successCloseBtn.addEventListener('click', () => {
            successOverlay.classList.remove('show');
        });
    }

    // Handle anchor navigation intercept in simulated mobile mode
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor && document.body.classList.contains('simulated-mobile-active')) {
            const href = anchor.getAttribute('href');
            if (href === '#') return; // Ignore empty anchors
            
            const target = document.querySelector(href);
            const appContainer = document.getElementById('app-container');
            if (target && appContainer) {
                e.preventDefault();
                appContainer.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
                
                // If it's a mobile nav link, make sure to close the mobile nav drawer
                if (anchor.classList.contains('mobile-nav-link')) {
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
                    if (mobileMenuToggle && mobileNavDrawer) {
                        mobileMenuToggle.classList.remove('open');
                        mobileNavDrawer.classList.remove('open');
                        document.body.classList.remove('modal-open');
                    }
                }
                
                // Update history hash
                history.pushState(null, '', href);
            }
        }
    });

    // Initialize rendering sequence (executed after all functions are defined)
    initDynamicPortfolio();

    // Dismiss loader overlay after a brief visual delay once DOMContentLoaded has finished rendering
    setTimeout(handlePageLoad, 300);

};

if (document.readyState !== 'loading') {
    startPortfolio();
} else {
    document.addEventListener('DOMContentLoaded', startPortfolio);
}
