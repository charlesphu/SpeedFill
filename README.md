# SpeedFill ✨

SpeedFill is a powerful web application designed to streamline the job application process. By leveraging AI technology, SpeedFill helps users generate tailored cover letters and receive detailed resume analysis based on specific job descriptions. The platform saves time and improves application quality, increasing the chances of securing interviews and job offers.

With SpeedFill, users can upload their resumes, input job descriptions, and get instant, personalized feedback along with generated documents. The intuitive interface guides users through every step of the process, making job applications faster and more effective.

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

## 🚀 Getting Started

### Prerequisites

- Node.js (v15.1.5 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/speedfill.git
   cd speedfill
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a [\\.env\\.local](.env.local) file in the root directory and add your API keys:

   ```
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🛠️ Technologies Used

- **Frontend:** React.js, Next.js, Material UI
- **AI Integration:** Google Gemini AI API
- **Authentication & Storage:** Supabase
- **PDF Processing:** PDF.js, jsPDF

## 📊 Project Structure

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

## 🔒 Authentication

SpeedFill offers both email/password and Google sign-in options. User data is securely managed through Supabase, ensuring robust data protection practices.

## 🌐 Deployment

Deploy the application on Vercel for optimal performance with Next.js:

```bash
npm run build
vercel --prod
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.
