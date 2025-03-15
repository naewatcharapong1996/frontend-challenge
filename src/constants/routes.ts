// Define basic routes as an enum
export enum AppRoute {
  HOME = '/',
}

// Function to generate dynamic routes
export const getCityDetailRoute = (id: string): string => `/city/${id}`;