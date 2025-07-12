<<<<<<< HEAD
# odoo

PS 1- Skill Swap Platform

Team Members: 
1) Abhishek Dudhpachare - abhishek.dudhpachare@walchandsangli.ac.in
2) Atharva Pandey - atharva2004pandey@gmail.com
3) Mihir Pusadkar - mpusadkar633@gmail.com
4) Viraj Gotmare - virajchronos@gmai.com
=======
# Skill Swap Platform

A complete, production-ready skill exchange platform where users can connect, learn, and grow together through skill swapping.

## 🚀 Features

### ✅ Authentication & Security
- JWT-based authentication with HTTP-only cookies
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### ✅ User Profiles
- Complete profile management
- Skill offerings and learning goals
- Availability scheduling
- Profile photo uploads via Cloudinary
- Public/private profile toggle

### ✅ Skill Discovery
- Browse public profiles
- Advanced search and filtering
- Skill-based matching
- Availability filtering

### ✅ Swap Requests
- Send skill swap requests
- Accept/reject/cancel requests
- Real-time notifications
- Message system

### ✅ Co-learning Rooms
- Video chat integration ready
- Collaborative whiteboard
- Real-time session management
- Session recording capabilities

### ✅ Feedback & Gamification
- 5-star rating system
- Written feedback
- Points and badges system
- Achievement unlocking with animations

### ✅ Leaderboard
- Real-time rankings
- Points-based scoring
- Badge display
- User statistics

### ✅ UI/UX Excellence
- Responsive design for all devices
- Smooth animations with Framer Motion
- Modern Tailwind CSS styling
- Confetti celebrations
- Loading states and error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **File Upload**: Cloudinary
- **Real-time**: Socket.IO ready
- **Video**: Daily.co integration ready
- **Animations**: Framer Motion, Canvas Confetti

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd skill-swap-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   - MongoDB connection string
   - JWT secret key
   - Cloudinary credentials
   - Socket.IO server URL (optional)

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Add to environment variables

### File Storage (Cloudinary)
1. Create Cloudinary account
2. Get API credentials
3. Add to environment variables

## 📁 Project Structure

\`\`\`
skill-swap-platform/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (pages)/           # Page components
│   ├── globals.css        # Global styles
│   └── layout.jsx         # Root layout
├── components/            # Reusable components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
├── models/                # Database models
├── public/                # Static assets
└── README.md
\`\`\`

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillswap
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NODE_ENV=development
\`\`\`

## 🎯 Key Features Explained

### Authentication Flow
- Users sign up with email/password
- JWT tokens stored in HTTP-only cookies
- Automatic token validation on protected routes

### Skill Matching
- Users specify skills they can teach and want to learn
- Smart matching algorithm suggests compatible users
- Filter by availability, location, and skills

### Real-time Features
- Socket.IO integration for live updates
- Real-time request notifications
- Live leaderboard updates

### Gamification System
- Points awarded for completed swaps and feedback
- Badges unlock at different milestones
- Leaderboard rankings with confetti celebrations

### Video Integration
- Ready for Daily.co integration
- Collaborative whiteboard with Excalidraw
- Session recording capabilities

## 🚀 Production Considerations

### Security
- Environment variables for sensitive data
- HTTP-only cookies for JWT storage
- Input validation and sanitization
- Rate limiting (recommended)

### Performance
- Image optimization with Cloudinary
- Lazy loading for components
- Database indexing for queries
- CDN for static assets

### Scalability
- Modular component architecture
- Efficient database queries
- Caching strategies (Redis recommended)
- Load balancing for high traffic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Framer Motion for smooth animations
- MongoDB for the flexible database
- Cloudinary for image management
>>>>>>> master
