# 🎰 Project Title

The betting application currently offers a range of betting options, including straight, even/odd, and dozens. Below is a detailed explanation of the key features and functionality:

## 🎯 Features

### Available Bets:  Players can place bets on the following types:

- **Straight**: Bet on a specific number.
- **Even/Odd**: Bet on whether the outcome will be an even or odd number.
- **Dozens**: Bet on one of three groups of twelve numbers.

### Multiple Bets

Players have the flexibility to place multiple bets simultaneously. However, they must ensure that their total betting amount does not exceed the allocated chip limit of 1000.

## 🕹️ Gameplay Mechanics

### Spin Requirement

 The spin functionality is only enabled after the player has placed at least one bet.

### Bet Processing

Upon spinning, all current bets are transmitted to the backend for processing. The backend then calculates the results and sends them back to the client.

### Result Storage

The results from each spin are stored both on the backend and frontend. Note that the current implementation uses in-memory storage for this data.

## 🧹 Additional Features

### Clearing Bets

Players have the option to clear their bets. This action removes all bets stored in the frontend’s Redux state, allowing the player to start fresh.

## 💻 Display and Responsiveness

Optimal Screen Size: While the application is functional, the betting interface may not be fully responsive on all screen sizes. For the best user experience, we recommend using a screen size between 1100px and 1300px.

## 🚀 Getting Started

### Prerequisites

NodeJS + npm installed

### Installation

## Client

- Hit npm install then npm start

## Server

- Hit npm install then npm run dev
