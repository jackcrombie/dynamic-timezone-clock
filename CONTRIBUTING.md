# Contributing to Dynamic Timezone Clock

Thank you for your interest in contributing to Dynamic Timezone Clock! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript
- A web server for testing (Caddy recommended)
- Modern web browser for testing

### Setting Up Development Environment

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/jackcrombie/dynamic-timezone-clock.git
   cd dynamic-timezone-clock
   ```

2. **Set up local testing:**
   ```bash
   # Create development directory
   mkdir -p ~/clock-dev
   cp *.html ~/clock-dev/
   
   # Test locally with a simple server
   cd ~/clock-dev
   python3 -m http.server 8080
   # Visit http://localhost:8080
   ```

## 🛠️ Development Guidelines

### Code Style
- **HTML**: Use semantic HTML5 elements, proper indentation (2 spaces)
- **CSS**: Use modern CSS features, maintain mobile responsiveness
- **JavaScript**: Use modern ES6+ features, maintain browser compatibility
- **Comments**: Add clear comments for complex logic

### Design Principles
1. **Keep it simple** - This is a utility, not a complex application
2. **Maintain performance** - Minimal dependencies, fast loading
3. **Browser compatibility** - Support modern browsers (last 3 versions)
4. **Accessibility** - Ensure good contrast, semantic markup
5. **Mobile-first** - Responsive design that works on all devices

### File Structure
```
dynamic-timezone-clock/
├── index.html          # Main clock display (keep minimal)
├── config.html         # Configuration page
├── updateclock.sh      # Deployment script
├── Caddyfile.example   # Web server configuration
└── docs/               # Documentation files
```

## 🐛 Bug Reports

When filing a bug report, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the bug
3. **Expected vs actual behavior**
4. **Browser and version** you're using
5. **Timezone and parameters** you were testing with
6. **Screenshots** if applicable

### Bug Report Template
```markdown
**Bug Description:**
A clear description of what the bug is.

**To Reproduce:**
1. Go to '...'
2. Set timezone to '...'
3. Set parameters to '...'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Environment:**
- Browser: [e.g., Chrome 91]
- OS: [e.g., macOS 11.5]
- URL/Parameters: [e.g., ?tz=America/New_York&code=NYC&bg=black]

**Screenshots:**
If applicable, add screenshots to help explain your problem.
```

## 💡 Feature Requests

We love new ideas! When suggesting a feature:

1. **Check existing issues** first to avoid duplicates
2. **Describe the use case** - why would this be useful?
3. **Propose implementation** - how might it work?
4. **Consider complexity** - does it fit the "simple utility" goal?

### Feature Request Template
```markdown
**Feature Description:**
A clear description of the feature you'd like to see.

**Use Case:**
Describe a specific scenario where this would be helpful.

**Proposed Solution:**
How do you think this could be implemented?

**Alternatives:**
Are there other ways to achieve the same goal?

**Additional Context:**
Any other information, mockups, or examples.
```

## 🔄 Pull Requests

### Before Submitting
1. **Test thoroughly** on multiple browsers
2. **Test multiple timezones** (especially edge cases)
3. **Check mobile responsiveness**
4. **Verify URL parameter handling**
5. **Ensure backwards compatibility**

### Pull Request Process
1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the guidelines above
4. **Test your changes** thoroughly
5. **Commit with clear messages** (`git commit -m 'Add timezone validation'`)
6. **Push to your branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request** with a clear description

### Pull Request Template
```markdown
**Description:**
Brief description of changes and motivation.

**Type of Change:**
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

**Testing:**
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari/Edge
- [ ] Tested with multiple timezones
- [ ] Tested mobile responsiveness
- [ ] Tested with various background colours

**Checklist:**
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] No new warnings or errors introduced
- [ ] Works with existing URL parameters
- [ ] Backwards compatible
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Clock displays correct time for various timezones
- [ ] Background colours work (transparent, solid, RGBA)
- [ ] Display codes show correctly
- [ ] Configuration page generates correct URLs
- [ ] Mobile display works properly
- [ ] URL parameters parse correctly
- [ ] Clock updates every second
- [ ] WorldTimeAPI integration works
- [ ] Fallback works when API is unavailable

### Test Cases to Consider
1. **Timezones**: America/New_York, Europe/London, Asia/Tokyo, Australia/Sydney
2. **Backgrounds**: transparent, black, white, #ff0000, rgba(255,0,0,0.5)
3. **Codes**: 3-letter (NYC), 4-letter (AEDT), 5-letter (TOKYO)
4. **Edge cases**: Invalid timezone, empty parameters, special characters

## 📋 Areas We Need Help With

- **Browser testing** on older/uncommon browsers
- **Timezone edge cases** and daylight saving transitions
- **Performance optimization** for low-end devices
- **Accessibility improvements** for screen readers
- **Documentation** and examples
- **Internationalization** (though this might be out of scope)

## 💬 Questions?

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions and ideas
- **Pull Request Comments**: For code-specific questions

## 🎉 Recognition

Contributors will be:
- Listed in the README.md file
- Credited in release notes for significant contributions
- Given collaborator access for sustained, quality contributions

Thank you for helping make Dynamic Timezone Clock better for everyone! 🕐