
# Distribution of Relief Goods Management Platform

## Overview
The Distribution of Relief Goods Management Platform is an advanced web application designed to enhance the coordination and management of relief goods distribution in post-disaster scenarios. By leveraging modern technologies such as React, Redux, RTK Query, React Router DOM, and Tailwind CSS, this platform ensures efficient, timely, and effective delivery of essential supplies to affected communities.

## Technology Stack
- **Frontend Framework**: React
- **State Management**: Redux
- **Data Fetching**: RTK Query
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS

## Key Features

### Home / Landing Page / Root Page [Public]
- **Header / Navbar**: Dynamic header with navigation links and authentication controls for a seamless user experience.
- **Banner / Hero Section**: Striking visual section to highlight the platform’s mission and goals.
- **Relief Goods Posts**: Snapshot of 6 relief goods posts displayed in an engaging card format.
- **Top 6 Provider Testimonials**: Engaging section featuring animated and slider testimonials from top providers.
- **Gallery / Carousel**: Dynamic carousel showcasing impactful images of relief distributions and humanitarian efforts.
- **Summary / About Us / Who We Are / What We Do**: Informative section detailing the platform’s mission, objectives, and impact.
- **Two Additional Sections**: Unique sections tailored to post-disaster relief, such as distribution center locations and volunteer testimonials.
- **Footer**: Comprehensive footer with contact information, social media links, and additional resources.

### All Relief Goods Page (/relief-goods) [Public Route]
- **Grid of Card View**: Organized grid layout displaying all relief goods posts in an attractive and accessible format.

### Relief Goods Detail Page (/relief-goods/:id) [Public Route]
- **Standardized Relief Goods Detail Format**: Detailed view of each relief goods post with essential information and a donation option.

### Login / Register Page [Public Routes]
- **Register Page (/register)**: User-friendly registration form to create new accounts with ease.
- **Login Page (/login)**: Secure and straightforward login interface for authenticated access.

### Dashboard [Private Routes]
- **Dashboard Home Page (/dashboard)**: Centralized hub for users to manage their supplies and view statistics.
- **All Supply Posts Page (Nested) (/dashboard/supplies)**: Comprehensive table view of all supply posts with edit and delete options.
- **Add Supply Post Button**: Easy access button to create new supply posts.
- **Create Supply Post Page (/dashboard/create-supply)**: Interactive form for users to add new supply posts with detailed information.

## Additional Features

1. **Dynamic Theme Switching:**
   - Users can seamlessly switch between different themes, such as light mode and dark mode.
2. **Donors Leaderboard (/leaderboard):**
   - A dedicated leaderboard (”/leaderboard”) showcases the top donors who have made significant contributions to relief efforts. It displays donor names or usernames along with their donation amounts, 
     acknowledging their generosity and fostering community recognition.
3. **Community Gratitude Wall (/community):**
   - The platform features a community gratitude wall (”/community”) where users can express appreciation for the support they've received during challenging times.

4. **Interactive Testimonial (/dashboard/create-testimonial):**
   - Donors will be able to post testimonials about the donation posts.

5. **Digital Volunteer Hub (/volunteer):**
   - Develop a digital hub where users can discover and sign up for virtual volunteer opportunities.
   - Create a form where users can provide their information like their email, phone number, location, etc.
   - Show the volunteer lists in the About Us page in a section named Our Volunteers (/about-us).
