# Frontend Challenge

## What to Do

Create a single-page application reminiscent of popular platforms like Netflix and Amazon Prime using Next.js and Tailwind CSS. Your focus will be to develop a film carousel using these technologies, sourcing data from the TMDB API.

> Important: Build the carousel component from scratch without using any prebuilt carousel libraries. This task is designed to assess your ability to create custom, interactive UI components.

### The carousel should:

- Display a list of 10 top-rated movies, each showcasing cover art, title, and a brief description.
- Show at least 5 movies at a time on a desktop viewport, reducing to 3 on tablet and 1 on mobile. Allow the user to scroll through to see more movies.
- Implement arrows or buttons to facilitate carousel navigation.
- When a movie's cover art is clicked, a modal should appear over the page (with a semi-transparent background to obscure the carousel). The modal should:
  - Display the movie's cover art, title, detailed description, release date, and a cast list.
  - Be equipped with a close button. Clicking this button or clicking outside the modal should close the modal.
- The modal should slide in from the bottom and slide out to the bottom when being closed.
- You will need to integrate with the TMDB API to fetch the top-rated movie data. Leverage Next.js's server-side rendering feature, fetching the movie list on the server and having it ready to display when the page loads.

### What to Demo:

- A responsive carousel built with Tailwind CSS and Next.js. It should display a list of 10 top-rated movies with cover art, title, and brief description. The carousel should show a different number of movies at a time depending on the viewport size (5 for desktop, 3 for tablet, 1 for mobile).
- Navigation options for users to scroll or click through the carousel. This should include visible arrows or buttons for carousel navigation.
- A feature to display additional movie details in a modal. When a user clicks on a movie's cover art, show a modal with a longer description, release date, and cast list. The modal should slide in from the bottom and out to the bottom when closed. Clicking outside the modal or on a close button should close the modal.
- Utilization of Next.js's server-side rendering. Show how you fetch the initial movie data on the server side and render it when the page loads.
  Integration with the TMDB API to fetch top-rated movie data. Showcase how you fetch and use data from an external API in your application.

Good luck!
