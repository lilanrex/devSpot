This guide explains how to set up and run this mini project
Prerequisites
Make sure you have these installed:

Git, Node.js, npm(package manager)

This app uses mock data for testing

1. clone the repository 
git clone  https://github.com/lilanrex/devSpot.git



2. install dependencies i.e npm install or yarn install


3. create a .env file which is used for sensitive data
after configuration it's time to run locally
enter the command "npm run dev" to run the project locally

This is a work in progress that was developed using Next.js, typescript and Tailwindcss, It presents a dynamic and interactive website for looking up hackathons and events. 

To test the app for when there's no hackathons, kindly comment out the data being passed from api.ts in libs
i.e 
/**{
    id: 'hackathon-1',
    organizerName: 'Protocol Labs',
    organizerLogoUrl: '/Project logo.png', 
    title: 'Quantum Shift',
    status: 'Live',
    type: 'Virtual Hackathon',
    date: 'May 9, 2025',
    participantCount: 1391,
  },**/