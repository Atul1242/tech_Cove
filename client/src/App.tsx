import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Public pages
import Home from './pages/Home';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Blog from './pages/Blog';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Careers from './pages/Careers';

// Auth pages
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

// Member pages
import Dashboard from './pages/Member/Dashboard';
import BookSeat from './pages/Member/BookSeat';
import MyBookings from './pages/Member/MyBookings';
import Membership from './pages/Member/Membership';
import CheckIn from './pages/Member/CheckIn';
import Billing from './pages/Member/Billing';
import Rewards from './pages/Member/Rewards';
import Support from './pages/Member/Support';

// Admin pages
import Overview from './pages/Admin/Overview';
import LiveFloor from './pages/Admin/LiveFloor';
import Bookings from './pages/Admin/Bookings';
import Members from './pages/Admin/Members';
import Payments from './pages/Admin/Payments';
import EventsContent from './pages/Admin/EventsContent';
import Analytics from './pages/Admin/Analytics';
import Settings from './pages/Admin/Settings';

// Policy pages
import Privacy from './pages/Policies/Privacy';
import Terms from './pages/Policies/Terms';
import Refunds from './pages/Policies/Refunds';
import Guidelines from './pages/Policies/Guidelines';

import NotFound from './pages/not-found';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

const AnimatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-dark-custom min-vh-100">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            } />
            <Route path="/locations" element={
              <AnimatedRoute>
                <Locations />
              </AnimatedRoute>
            } />
            <Route path="/locations/:id" element={
              <AnimatedRoute>
                <LocationDetail />
              </AnimatedRoute>
            } />
            <Route path="/pricing" element={
              <AnimatedRoute>
                <Pricing />
              </AnimatedRoute>
            } />
            <Route path="/features" element={
              <AnimatedRoute>
                <Features />
              </AnimatedRoute>
            } />
            <Route path="/how-it-works" element={
              <AnimatedRoute>
                <HowItWorks />
              </AnimatedRoute>
            } />
            <Route path="/gallery" element={
              <AnimatedRoute>
                <Gallery />
              </AnimatedRoute>
            } />
            <Route path="/events" element={
              <AnimatedRoute>
                <Events />
              </AnimatedRoute>
            } />
            <Route path="/blog" element={
              <AnimatedRoute>
                <Blog />
              </AnimatedRoute>
            } />
            <Route path="/faqs" element={
              <AnimatedRoute>
                <FAQs />
              </AnimatedRoute>
            } />
            <Route path="/contact" element={
              <AnimatedRoute>
                <Contact />
              </AnimatedRoute>
            } />
            <Route path="/careers" element={
              <AnimatedRoute>
                <Careers />
              </AnimatedRoute>
            } />

            {/* Auth Routes */}
            <Route path="/login" element={
              <AnimatedRoute>
                <Login />
              </AnimatedRoute>
            } />
            <Route path="/signup" element={
              <AnimatedRoute>
                <SignUp />
              </AnimatedRoute>
            } />

            {/* Member Routes */}
            <Route path="/dashboard" element={
              <AnimatedRoute>
                <Dashboard />
              </AnimatedRoute>
            } />
            <Route path="/book-seat" element={
              <AnimatedRoute>
                <BookSeat />
              </AnimatedRoute>
            } />
            <Route path="/my-bookings" element={
              <AnimatedRoute>
                <MyBookings />
              </AnimatedRoute>
            } />
            <Route path="/membership" element={
              <AnimatedRoute>
                <Membership />
              </AnimatedRoute>
            } />
            <Route path="/check-in" element={
              <AnimatedRoute>
                <CheckIn />
              </AnimatedRoute>
            } />
            <Route path="/billing" element={
              <AnimatedRoute>
                <Billing />
              </AnimatedRoute>
            } />
            <Route path="/rewards" element={
              <AnimatedRoute>
                <Rewards />
              </AnimatedRoute>
            } />
            <Route path="/support" element={
              <AnimatedRoute>
                <Support />
              </AnimatedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AnimatedRoute>
                <Overview />
              </AnimatedRoute>
            } />
            <Route path="/admin/live-floor" element={
              <AnimatedRoute>
                <LiveFloor />
              </AnimatedRoute>
            } />
            <Route path="/admin/bookings" element={
              <AnimatedRoute>
                <Bookings />
              </AnimatedRoute>
            } />
            <Route path="/admin/members" element={
              <AnimatedRoute>
                <Members />
              </AnimatedRoute>
            } />
            <Route path="/admin/payments" element={
              <AnimatedRoute>
                <Payments />
              </AnimatedRoute>
            } />
            <Route path="/admin/events" element={
              <AnimatedRoute>
                <EventsContent />
              </AnimatedRoute>
            } />
            <Route path="/admin/analytics" element={
              <AnimatedRoute>
                <Analytics />
              </AnimatedRoute>
            } />
            <Route path="/admin/settings" element={
              <AnimatedRoute>
                <Settings />
              </AnimatedRoute>
            } />

            {/* Policy Routes */}
            <Route path="/privacy" element={
              <AnimatedRoute>
                <Privacy />
              </AnimatedRoute>
            } />
            <Route path="/terms" element={
              <AnimatedRoute>
                <Terms />
              </AnimatedRoute>
            } />
            <Route path="/refunds" element={
              <AnimatedRoute>
                <Refunds />
              </AnimatedRoute>
            } />
            <Route path="/guidelines" element={
              <AnimatedRoute>
                <Guidelines />
              </AnimatedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={
              <AnimatedRoute>
                <NotFound />
              </AnimatedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
