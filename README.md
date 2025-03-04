# SpeedFill ✨

SpeedFill is a powerful web application designed to simplify and enhance the job application process. By leveraging advanced AI, it provides a detailed analysis of your resume and generates personalized cover letters tailored to specific job descriptions. With features like match scoring, strengths identification, and improvement recommendations, SpeedFill aims to empower job seekers to present their best selves in every application.

## Table of Contents 📑

- [Project Overview 📝](#project-overview-)
- [Core Features 🚀](#core-features-)
- [Usage Guide ▶️](#usage-guide-)
- [Project Structure 📂](#project-structure-)
- [Contributing 🤝](#contributing-)
- [License 📄](#license-)

## Project Overview 📝

SpeedFill streamlines the job application process by providing two main functionalities:

- **Resume Analysis**: Evaluates your resume against a given job description, calculates a match percentage, highlights your key strengths, and suggests areas for improvement.
- **Cover Letter Generation**: Crafts professional cover letters that are context-aware, ensuring that each letter is tailored to the job you're applying for.

This project is built using modern web technologies, including Next.js for frontend and Supabase for backend functionalities. It follows a component-driven development approach to ensure scalability and ease of maintenance.

## Core Features 🚀

- **Resume Analysis**

  - Match percentage scoring
  - Identification of strengths
  - Suggestions for areas of improvement
  - Custom interview question suggestions

- **Cover Letter Generation**
  - Context-aware letter creation
  - Professional formatting
  - Job-specific customization
  - One-click copy functionality

## Usage Guide ▶️

- **Resume Analysis:**

  - Upload your resume (PDF or DOC/DOCX) or paste your resume text.
  - Enter the job description or URL for the job posting.
  - Click on "Analyze Resume" to receive a detailed analysis report.

- **Cover Letter Generation:**
  - Upload your resume or provide your resume text.
  - Enter the job description or URL.
  - Click on "Generate Cover Letter" to produce a personalized cover letter.
  - You can easily copy the generated letter with one click.

## Project Structure 📂

The project is organized as follows:

- **Root Files:** Configuration files such as `.env.local`, `.gitignore`, `package.json`, `next.config.mjs`, and others.
- **Public Folder:** Contains static assets like images and icons.
- **src Folder:** Contains all the application source code including:
  - **app/**: Next.js pages and components.
  - **components/**: Reusable UI components (e.g., Button, Background, Container, NavBar).
  - **hooks/**: Custom hooks for functionalities like authentication, AI prompts, PDF processing, and Supabase interactions.
  - **dashboard/** and **result/**: Specific pages for user dashboard and result display.
  - **upload/**: Handles resume and job description upload forms.
- **temp/**: Contains temporary files, like CORS configuration and middleware examples.

## Contributing 🤝

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch:
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```sh
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
