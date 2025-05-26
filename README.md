# MindHub

MindHub is an informative, user-friendly, and interactive web platform focused initially on mental health information — including conditions, therapies, and medications. The platform aims to become a trusted, go-to resource for accessible medical knowledge, combining science-backed content with empathy and community interaction.

## Features

- Comprehensive articles on mental health conditions and medications  
- Searchable database of mental health drugs (SSRIs, antipsychotics, mood stabilizers, etc.)  
- Personal stories and coping strategies  
- Therapist-reviewed and verified content  
- Interactive Q&A and comment sections  
- Responsive design optimized for both desktop and mobile devices  
- Role-based access control for users and admins  
- Scalable architecture for expanding into broader medical topics

## Technology Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Django, Django REST Framework  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Tokens) / Django AllAuth  
- **Deployment:** Vercel (Frontend), Render/Heroku/DigitalOcean (Backend)  
- **Version Control:** Git, GitHub  

## Installation and Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/muhaisesamson/fullstackblog
   cd mindhub/backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv mindhub_env
   source mindhub_env/bin/activate  # On Windows: mindhub_env\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. Run migrations and start server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to frontend and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API endpoints
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Contributing

We welcome contributions! Here's how to get started:

### How to Contribute

1. **Fork the repository** and clone it locally
2. **Create a new branch** for your feature: `git checkout -b feature/your-feature`
3. **Make your changes** following our code standards
4. **Test your changes** and ensure everything works
5. **Submit a pull request** with a clear description

### Types of Contributions

- **Code**: Bug fixes, new features, performance improvements
- **Content**: Articles, medical content review, translations  
- **Design**: UI/UX improvements, accessibility enhancements
- **Documentation**: README updates, code comments, guides

### Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Include tests for new features
- Medical content must be reviewed by healthcare professionals
- Be respectful and constructive in discussions

### Reporting Issues

Found a bug or have a feature request? Please check existing issues first, then create a new issue with:
- Clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Screenshots if applicable

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Check [existing issues](https://github.com/muhaisesamson/fullstackblog) for common problems
- Create a new issue for bugs or feature requests


---

**Disclaimer**: MindHub provides educational information only and is not a substitute for professional medical advice.
